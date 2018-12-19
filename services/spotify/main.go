package spotify

import (
	"encoding/json"
	"fmt"

	"github.com/cazinge/playroll/services/models"
	"github.com/cazinge/playroll/services/models/jsonmodels"
	"github.com/jinzhu/gorm"
	"github.com/zmb3/spotify"
	"golang.org/x/oauth2"
)

const redirectURL = "http://localhost:8888/callback"

var spotifyScopes = []string{
	spotify.ScopeUserReadPrivate,
	spotify.ScopeUserLibraryRead,
	spotify.ScopeUserReadEmail,
	spotify.ScopePlaylistModifyPublic,
	spotify.ScopePlaylistModifyPrivate,
}

func GetSpotifyClientForUser(userID uint, db *gorm.DB) (*spotify.Client, error) {
	ec, err := models.FindExternalCredentialByUserID(userID, db)
	if err != nil {
		fmt.Println("Error Finding External Credential by userID: ", err.Error(), ", UserID:", userID)
		return nil, err
	}

	eco, err := models.ExternalCredentialModelToOutput(ec)
	if err != nil {
		fmt.Println("Error creating output object for External Credential: ", err.Error())
		return nil, err
	}
	token := &eco.Token

	client := spotify.NewAuthenticator(redirectURL, spotifyScopes...).NewClient(token)
	token, err = client.Token()
	if err != nil {
		fmt.Println("Error fetching token: ", err.Error())
		return nil, err
	}

	dao := models.InitExternalCredentialDAO(db)
	ec.Token, err = json.Marshal(token)
	if err != nil {
		fmt.Println("Error Marshalling token: ", err.Error())
		return nil, err
	}

	_, err = dao.Update(ec)
	if err != nil {
		fmt.Println("Error Updating Credentials: ", err.Error())
		return nil, err
	}
	return &client, err
}

func RegisterSpotifyAuthCodeForUser(userID uint, code string, db *gorm.DB) (*models.ExternalCredentialOutput, error) {
	auth := spotify.NewAuthenticator(redirectURL, spotifyScopes...)
	url := auth.AuthURL("")
	fmt.Println(url)
	// TEMPORARY

	if code == "" {
		return nil, fmt.Errorf(fmt.Sprintf("Please log in: " + url))
	}

	oauthToken, err := spotify.NewAuthenticator(redirectURL, spotifyScopes...).Exchange(code)

	fmt.Printf("Recieved Token: %#v\n", oauthToken)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}

	t2 := &oauth2.Token{}

	b, e := json.Marshal(oauthToken)
	fmt.Println(e)
	json.Unmarshal(b, t2)
	fmt.Printf("Translated Token: %#v\n", t2)

	ec := models.InitExternalCredentialDAO(db)
	externalCredential := &models.ExternalCredential{
		Provider: "Spotify",
		UserID:   userID,
		Token:    b,
	}

	fmt.Printf("Saved Token: %#v\n", externalCredential)

	rawExternalCredential, err := ec.Create(externalCredential)
	if err != nil {
		return nil, err
	}
	return models.FormatExternalCredential(rawExternalCredential)
}

