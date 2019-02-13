package generate

import (
	"errors"
	"fmt"
	"math/rand"
	"strconv"
	"time"

	"github.com/cazinge/playroll/services/models"
	"github.com/cazinge/playroll/services/models/jsonmodels"
	"github.com/zmb3/spotify"

	spotifyhelpers "github.com/cazinge/playroll/services/music_services/spotify"
)

func handleFilters(tracks []jsonmodels.MusicSource, filters *[]jsonmodels.RollFilter) ([]jsonmodels.MusicSource, error) {
	for _, filter := range *filters {
		switch filter.Type {
		case "Random":
			fmt.Printf("Random [Filter Type]!")
			trackscopy := []jsonmodels.MusicSource{}
			r := rand.New(rand.NewSource(time.Now().Unix()))
			for _, i := range r.Perm(len(tracks)) {
				trackscopy = append(trackscopy, tracks[i])
			}
			return trackscopy, nil
		case "In Order":
			fmt.Printf("In Order [Filter Type]: Don't modify!")
			return tracks, nil
		}
	}
	return tracks, nil
}

func handleLengths(tracks []jsonmodels.MusicSource, length *jsonmodels.RollLength) ([]jsonmodels.MusicSource, error) {
	switch length.Type {
	case "Number":
		fmt.Printf("Number [Length Type]!")

		offset, err := strconv.ParseInt(length.Modifications[0], 10, 64)
		if err != nil {
			fmt.Println("offset error in handleLengths()")
			fmt.Println(err)
			return nil, err
		}

		reqNumber, err := strconv.ParseInt(length.Modifications[1], 10, 64)
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
		fmt.Printf("Original [Length Type]: Don't modify!")
		return tracks, nil
	}
	return tracks, nil
}

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
		tracks, err := handleFilters(tracks, &roll.Data.Filters)
		if err != nil {
			return nil, err
		}
		tracks, err = handleLengths(tracks, &roll.Data.Length)
		if err != nil {
			return nil, err
		}
		compiledRolls = append(compiledRolls, models.CompiledRollOutput{
			Data:   jsonmodels.CompiledRollDataOutput{Tracks: tracks},
			RollID: roll.ID,
		})
	}
	return &compiledRolls, nil
}
