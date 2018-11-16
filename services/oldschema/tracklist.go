package oldschema

import (
	"fmt"

	"github.com/cazinge/playroll/services/utils"
	"github.com/cazinge/playroll/services/utils/pagination"
	"github.com/cazinge/playroll/services/utils/search"
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
	"github.com/mitchellh/mapstructure"
	"github.com/zmb3/spotify"
	"golang.org/x/oauth2"
)

type Tracklist struct {
	utils.Model `gql:"MODEL"`
	Starred     bool `gql:"starred: Boolean"`
	Primary     bool `gql:"primary: Boolean"`
	RollOutputs []RollOutput
	Order       string `gql:"order: String"`
}

type TracklistMethods struct {
	GetTracklist      *utils.Query    `gql:"tracklist(id: ID!): Tracklist"`
	SearchTracklists  *utils.Query    `gql:"searchTracklists(options: SearchInput!): [Tracklist]"`
	ListTracklists    *utils.Query    `gql:"listTracklists(options: PaginationInput!): [Tracklist]"`
	CreateTracklist   *utils.Mutation `gql:"createTracklist(tracklist: CreateTracklistInput!): Tracklist"`
	UpdateTracklist   *utils.Mutation `gql:"updateTracklist(tracklist: UpdateTracklistInput!): Tracklist"`
	DeleteTracklist   *utils.Mutation `gql:"deleteTracklist(id: ID!): Tracklist"`
	GenerateTracklist *utils.Mutation `gql:"generateTracklist(generate: GenerateTracklistInput!): Tracklist"`
}

func getTracklist(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	var tracklist Tracklist
	if err := utils.HandleGetSingularModel(params, db, &tracklist); err != nil {
		return nil, err
	}
	return tracklist, nil
}

func searchTracklists(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	var tracklists []Tracklist
	if err := search.Query(params, db, &tracklists); err != nil {
		return nil, err
	}
	return tracklists, nil
}

func listTracklists(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	var tracklists []Tracklist
	pagination.HandlePagination(params, db, &tracklists)
	return tracklists, nil
}

type CreateTracklistInput struct {
	Starred bool   `gql:"starred: Boolean"`
	Primary bool   `gql:"primary: Boolean"`
	Order   string `gql:"order: String"`
}

func createTracklist(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	starred, ok := params.Args["tracklist"].(map[string]interface{})["starred"].(bool)
	if !ok {
		return nil, utils.HandleTypeAssertionError("starred")
	}

	primary, ok := params.Args["tracklist"].(map[string]interface{})["primary"].(bool)
	if !ok {
		return nil, utils.HandleTypeAssertionError("primary")
	}

	order, ok := params.Args["tracklist"].(map[string]interface{})["order"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("order")
	}

	tracklist := &Tracklist{
		Starred: starred,
		Primary: primary,
		Order:   order,
	}
	if err := db.Create(&tracklist).Error; err != nil {
		fmt.Println("error creating Tracklist: " + err.Error())
		return nil, err
	}
	return tracklist, nil
}

type UpdateTracklistInput struct {
	ID      string `gql:"id: ID!"`
	Starred bool   `gql:"starred: Boolean"`
	Primary bool   `gql:"primary: Boolean"`
	Order   string `gql:"order: String"`
}

func updateTracklist(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	tracklist := &Tracklist{}

	id, ok := params.Args["tracklist"].(map[string]interface{})["id"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("id")
	}

	starred, ok := params.Args["tracklist"].(map[string]interface{})["starred"].(bool)
	if !ok {
		return nil, utils.HandleTypeAssertionError("starred")
	}

	primary, ok := params.Args["tracklist"].(map[string]interface{})["primary"].(bool)
	if !ok {
		return nil, utils.HandleTypeAssertionError("primary")
	}

	order, ok := params.Args["tracklist"].(map[string]interface{})["order"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("order")
	}

	if err := db.Where("id = ?", id).First(&tracklist).Error; err != nil {
		fmt.Println("getting tracklist to update: " + err.Error())
		return nil, err
	}

	tracklist.Starred = starred
	tracklist.Primary = primary
	tracklist.Order = order
	if err := db.Save(&tracklist).Error; err != nil {
		fmt.Println("error updating tracklist: " + err.Error())
		return nil, err
	}
	return tracklist, nil
}

func deleteTracklist(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	tracklist := &Tracklist{}

	id, ok := params.Args["id"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("id")
	}

	if err := db.Where("id = ?", id).First(&tracklist).Error; err != nil {
		fmt.Println("error deleting tracklist: " + err.Error())
		return nil, err
	}

	associationsToRemove := []string{"RollOutputs"}
	utils.HandleRemoveAssociationReferences(db, tracklist, associationsToRemove)
	db.Delete(&tracklist)
	return tracklist, nil
}

