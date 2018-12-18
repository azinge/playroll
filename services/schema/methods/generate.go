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

func createTrack(cover string, name string, provider string, providerID string) jsonmodels.MusicSource {
	return jsonmodels.MusicSource{
		Cover:      cover,
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

		p := models.InitPlayrollDAO(db.Preload("Rolls"))
		id := utils.StringIDToNumber(params.PlayrollID)
		rawPlayroll, err := p.Get(id)
		if err != nil {
			return nil, err
		}
		playroll, err := models.FormatPlayroll(rawPlayroll)

		ec := &models.ExternalCredential{}
		if err = db.Where(&models.ExternalCredential{Provider: "Spotify", UserID: 1}).Last(ec).Error; err != nil {
			fmt.Println(err)
			return nil, err
		}

		eco, err := ec.ToOutput()
		if err != nil {
			fmt.Println("Error creating output object for External Credential: ", err.Error())
			return nil, err
		}
		token := &eco.Token

		// token := &oauth2.Token{}
		// mapstructure.Decode(ec.Token, &token)
		client := spotify.NewAuthenticator("").NewClient(token)
		token, err = client.Token()
		if err != nil {
			fmt.Println("Error fetching token: ", err.Error())
			return nil, err
		}

		ec2 := models.InitExternalCredentialDAO(db)
		ec.Token, err = json.Marshal(token)

		ec2.Update(ec)

		compiledRolls := []models.CompiledRollOutput{}

		for _, roll := range playroll.Rolls {
			tracks := []jsonmodels.MusicSource{}
			if sources := roll.Data.Sources; len(sources) > 0 {
				source := sources[0]
				switch source.Type {
				case "Track":
					tracks = append(tracks, createTrack(source.Cover, source.Name, source.Provider, source.ProviderID))
				case "Album":
					simpleTrackPage, err := client.GetAlbumTracksOpt(spotify.ID(source.ProviderID), 50, 0)
					if err != nil {
						return nil, err
					}
					for _, track := range simpleTrackPage.Tracks {
						tracks = append(tracks, createTrack(source.Cover, track.Name, source.Provider, string(track.ID)))
					}
				case "Artist":
					fullTracks, err := client.GetArtistsTopTracks(spotify.ID(source.ProviderID), "US")
					if err != nil {
						return nil, err
					}
					for _, track := range fullTracks {
						tracks = append(tracks, createTrack(source.Cover, track.Name, source.Provider, string(track.ID)))
					}
				}
			}
			compiledRolls = append(compiledRolls, models.CompiledRollOutput{
				Data:   jsonmodels.CompiledRollDataOutput{Tracks: tracks},
				RollID: roll.ID,
			})
		}

		tx := db.Begin()
		tracklistInput := models.TracklistInput{Starred: false, Primary: true, PlayrollID: params.PlayrollID}
		tracklist, err := tracklistInput.ToModel()
		if err != nil {
			tx.Rollback()
			return nil, err
		}
		t := models.InitTracklistDAO(tx)

		rawTracklist, err := t.Create(tracklist)
		if err != nil {
			return nil, err
		}
		tracklistOutput, err := models.FormatTracklist(rawTracklist)
		tracklistOutput.CompiledRolls = compiledRolls
		if err != nil {
			tx.Rollback()
			return nil, err
		}
		cr := models.InitCompiledRollDAO(tx)
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
