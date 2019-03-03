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
	msc, err := models.FindMusicServiceCredentialByUserID(userID, db)
	if err != nil {
		fmt.Println("error finding MusicServiceCredential by userID: ", err.Error(), ", UserID:", userID)
		return nil, err
	}

	msco, err := models.MusicServiceCredentialModelToOutput(msc)
	if err != nil {
		fmt.Println("error creating output object for MusicServiceCredential: ", err.Error())
		return nil, err
	}
	token := &msco.Token

	client := spotify.NewAuthenticator(redirectURL, spotifyScopes...).NewClient(token)
	token, err = client.Token()
	if err != nil {
		fmt.Println("error fetching token: ", err.Error())
		return nil, err
	}

	dao := models.InitMusicServiceCredentialDAO(db)
	msc.Token, err = json.Marshal(token)
	if err != nil {
		fmt.Println("Error Marshalling token: ", err.Error())
		return nil, err
	}

	_, err = dao.Update(msc)
	if err != nil {
		fmt.Println("Error Updating Credentials: ", err.Error())
		return nil, err
	}
	return &client, err
}

func RegisterSpotifyAuthCodeForUser(userID uint, code string, db *gorm.DB) (*models.MusicServiceCredentialOutput, error) {
	oauthToken, err := spotify.NewAuthenticator(redirectURL, spotifyScopes...).Exchange(code)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}

	t2 := &oauth2.Token{}

	b, _ := json.Marshal(oauthToken)
	json.Unmarshal(b, t2)

	msc := models.InitMusicServiceCredentialDAO(db)
	musicServiceCredential := &models.MusicServiceCredential{
		Provider: "Spotify",
		UserID:   userID,
		Token:    b,
	}

	rawMusicServiceCredential, err := msc.Create(musicServiceCredential)
	if err != nil {
		return nil, err
	}
	return models.FormatMusicServiceCredential(rawMusicServiceCredential)
}

func SearchSpotify(query string, searchType string, client *spotify.Client) (*jsonmodels.SearchSpotifyOutput, error) {
	var searchResult *spotify.SearchResult
	var err error
	switch searchType {
	case "All":
		searchResult, err = client.Search(query, spotify.SearchTypeTrack|spotify.SearchTypeAlbum|spotify.SearchTypeArtist|spotify.SearchTypePlaylist)
	case "Track":
		searchResult, err = client.Search(query, spotify.SearchTypeTrack)
	case "Album":
		searchResult, err = client.Search(query, spotify.SearchTypeAlbum)
	case "Artist":
		searchResult, err = client.Search(query, spotify.SearchTypeArtist)
	case "Playlist":
		searchResult, err = client.Search(query, spotify.SearchTypePlaylist)
	default:
		return nil, fmt.Errorf("Search Type Not Found")
	}
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	output := jsonmodels.SearchSpotifyOutput{}
	if searchResult.Tracks != nil {
		for _, track := range searchResult.Tracks.Tracks {
			cover := "https://www.unesale.com/ProductImages/Large/notfound.png"
			if images := track.Album.Images; len(images) > 0 {
				cover = images[0].URL
			}
			creator := ""
			if artists := track.Artists; len(artists) > 0 {
				creator = artists[0].Name
			}
			ms := jsonmodels.MusicSource{
				Type:       "Track",
				Name:       track.Name,
				Creator:    creator,
				Cover:      cover,
				Provider:   "Spotify",
				ProviderID: string(track.ID),
			}
			output.Tracks = append(output.Tracks, ms)
		}
	}
	if searchResult.Albums != nil {
		for _, album := range searchResult.Albums.Albums {
			cover := "https://www.unesale.com/ProductImages/Large/notfound.png"
			if images := album.Images; len(images) > 0 {
				cover = images[0].URL
			}
			creator := ""
			if artists := album.Artists; len(artists) > 0 {
				creator = artists[0].Name
			}
			ms := jsonmodels.MusicSource{
				Type:       "Album",
				Name:       album.Name,
				Cover:      cover,
				Creator:    creator,
				Provider:   "Spotify",
				ProviderID: string(album.ID),
			}
			output.Albums = append(output.Albums, ms)
		}
	}
	if searchResult.Artists != nil {
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
			output.Artists = append(output.Artists, ms)
		}
	}
	if searchResult.Playlists != nil {
		for _, playlist := range searchResult.Playlists.Playlists {
			cover := "https://www.unesale.com/ProductImages/Large/notfound.png"
			if images := playlist.Images; len(images) > 0 {
				cover = images[0].URL
			}
			ms := jsonmodels.MusicSource{
				Type:       "Playlist",
				Name:       playlist.Name,
				Cover:      cover,
				Creator:    playlist.Owner.DisplayName,
				Provider:   "Spotify",
				ProviderID: string(playlist.ID),
			}
			output.Playlists = append(output.Playlists, ms)
		}
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
		*jsonmodels.CreateTrack(source.Cover, source.Name, source.Creator, source.Provider, source.ProviderID),
	}, nil
}

func GetSpotifyAlbumTracks(source *jsonmodels.MusicSource, client *spotify.Client) (*[]jsonmodels.MusicSource, error) {
	tracks := []jsonmodels.MusicSource{}
	simpleTrackPage, err := client.GetAlbumTracksOpt(spotify.ID(source.ProviderID), 50, 0)
	if err != nil {
		return nil, err
	}
	for _, track := range simpleTrackPage.Tracks {
		tracks = append(tracks, *jsonmodels.CreateTrack(source.Cover, track.Name, source.Creator, source.Provider, string(track.ID)))
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
		tracks = append(tracks, *jsonmodels.CreateTrack(source.Cover, track.Name, source.Name, source.Provider, string(track.ID)))
	}
	return &tracks, nil
}

func GetSpotifyPlaylistTracks(source *jsonmodels.MusicSource, client *spotify.Client) (*[]jsonmodels.MusicSource, error) {
	tracks := []jsonmodels.MusicSource{}
	playlistTrackPage, err := client.GetPlaylistTracks(spotify.ID(source.ProviderID))
	if err != nil {
		return nil, err
	}
	for _, playlistTrack := range playlistTrackPage.Tracks {
		cover := source.Cover
		track := playlistTrack.Track
		if images := track.Album.Images; len(images) > 0 {
			cover = images[0].URL
		}
		tracks = append(tracks, *jsonmodels.CreateTrack(cover, track.Name, source.Creator, source.Provider, string(track.ID)))
	}
	return &tracks, nil
}