type GenerateTracklistInput struct {
	UserID     string `gql:"userID: ID" json: userID`
	PlayrollID string `gql:"playrollID: ID" sjson: playrollID`
	Provider   string `gql:"provider: String" json: provider`
	Starred    bool   `gql:"starred: Boolean" json: starred`
	Primary    bool   `gql:"primary: Boolean" json: primary`
	Rolls      []Roll `gql:"rolls: [RollInput]" json: rolls`
	Order      string `gql:"order: String!" json: order`
}

func generateTracklist(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	var playroll Playroll
	var extCreds ExternalCredentials

	userID, ok := params.Args["generate"].(map[string]interface{})["userID"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("userID")
	}

	playrollID, ok := params.Args["generate"].(map[string]interface{})["playrollID"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("playrollID")
	}

	provider, ok := params.Args["generate"].(map[string]interface{})["provider"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("provider")
	}

	starred, ok := params.Args["generate"].(map[string]interface{})["starred"].(bool)
	if !ok {
		return nil, utils.HandleTypeAssertionError("starred")
	}

	primary, ok := params.Args["generate"].(map[string]interface{})["primary"].(bool)
	if !ok {
		return nil, utils.HandleTypeAssertionError("primary")
	}

	// TODO: Find issue around getting array of MusicSources to load within rolls
	userRolls, ok := params.Args["generate"].(map[string]interface{})["rolls"].([]interface{})
	fmt.Println("userRolls: %v", userRolls)

	order, ok := params.Args["generate"].(map[string]interface{})["order"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("order")
	}

	if err := db.Preload("User", "id = ?", userID).First(&extCreds, "provider = ?", provider).Error; err != nil {
		fmt.Println("Preloading User for externalCredentials error: ", err.Error())
		return nil, err
	}

	if err := db.Preload("User", "id = ?", userID).First(&playroll, "id = ?", playrollID).Error; err != nil {
		fmt.Println("Preloading User for playroll error: ", err.Error())
		return nil, err
	}

	token := oauth2.Token{}
	mapstructure.Decode(extCreds.Token, &token)
	client := spotify.Authenticator{}.NewClient(&token)
	fmt.Println("client: ", client)

	songs := getSongsFromRolls(getTestRolls(), db, playroll, client)
	outputRollInformation(songs)

	playlist, err := CreatePlaylistFromSets(client, playroll.Name, songs)
	if err != nil {
		fmt.Println("Error creating playlist from sets: ", err.Error())
		return nil, err
	}
	fmt.Printf("\n%+v\n", playlist)

	tracklist := &Tracklist{
		Starred: starred,
		Primary: primary,
		Order:   order,
	}
	if err := db.Create(&tracklist).Error; err != nil {
		fmt.Println("Error creating tracklist: ", err)
		return nil, err
	}

	return tracklist, nil
}

func createSong(name string, provider ProviderType, providerID string) Song {
	return Song{
		Name: name,
		MusicSource: MusicSource{
			Type:       "Song",
			Name:       name,
			Provider:   provider,
			ProviderID: providerID,
		},
	}
}

func GenerateSongsForRoll(client spotify.Client, rollSource MusicSource) []Song {
	songs := []Song{}

	fmt.Println("here!")
	switch rollSource.Type {
	case "Song":
		songs = append(songs, createSong(rollSource.Name, rollSource.Provider, rollSource.ProviderID))
	case "Album":
		//TODO: Process all tracks rather than first 50
		simpleTrackPage, err := client.GetAlbumTracksOpt(spotify.ID(rollSource.ProviderID), 50, 0)
		if err != nil {
			return songs
		}
		for _, track := range simpleTrackPage.Tracks {
			songs = append(songs, createSong(track.Name, rollSource.Provider, string(track.ID)))
		}

	case "Artist":
		fullTracks, err := client.GetArtistsTopTracks(spotify.ID(rollSource.ProviderID), "US")
		if err != nil {
			return songs
		}
		for _, track := range fullTracks {
			songs = append(songs, createSong(track.Name, rollSource.Provider, string(track.ID)))
		}
	}
	return songs
}

