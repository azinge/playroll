package generate

import (
	"github.com/cazinge/playroll/services/models"
	"github.com/cazinge/playroll/services/models/jsonmodels"
	"github.com/zmb3/spotify"

	spotifyhelpers "github.com/cazinge/playroll/services/music_services/spotify"
)

func CompileRolls(rolls *[]models.RollOutput, client *spotify.Client) (*[]models.CompiledRollOutput, error) {
	compiledRolls := []models.CompiledRollOutput{}
	for _, roll := range *rolls {
		tracks := []jsonmodels.MusicSource{}
		if sources := roll.Data.Sources; len(sources) > 0 {
			source := sources[0]
			switch source.Type {
			case "Track":
				result, err := spotifyhelpers.GetSpotifyTrack(&source, client)
				if err != nil {
					return nil, err
				}
				tracks = append(tracks, (*result)...)
			case "Album":
				result, err := spotifyhelpers.GetSpotifyAlbumTracks(&source, client)
				if err != nil {
					return nil, err
				}
				tracks = append(tracks, (*result)...)
			case "Artist":
				result, err := spotifyhelpers.GetSpotifyArtistTracks(&source, client)
				if err != nil {
					return nil, err
				}
				tracks = append(tracks, (*result)...)
			case "Playlist":
				result, err := spotifyhelpers.GetSpotifyPlaylistTracks(&source, client)
				if err != nil {
					return nil, err
				}
				tracks = append(tracks, (*result)...)
			}
		}
		compiledRolls = append(compiledRolls, models.CompiledRollOutput{
			Data:   jsonmodels.CompiledRollDataOutput{Tracks: tracks},
			RollID: roll.ID,
		})
	}
	return &compiledRolls, nil
}
