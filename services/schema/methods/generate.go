package methods

import (
	"encoding/json"
	"fmt"

	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
	"github.com/cazinge/playroll/services/models/jsonmodels"
	"github.com/cazinge/playroll/services/utils"
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
	"github.com/mitchellh/mapstructure"
	"github.com/zmb3/spotify"
	"golang.org/x/oauth2"
)

type GenerateMethods struct {
	GetTracklistSongs *gqltag.Query    `gql:"tracklistSongs(tracklistID: ID): [MusicSource]"`
	GenerateTracklist *gqltag.Mutation `gql:"generateTracklist(playrollID: ID): Tracklist"`
}

var getTracklistSongs = gqltag.Method{
	Description: `[Get Tracklist Songs Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		type getTracklistSongsParams struct {
			TracklistID string
		}
		params := &getTracklistSongsParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		id := utils.StringIDToNumber(params.TracklistID)
		compiledRolls := []models.CompiledRoll{}
		if err = db.Where(&models.CompiledRoll{TracklistID: id}).Find(&compiledRolls).Error; err != nil {
			fmt.Println(err)
			return nil, err
		}

		tracks := []jsonmodels.MusicSource{}
		for _, compiledRoll := range compiledRolls {
			compiledRollOutput, err := compiledRoll.ToOutput()
			if err != nil {
				fmt.Println(err)
				return nil, err
			}
			tracks = append(tracks, compiledRollOutput.Data.Tracks...)
		}
		return tracks, nil
	},
}

func initPlayroll(db *gorm.DB) *models.Playroll {
	playroll := &models.Playroll{}
	playroll.SetEntity(playroll)
	playroll.SetDB(db.Preload("Rolls"))
	return playroll
}

func initTracklist(db *gorm.DB) *models.Tracklist {
	tracklist := &models.Tracklist{}
	tracklist.SetEntity(tracklist)
	tracklist.SetDB(db.Preload("CompiledRolls"))
	return tracklist
}

func initCompiledRoll(db *gorm.DB) *models.CompiledRoll {
	compiledRoll := &models.CompiledRoll{}
	compiledRoll.SetEntity(compiledRoll)
	compiledRoll.SetDB(db)
	return compiledRoll
}

func formatPlayroll(val interface{}, err error) (*models.PlayrollOutput, error) {
	if err != nil {
		return nil, err
	}
	p, ok := val.(*models.Playroll)
	if !ok {
		return nil, fmt.Errorf("error converting to Playroll")
	}
	return p.ToOutput()
}

func formatTracklist(val interface{}, err error) (*models.TracklistOutput, error) {
	if err != nil {
		return nil, err
	}
	t, ok := val.(*models.Tracklist)
	if !ok {
		return nil, fmt.Errorf("error converting to Tracklist")
	}
	return t.ToOutput()
}

func createTrack(name string, provider string, providerID string) jsonmodels.MusicSource {
	// TODO: Add cover
	return jsonmodels.MusicSource{
		Type:       "Track",
		Name:       name,
		Provider:   provider,
		ProviderID: providerID,
	}
}

var generateTracklist = gqltag.Method{
	Description: `[Generate Tracklist Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		type generateTracklistParams struct {
			PlayrollID string
		}
		params := &generateTracklistParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		p := initPlayroll(db.Preload("Rolls"))
		id := utils.StringIDToNumber(params.PlayrollID)
		playroll, err := formatPlayroll(p.Get(id))

		ec := &models.ExternalCredential{}
		if err = db.Where(&models.ExternalCredential{Provider: "Spotify", UserID: 1}).Last(ec).Error; err != nil {
			fmt.Println(err)
			return nil, err
		}
		token := &oauth2.Token{}
		mapstructure.Decode(ec.Token, &token)
		client := spotify.NewAuthenticator("").NewClient(token)

		compiledRolls := []models.CompiledRollOutput{}

		for _, roll := range playroll.Rolls {
			tracks := []jsonmodels.MusicSource{}
			if sources := roll.Data.Sources; len(sources) > 0 {
				source := sources[0]
				switch source.Type {
				case "Track":
					tracks = append(tracks, createTrack(source.Name, source.Provider, source.ProviderID))
				case "Album":
					simpleTrackPage, err := client.GetAlbumTracksOpt(spotify.ID(source.ProviderID), 50, 0)
					if err != nil {
						return nil, err
					}
					for _, track := range simpleTrackPage.Tracks {
						tracks = append(tracks, createTrack(track.Name, source.Provider, string(track.ID)))
					}
				case "Artist":
					fullTracks, err := client.GetArtistsTopTracks(spotify.ID(source.ProviderID), "US")
					if err != nil {
						return nil, err
					}
					for _, track := range fullTracks {
						tracks = append(tracks, createTrack(track.Name, source.Provider, string(track.ID)))
					}
				}
			}
			compiledRolls = append(compiledRolls, models.CompiledRollOutput{
				Data:   jsonmodels.CompiledRollDataOutput{Tracks: tracks},
				RollID: roll.ID,
			})
		}

		tx := db.Begin()
		tracklistInput := models.TracklistInput{Starred: false, Primary: true, PlayrollID: string(id)}
		tracklist, err := tracklistInput.ToModel()
		if err != nil {
			tx.Rollback()
			return nil, err
		}
		t := initTracklist(tx)
		tracklistOutput, err := formatTracklist(t.Create(tracklist))
		tracklistOutput.CompiledRolls = compiledRolls
		if err != nil {
			tx.Rollback()
			return nil, err
		}
		cr := initCompiledRoll(tx)
		for _, compiledRollOutput := range compiledRolls {
			compiledRoll := &models.CompiledRoll{}
			compiledRoll.TracklistID = tracklistOutput.ID
			compiledRoll.Order = compiledRollOutput.Order
			compiledRoll.RollID = compiledRollOutput.RollID
			tracks, err := json.Marshal(compiledRollOutput.Data.Tracks)
			if err != nil {
				tx.Rollback()
				return nil, err
			}
			compiledRoll.Data = jsonmodels.CompiledRollData{Tracks: tracks}
			fmt.Printf("%#v\n", compiledRoll)
			_, err = cr.Create(compiledRoll)
			if err != nil {
				tx.Rollback()
				return nil, err
			}
		}
		err = tx.Commit().Error
		if err != nil {
			return nil, err
		}
		return tracklistOutput, nil
	},
}

var LinkedGenerateMethods = GenerateMethods{
	GetTracklistSongs: gqltag.LinkQuery(getTracklistSongs),
	GenerateTracklist: gqltag.LinkMutation(generateTracklist),
}
