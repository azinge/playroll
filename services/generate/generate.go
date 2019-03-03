package generate

import (
	"errors"
	"fmt"
	"math/rand"
	"strconv"
	"time"

	"github.com/cazinge/playroll/services/models"
	"github.com/cazinge/playroll/services/models/jsonmodels"
	"github.com/jinzhu/gorm"
	"github.com/zmb3/spotify"
)

func collectSource(source *jsonmodels.MusicSource, db *gorm.DB, client *spotify.Client) error {
	switch source.Type {
	case "Track":
		return collectTrack(source, db, client)
	case "Album":
		return collectAlbum(source, db, client)
	case "Artist":
		return collectArtist(source, db, client)
	case "Playlist":
		return collectPlaylist(source, db, client)
	default:
		return fmt.Errorf("error, could not find matching source type")
	}
}

func handleSource(tracks []jsonmodels.MusicSource, source jsonmodels.MusicSource, client *spotify.Client) ([]jsonmodels.MusicSource, error) {
	switch source.Type {
	// case "Track":
	// 	result, err := spotifyhelpers.GetSpotifyTrack(&source, client)
	// 	if err != nil {
	// 		return nil, err
	// 	}
	// 	return append(tracks, (*result)...), nil
	// case "Album":
	// 	result, err := spotifyhelpers.GetSpotifyAlbumTracks(&source, client)
	// 	if err != nil {
	// 		return nil, err
	// 	}
	// 	return append(tracks, (*result)...), nil
	// case "Artist":
	// 	result, err := spotifyhelpers.GetSpotifyArtistTracks(&source, client)
	// 	if err != nil {
	// 		return nil, err
	// 	}
	// 	return append(tracks, (*result)...), nil
	// case "Playlist":
	// 	result, err := spotifyhelpers.GetSpotifyPlaylistTracks(&source, client)
	// 	if err != nil {
	// 		return nil, err
	// 	}
	// 	return append(tracks, (*result)...), nil
	default:
		return tracks, nil
	}
}

func handleFilter(tracks []jsonmodels.MusicSource, filter jsonmodels.RollFilter) ([]jsonmodels.MusicSource, error) {
	switch filter.Type {
	case "Random":
		fmt.Println("Random [Filter Type]!")
		trackscopy := []jsonmodels.MusicSource{}
		r := rand.New(rand.NewSource(time.Now().Unix()))
		for _, i := range r.Perm(len(tracks)) {
			trackscopy = append(trackscopy, tracks[i])
		}
		return trackscopy, nil

	case "In Order":
		fmt.Println("In Order [Filter Type]: Don't modify!")
		return tracks, nil

	case "Number":
		fmt.Println("Number [Length Type]!")

		offset, err := strconv.ParseInt(filter.Modifications[0], 10, 64)
		if err != nil {
			fmt.Println("offset error in handleLengths()")
			fmt.Println(err)
			return nil, err
		}

		reqNumber, err := strconv.ParseInt(filter.Modifications[1], 10, 64)
		if err != nil {
			fmt.Println("reqNumber error in handleLengths()")
			fmt.Println(err)
			return nil, err
		}

		// TODO: handle throwing error on the FE when requested
		// number of tracks is greater than the actual tracks slice length.
		if reqNumber > int64(len(tracks)-1) {
			return nil, errors.New("requested # of tracks > tracks slice length")
		}

		tracks = tracks[offset:]
		complement := int64(len(tracks)) - reqNumber
		newTrackLength := int64(len(tracks)) - complement
		result := make([]jsonmodels.MusicSource, newTrackLength)
		for i := 0; i < int(newTrackLength); i++ {
			result[i] = tracks[i]
		}
		return result, nil

	case "Original":
		fmt.Println("Original [Length Type]: Don't modify!")
		return tracks, nil
	default:
		return tracks, nil
	}
}

func CompileRolls(rolls *[]models.RollOutput, db *gorm.DB, client *spotify.Client) (*[]models.CompiledRollOutput, error) {
	compiledRolls := []models.CompiledRollOutput{}
	for _, roll := range *rolls {
		for _, source := range roll.Data.Sources {
			var err error
			err = collectSource(&source, db, client)
			if err != nil {
				return nil, err
			}
		}

		tracks := []jsonmodels.MusicSource{}

		// for _, filter := range roll.Data.Filters {
		// 	var err error
		// 	tracks, err = handleFilter(tracks, filter)
		// 	if err != nil {
		// 		return nil, err
		// 	}
		// }

		compiledRolls = append(compiledRolls, models.CompiledRollOutput{
			Data:   jsonmodels.CompiledRollDataOutput{Tracks: tracks},
			RollID: roll.ID,
		})
	}
	return &compiledRolls, nil
}
