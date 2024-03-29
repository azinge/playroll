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

const redirectURL = "http://app.playroll.io"
const devRedirectURL = "https://app-dev.playroll.io"

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

func RegisterSpotifyAuthCodeForUser(userID uint, code string, db *gorm.DB, devMode bool) (*models.MusicServiceCredentialOutput, error) {
	redirectLocation := redirectURL
	if devMode {
		redirectLocation = devRedirectURL
	}
	oauthToken, err := spotify.NewAuthenticator(redirectLocation, spotifyScopes...).Exchange(code)
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

func extractCover(images []spotify.Image) string {
	cover := "https://www.unesale.com/ProductImages/Large/notfound.png"
	if len(images) > 0 {
		cover = images[0].URL
	}
	return cover
}

func extractArtist(artists []spotify.SimpleArtist) (id, name string) {
	if len(artists) > 0 {
		id = string(artists[0].ID)
		name = artists[0].Name
	}
	return id, name
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

func ListPlaylistsFromClient(client *spotify.Client, db *gorm.DB, offset uint, count uint) (*[]jsonmodels.MusicSource, error) {
	o := int(offset)
	c := int(count)
	playlistsPage, err := client.CurrentUsersPlaylistsOpt(&spotify.Options{Offset: &o, Limit: &c})
	if err != nil {
		fmt.Println("error fetching playlists: ", err.Error())
		return nil, err
	}
	playlists := make([]jsonmodels.MusicSource, len(playlistsPage.Playlists))
	for i, playlist := range playlistsPage.Playlists {
		playlists[i] = jsonmodels.MusicSource{
			Type:       "Playlist",
			Provider:   "Spotify",
			ProviderID: string(playlist.ID),
			Name:       playlist.Name,
			Creator:    playlist.Owner.DisplayName,
			Cover:      extractCover(playlist.Images),
		}
	}
	return &playlists, nil
}

func ListPlaylistTracksFromClient(playlistID string, client *spotify.Client, db *gorm.DB, offset uint, count uint) (*[]jsonmodels.MusicSource, error) {
	o := int(offset)
	c := int(count)
	playlistTracks, err := client.GetPlaylistTracksOpt(spotify.ID(playlistID), &spotify.Options{Offset: &o, Limit: &c}, "total,limit,items(track(name,id,artists(name),album(images)))")
	if err != nil {
		fmt.Println("error fetching playlist: ", err.Error())
		return nil, err
	}
	mss := make([]jsonmodels.MusicSource, len(playlistTracks.Tracks))
	for i, playlistTrack := range playlistTracks.Tracks {
		track := playlistTrack.Track
		_, artistName := extractArtist(track.Artists)
		mss[i] = jsonmodels.MusicSource{
			Type:       "Track",
			Provider:   "Spotify",
			ProviderID: string(track.ID),
			Name:       track.Name,
			Creator:    artistName,
			Cover:      extractCover(track.Album.Images),
		}
	}
	return &mss, nil
}

func ListSavedTracksFromClient(client *spotify.Client, db *gorm.DB, offset uint, count uint) (*[]jsonmodels.MusicSource, error) {
	o := int(offset)
	c := int(count)
	savedTracksPage, err := client.CurrentUsersTracksOpt(&spotify.Options{Offset: &o, Limit: &c})
	if err != nil {
		fmt.Println("error fetching savedTracks: ", err.Error())
		return nil, err
	}
	savedTracks := make([]jsonmodels.MusicSource, len(savedTracksPage.Tracks))
	for i, savedTrack := range savedTracksPage.Tracks {
		_, artistName := extractArtist(savedTrack.Artists)
		savedTracks[i] = jsonmodels.MusicSource{
			Type:       "Track",
			Provider:   "Spotify",
			ProviderID: string(savedTrack.ID),
			Name:       savedTrack.Name,
			Creator:    artistName,
			Cover:      extractCover(savedTrack.Album.Images),
		}
	}
	return &savedTracks, nil
}

func CreateSpotifyPlaylistFromTracks(tracks *[]jsonmodels.MusicSource, playlistName string, client *spotify.Client, db *gorm.DB) (string, error) {
	trackIDs := []spotify.ID{}
	for _, track := range *tracks {
		trackIDs = append(trackIDs, spotify.ID(track.ProviderID))
	}

	user, err := client.CurrentUser()
	if err != nil {
		fmt.Println("error fetching user: ", err.Error())
		return "", err
	}
	playlist, err := client.CreatePlaylistForUser(user.ID, "Playroll: "+playlistName, "", true)
	if err != nil {
		fmt.Println("error creating playlist for user: ", err.Error())
		return "", err
	}

	for i := 0; i < len(trackIDs); i += 100 {
		var err error
		if i+100 < len(trackIDs) {
			_, err = client.AddTracksToPlaylist(playlist.ID, trackIDs[i:i+100]...)
		} else {
			_, err = client.AddTracksToPlaylist(playlist.ID, trackIDs[i:]...)
		}
		if err != nil {
			fmt.Println("error adding songs for user: ", err.Error())
			return "", err
		}
	}
	return string(playlist.ID), nil
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
	ids2 := *ids
	if len(ids2) > 50 {
		ids2 = ids2[:50]
	}
	audioFeatures, err := client.GetAudioFeatures(ids2...)
	if err != nil {
		fmt.Println("Error retrieving audio features: ", err.Error())
		return nil, err
	}
	tracks, err := client.GetTracks(ids2...)
	if err != nil {
		fmt.Println("Error retrieving tracks: ", err.Error())
		return nil, err
	}

	msts := make([]models.MusicServiceTrack, len(ids2))
	for i, id := range ids2 {
		// TODO: Link Genres, Secondary Artists, Available Markets
		msts[i].Provider = "Spotify"
		msts[i].ProviderID = string(id)

		// Full Track Attributes
		msts[i].Cover = extractCover(tracks[i].Album.Images)
		msts[i].Popularity = tracks[i].Popularity
		msts[i].AlbumID = string(tracks[i].Album.ID)
		msts[i].AlbumName = tracks[i].Album.Name
		msts[i].ArtistID, msts[i].ArtistName = extractArtist(tracks[i].Artists)
		msts[i].DiscNumber = tracks[i].DiscNumber
		msts[i].Duration = tracks[i].Duration
		msts[i].Explicit = tracks[i].Explicit
		msts[i].Name = tracks[i].Name
		msts[i].TrackNumber = tracks[i].TrackNumber

		// Audio Features
		msts[i].Acousticness = audioFeatures[i].Acousticness
		msts[i].Danceability = audioFeatures[i].Danceability
		msts[i].Energy = audioFeatures[i].Energy
		msts[i].Instrumentalness = audioFeatures[i].Instrumentalness
		msts[i].Key = audioFeatures[i].Key
		msts[i].Liveness = audioFeatures[i].Liveness
		msts[i].Loudness = audioFeatures[i].Loudness
		msts[i].Mode = audioFeatures[i].Mode
		msts[i].Speechiness = audioFeatures[i].Speechiness
		msts[i].Tempo = audioFeatures[i].Tempo
		msts[i].TimeSignature = audioFeatures[i].TimeSignature
		msts[i].Valence = audioFeatures[i].Valence
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
		artistID, artistName := extractArtist(album.Artists)
		msas[i] =
			models.MusicServiceAlbum{
				Provider:             "Spotify",
				ProviderID:           string(album.ID),
				Popularity:           album.Popularity,
				ReleaseDate:          album.ReleaseDate,
				ReleaseDatePrecision: album.ReleaseDatePrecision,
				Name:                 album.Name,
				ArtistID:             artistID,
				ArtistName:           artistName,
				AlbumGroup:           album.AlbumGroup,
				AlbumType:            album.AlbumType,
				Cover:                extractCover(album.Images),
			}
	}
	return &msas, nil
}

func GetSpotifyAlbumWithTracks(id spotify.ID, client *spotify.Client) (msa *models.MusicServiceAlbum, trackIDs *[]spotify.ID, err error) {
	album, err := client.GetAlbum(id)
	if err != nil {
		return nil, nil, err
	}

	albumTracks := &album.Tracks
	ids := make([]spotify.ID, albumTracks.Total)

	offset := 0
	limit := 50
	for offset < album.Tracks.Total {
		albumTracks, err = client.GetAlbumTracksOpt(id, limit, offset)
		if err != nil {
			return nil, nil, err
		}
		for i, track := range albumTracks.Tracks {
			ids[i+offset] = track.ID
		}
		offset += 50
	}

	artistID, artistName := extractArtist(album.Artists)
	msa =
		&models.MusicServiceAlbum{
			Provider:             "Spotify",
			ProviderID:           string(album.ID),
			Popularity:           album.Popularity,
			ReleaseDate:          album.ReleaseDate,
			ReleaseDatePrecision: album.ReleaseDatePrecision,
			Name:                 album.Name,
			ArtistID:             artistID,
			ArtistName:           artistName,
			AlbumGroup:           album.AlbumGroup,
			AlbumType:            album.AlbumType,
			Cover:                extractCover(album.Images),
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
				Popularity: artist.Popularity,
				Name:       artist.Name,
				Cover:      extractCover(artist.Images),
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
	ids := make([]spotify.ID, albums.Total)
	albumsTotal := albums.Total
	offset := 0
	limit := 50
	albumTypes := spotify.AlbumTypeAlbum | spotify.AlbumTypeSingle
	for offset < albumsTotal {
		albums, err = client.GetArtistAlbumsOpt(id, &spotify.Options{Offset: &offset, Limit: &limit}, &albumTypes)
		if err != nil {
			return nil, nil, err
		}
		for i, album := range albums.Albums {
			ids[i+offset] = album.ID
		}
		offset += 50
	}

	msa = &models.MusicServiceArtist{
		Provider:   "Spotify",
		ProviderID: string(artist.ID),
		Popularity: artist.Popularity,
		Name:       artist.Name,
		Cover:      extractCover(artist.Images),
	}
	return msa, &ids, nil
}

func GetSpotifyPlaylist(id spotify.ID, client *spotify.Client) (msp *models.MusicServicePlaylist, err error) {
	playlist, err := client.GetPlaylist(id)
	if err != nil {
		return nil, err
	}
	msp = &models.MusicServicePlaylist{
		Provider:    "Spotify",
		ProviderID:  string(playlist.ID),
		Description: playlist.Description,
		Cover:       extractCover(playlist.Images),
		Name:        playlist.Name,
		OwnerID:     playlist.Owner.ID,
		OwnerName:   playlist.Owner.DisplayName,
		SnapshotID:  playlist.SnapshotID,
		IsPublic:    playlist.IsPublic,
	}
	return msp, nil
}

func GetSpotifyPlaylistWithTracks(id spotify.ID, client *spotify.Client) (msp *models.MusicServicePlaylist, trackIDs *[]spotify.ID, err error) {
	playlist, err := client.GetPlaylist(id)
	if err != nil {
		return nil, nil, err
	}

	playlistTracks := &playlist.Tracks
	ids := make([]spotify.ID, playlistTracks.Total)

	offset := 0
	limit := 100
	for offset < playlist.Tracks.Total {
		playlistTracks, err = client.GetPlaylistTracksOpt(id, &spotify.Options{Offset: &offset, Limit: &limit}, "items(track(id))")
		if err != nil {
			return nil, nil, err
		}
		for i, track := range playlistTracks.Tracks {
			ids[i+offset] = track.Track.ID
		}
		offset += 100
	}
	msp = &models.MusicServicePlaylist{
		Provider:    "Spotify",
		ProviderID:  string(playlist.ID),
		Description: playlist.Description,
		Cover:       extractCover(playlist.Images),
		Name:        playlist.Name,
		OwnerID:     playlist.Owner.ID,
		OwnerName:   playlist.Owner.DisplayName,
		SnapshotID:  playlist.SnapshotID,
		IsPublic:    playlist.IsPublic,
	}
	return msp, &ids, nil
}
