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
	client.AutoRetry = true
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
		fmt.Println("error getting spotify client: ", err.Error())
		return nil, err
	}

	user, err := client.CurrentUser()
	if err != nil {
		fmt.Println("error fetching user: ", err.Error())
		return nil, err
	}
	playlist, err := client.CreatePlaylistForUser(user.ID, "Playroll: "+playlistName, "", true)
	if err != nil {
		fmt.Println("error creating playlist for user: ", err.Error())
		return nil, err
	}
	_, err = client.AddTracksToPlaylist(playlist.ID, trackIDs...)
	if err != nil {
		fmt.Println("error adding songs for user: ", err.Error())
		return nil, err
	}
	return &trackIDs, nil
}

func GetSpotifyTrack(id spotify.ID, client *spotify.Client) (*models.MusicServiceTrack, error) {
	tracks, err := GetSpotifyTracks(&[]spotify.ID{id}, client)
	if err != nil {
		fmt.Println("error retrieving track: ", err.Error())
		return nil, err
	}
	if len(*tracks) <= 0 || &(*tracks)[0] == nil {
		return nil, fmt.Errorf("error retrieving tracks, no tracks found")
	}
	return &(*tracks)[0], nil
}

func GetSpotifyTracks(ids *[]spotify.ID, client *spotify.Client) (*[]models.MusicServiceTrack, error) {
	// audioFeatures, err := client.GetAudioFeatures(*ids...)
	// if err != nil {
	// 	fmt.Println("Error retrieving audio features: ", err.Error())
	// 	return nil, err
	// }
	// tracks, err := client.GetTracks(ids...)
	// if err != nil {
	// 	fmt.Println("Error retrieving tracks: ", err.Error())
	// 	return nil, err
	// }

	msts := make([]models.MusicServiceTrack, len(*ids))
	for i, id := range *ids {
		msts[i].Provider = "Spotify"
		msts[i].ProviderID = string(id)
		//msts[i].*audiofeatures* = audioFeatures[i].*audiofeatures*
		//msts[i].*trackdetails* = audioFeatures[i].*trackdetails*
	}

	return &msts, nil
}

func GetSpotifyAlbum(id spotify.ID, client *spotify.Client) (msa *models.MusicServiceAlbum, err error) {
	albums, err := GetSpotifyAlbums(&[]spotify.ID{id}, client)
	if err != nil {
		fmt.Println("error retrieving album: ", err.Error())
		return nil, err
	}
	if len(*albums) <= 0 || &(*albums)[0] == nil {
		return nil, fmt.Errorf("error retrieving albums, no albums found")
	}
	return &(*albums)[0], nil
}

func GetSpotifyAlbums(ids *[]spotify.ID, client *spotify.Client) (msa *[]models.MusicServiceAlbum, err error) {
	albums, err := client.GetAlbums(*ids...)
	if err != nil {
		return nil, err
	}
	msas := make([]models.MusicServiceAlbum, len(albums))
	for i, album := range albums {
		msas[i] =
			models.MusicServiceAlbum{
				Provider:   "Spotify",
				ProviderID: string(album.ID),
			}
	}
	return &msas, nil
}

func GetSpotifyAlbumWithTracks(id spotify.ID, client *spotify.Client) (msa *models.MusicServiceAlbum, trackIDs *[]spotify.ID, err error) {
	album, err := client.GetAlbum(id)
	if err != nil {
		return nil, nil, err
	}
	ids := make([]spotify.ID, len(album.Tracks.Tracks))
	for i, track := range album.Tracks.Tracks {
		ids[i] = track.ID
	}
	msa = &models.MusicServiceAlbum{
		Provider:   "Spotify",
		ProviderID: string(album.ID),
	}
	return msa, &ids, nil
}

func GetSpotifyArtist(id spotify.ID, client *spotify.Client) (msa *models.MusicServiceArtist, err error) {
	artists, err := GetSpotifyArtists(&[]spotify.ID{id}, client)
	if err != nil {
		fmt.Println("error retrieving artist: ", err.Error())
		return nil, err
	}
	if len(*artists) <= 0 || &(*artists)[0] == nil {
		return nil, fmt.Errorf("error retrieving artists, no artists found")
	}
	return &(*artists)[0], nil
}

func GetSpotifyArtists(ids *[]spotify.ID, client *spotify.Client) (msa *[]models.MusicServiceArtist, err error) {
	artists, err := client.GetArtists(*ids...)
	if err != nil {
		return nil, err
	}
	msas := make([]models.MusicServiceArtist, len(artists))
	for i, artist := range artists {
		msas[i] =
			models.MusicServiceArtist{
				Provider:   "Spotify",
				ProviderID: string(artist.ID),
			}
	}
	return &msas, nil
}

func GetSpotifyArtistWithAlbums(id spotify.ID, client *spotify.Client) (msa *models.MusicServiceArtist, albumIDs *[]spotify.ID, err error) {
	artist, err := client.GetArtist(id)
	if err != nil {
		return nil, nil, err
	}
	albums, err := client.GetArtistAlbums(id)
	ids := make([]spotify.ID, len(albums.Albums))
	for i, album := range albums.Albums {
		ids[i] = album.ID
	}
	msa = &models.MusicServiceArtist{
		Provider:   "Spotify",
		ProviderID: string(artist.ID),
	}
	return msa, &ids, nil
}

func GetSpotifyPlaylist(id spotify.ID, client *spotify.Client) (msp *models.MusicServicePlaylist, err error) {
	playlist, err := client.GetPlaylist(id)
	if err != nil {
		return nil, err
	}
	msp = &models.MusicServicePlaylist{
		Provider:   "Spotify",
		ProviderID: string(playlist.ID),
	}
	return msp, nil
}

func GetSpotifyPlaylistWithTracks(id spotify.ID, client *spotify.Client) (msp *models.MusicServicePlaylist, trackIDs *[]spotify.ID, err error) {
	playlist, err := client.GetPlaylist(id)
	if err != nil {
		return nil, nil, err
	}
	ids := make([]spotify.ID, len(playlist.Tracks.Tracks))
	for i, track := range playlist.Tracks.Tracks {
		ids[i] = track.Track.ID
	}
	msp = &models.MusicServicePlaylist{
		Provider:   "Spotify",
		ProviderID: string(playlist.ID),
	}
	return msp, &ids, nil
}