func CreatePlaylistFromSets(client spotify.Client, playrollName string, sets [][]Song) (*spotify.FullPlaylist, error) {
	user, _ := client.CurrentUser()
	fmt.Println("User: ", user)
	playlist, err := client.CreatePlaylistForUser(user.ID, playrollName, "", true)
	if err != nil {
		fmt.Println("Error creating playlist for user: ", err.Error())
		return nil, err
	}
	for _, songs := range sets {
		trackIDs := []spotify.ID{}
		for _, song := range songs {
			trackIDs = append(trackIDs, spotify.ID(song.MusicSource.ProviderID))
		}
		client.AddTracksToPlaylist(playlist.ID, trackIDs...)
	}
	playlist, _ = client.GetPlaylist(playlist.ID)
	return playlist, nil
}

func outputRollInformation(songs [][]Song) {
	for i, set := range songs {
		fmt.Printf("\n\nOutput from Roll %d:\n", i)
		for _, song := range set {
			fmt.Println(song.String())
		}
	}
}

func getSongsFromRolls(rolls []Roll, db *gorm.DB, playroll Playroll, client spotify.Client) [][]Song {
	songs := [][]Song{}
	for _, roll := range rolls {
		fmt.Println("roll")
		fmt.Println(roll)
		db.Model(&playroll).Association("Rolls").Append(roll)
		for _, musicSource := range roll.MusicSources {
			fmt.Println("musicSource")
			fmt.Println(musicSource)
			songs = append(songs, GenerateSongsForRoll(client, musicSource))
		}
	}
	return songs
}

func getTestRolls() []Roll {
	_ = Roll{
		MusicSources: []MusicSource{},
		Filters:      RollFilter{},
		Length:       RollLength{},
	}

	b := Roll{
		MusicSources: []MusicSource{
			{
				Type:       "Song",
				Name:       "Hotline Bling",
				Provider:   "Spotify",
				ProviderID: "2rTxwqA6v4lccbPKD31CQI",
			},
			{
				Type:       "Song",
				Name:       "I want it that way",
				Provider:   "Spotify",
				ProviderID: "6e40mgJiCid5HRAGrbpGA6",
			},
		},
		Filters: RollFilter{Type: "None", Modifications: []string{}},
		Length:  RollLength{Type: "No. Songs", Modifications: []string{"1"}},
	}

	c := Roll{
		MusicSources: []MusicSource{
			{
				Type:       "Artist",
				Name:       "Drake",
				Provider:   "Spotify",
				ProviderID: "3TVXtAsR1Inumwj472S9r4",
			},
			{
				Type:       "Album",
				Name:       "NKOTBSB",
				Provider:   "Spotify",
				ProviderID: "5Zwuaan4RIS108lyMEYYmw",
			},
		},
		Filters: RollFilter{Type: "Random", Modifications: []string{}},
		Length:  RollLength{Type: "Timed", Modifications: []string{"30"}},
	}

	d := Roll{
		MusicSources: []MusicSource{
			{
				Type:       "Album",
				Name:       "Take Care",
				Provider:   "Spotify",
				ProviderID: "6X1x82kppWZmDzlXXK3y3q",
			},
			{
				Type:       "Artist",
				Name:       "Backstreet Boys",
				Provider:   "Spotify",
				ProviderID: "5rSXSAkZ67PYJSvpUpkOr7",
			},
		},
		Filters: RollFilter{Type: "Popular", Modifications: []string{}},
		Length:  RollLength{Type: "Number(Range)", Modifications: []string{"30", "60"}},
	}

	return []Roll{b, c, d}
}

var TracklistEntity = &utils.Entity{
	Name:  "Tracklist",
	Model: &Tracklist{},
	Methods: &TracklistMethods{
		GetTracklist:      &utils.Query{Request: getTracklist, Scope: "User"},
		SearchTracklists:  &utils.Query{Request: searchTracklists, Scope: "User"},
		ListTracklists:    &utils.Query{Request: listTracklists, Scope: "User"},
		CreateTracklist:   &utils.Mutation{Request: createTracklist, Scope: "User"},
		UpdateTracklist:   &utils.Mutation{Request: updateTracklist, Scope: "User"},
		DeleteTracklist:   &utils.Mutation{Request: deleteTracklist, Scope: "User"},
		GenerateTracklist: &utils.Mutation{Request: generateTracklist, Scope: "User"},
	},
	Types: &[]*utils.Type{
		&utils.Type{Name: "CreateTracklistInput", IsInput: true, Model: &CreateTracklistInput{}},
		&utils.Type{Name: "UpdateTracklistInput", IsInput: true, Model: &UpdateTracklistInput{}},
		&utils.Type{Name: "GenerateTracklistInput", IsInput: true, Model: &GenerateTracklistInput{}},
	},
}