func SearchSpotify(query string, searchType string, client *spotify.Client) (*[]jsonmodels.MusicSource, error) {
	var searchResult *spotify.SearchResult
	var err error
	switch searchType {
	case "Track":
		searchResult, err = client.Search(query, spotify.SearchTypeTrack)
	case "Album":
		searchResult, err = client.Search(query, spotify.SearchTypeAlbum)
	case "Artist":
		searchResult, err = client.Search(query, spotify.SearchTypeArtist)
	default:
		return nil, fmt.Errorf("Search Type Not Found")
	}
	if err != nil {
		fmt.Println(err)
		return nil, err
	}

	output := []jsonmodels.MusicSource{}
	switch searchType {
	case "Track":
		for _, track := range searchResult.Tracks.Tracks {
			cover := "https://www.unesale.com/ProductImages/Large/notfound.png"
			if images := track.Album.Images; len(images) > 0 {
				cover = images[0].URL
			}
			ms := jsonmodels.MusicSource{
				Type:       "Track",
				Name:       fmt.Sprintf("%s - %s", track.Name, track.Artists[0].Name),
				Cover:      cover,
				Provider:   "Spotify",
				ProviderID: string(track.ID),
			}
			output = append(output, ms)
		}
	case "Album":
		for _, album := range searchResult.Albums.Albums {
			cover := "https://www.unesale.com/ProductImages/Large/notfound.png"
			if images := album.Images; len(images) > 0 {
				cover = images[0].URL
			}
			ms := jsonmodels.MusicSource{
				Type:       "Album",
				Name:       fmt.Sprintf("%s - %s", album.Name, album.Artists[0].Name),
				Cover:      cover,
				Provider:   "Spotify",
				ProviderID: string(album.ID),
			}
			output = append(output, ms)
		}
	case "Artist":
		for _, artist := range searchResult.Artists.Artists {
			cover := "https://www.unesale.com/ProductImages/Large/notfound.png"
			if images := artist.Images; len(images) > 0 {
				cover = images[0].URL
			}
			ms := jsonmodels.MusicSource{
				Type:       "Artist",
				Name:       artist.Name,
				Cover:      cover,
				Provider:   "Spotify",
				ProviderID: string(artist.ID),
			}
			output = append(output, ms)
		}
	default:
		return nil, fmt.Errorf("Search Type Not Found")
	}
	return &output, nil
}

func CreateSpotifyPlaylistFromTracks(tracks *[]jsonmodels.MusicSource, playlistName string, client *spotify.Client, db *gorm.DB) (*[]spotify.ID, error) {
	trackIDs := []spotify.ID{}
	for _, track := range *tracks {
		trackIDs = append(trackIDs, spotify.ID(track.ProviderID))
	}

	client, err := GetSpotifyClientForUser(1, db)
	if err != nil {
		fmt.Println("Error getting spotify client: ", err.Error())
		return nil, err
	}

	user, err := client.CurrentUser()
	if err != nil {
		fmt.Println("Error fetching user: ", err.Error())
		return nil, err
	}
	playlist, err := client.CreatePlaylistForUser(user.ID, "Playroll: "+playlistName, "", true)
	if err != nil {
		fmt.Println("Error creating playlist for user: ", err.Error())
		return nil, err
	}
	_, err = client.AddTracksToPlaylist(playlist.ID, trackIDs...)
	if err != nil {
		fmt.Println("Error adding songs for user: ", err.Error())
		return nil, err
	}
	return &trackIDs, nil
}

func GetSpotifyTrack(source *jsonmodels.MusicSource, _ *spotify.Client) (*[]jsonmodels.MusicSource, error) {
	return &[]jsonmodels.MusicSource{
		*jsonmodels.CreateTrack(source.Cover, source.Name, source.Provider, source.ProviderID),
	}, nil
}

func GetSpotifyAlbumTracks(source *jsonmodels.MusicSource, client *spotify.Client) (*[]jsonmodels.MusicSource, error) {
	tracks := []jsonmodels.MusicSource{}
	simpleTrackPage, err := client.GetAlbumTracksOpt(spotify.ID(source.ProviderID), 50, 0)
	if err != nil {
		return nil, err
	}
	for _, track := range simpleTrackPage.Tracks {
		tracks = append(tracks, *jsonmodels.CreateTrack(source.Cover, track.Name, source.Provider, string(track.ID)))
	}
	return &tracks, nil
}

func GetSpotifyArtistTracks(source *jsonmodels.MusicSource, client *spotify.Client) (*[]jsonmodels.MusicSource, error) {
	tracks := []jsonmodels.MusicSource{}
	fullTracks, err := client.GetArtistsTopTracks(spotify.ID(source.ProviderID), "US")
	if err != nil {
		return nil, err
	}
	for _, track := range fullTracks {
		tracks = append(tracks, *jsonmodels.CreateTrack(source.Cover, track.Name, source.Provider, string(track.ID)))
	}
	return &tracks, nil
}
