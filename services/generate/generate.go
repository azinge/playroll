package generate

import (
	"errors"
	"fmt"
	"math/rand"
	"strconv"
	"time"

	"github.com/cazinge/playroll/services/generate/policies"
	"github.com/cazinge/playroll/services/models"
	"github.com/cazinge/playroll/services/models/jsonmodels"
	"github.com/jinzhu/gorm"
	"github.com/zmb3/spotify"
)

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
		gpm, err := policies.NewGeneratePolicyManager(&roll.Data.Filters, &roll.Data.Sources, db, client)
		if err != nil {
			return nil, err
		}
		msts, err := gpm.ExecuteQuery(db)
		if err != nil {
			return nil, err
		}

		tracks := make([]jsonmodels.MusicSource, len(*msts))
		for i, mst := range *msts {
			tracks[i] = jsonmodels.MusicSource{
				Type:       "Track",
				Name:       mst.Name,
				Creator:    mst.ArtistName,
				Cover:      mst.Cover,
				Provider:   mst.Provider,
				ProviderID: mst.ProviderID,
			}
		}

		compiledRolls = append(compiledRolls, models.CompiledRollOutput{
			Data:   jsonmodels.CompiledRollDataOutput{Tracks: tracks},
			RollID: roll.ID,
		})
	}
	return &compiledRolls, nil
}
