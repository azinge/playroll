package generate

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/cazinge/playroll/services/generate/policies"
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
	"github.com/cazinge/playroll/services/models/jsonmodels"
	"github.com/jinzhu/gorm"
	"github.com/zmb3/spotify"
)

func CompileRoll(roll *models.RollOutput, db *gorm.DB, client *spotify.Client) (*models.CompiledRollOutput, error) {
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
	return &models.CompiledRollOutput{
		Data:   jsonmodels.CompiledRollDataOutput{Tracks: tracks},
		Order:  roll.Order,
		RollID: roll.ID,
	}, nil
}

func CompileRolls(rolls *[]models.RollOutput, db *gorm.DB, client *spotify.Client) (*[]models.CompiledRollOutput, error) {
	compiledRolls := []models.CompiledRollOutput{}
	for _, roll := range *rolls {
		compiledRoll, err := CompileRoll(&roll, db, client)
		if err != nil {
			return nil, err
		}
		compiledRolls = append(compiledRolls, *compiledRoll)
	}
	return &compiledRolls, nil
}

func createPGTOutput(tracklist *models.Tracklist, isComplete bool, currentRollIndex, currentSourceIndex uint, db *gorm.DB) (*jsonmodels.ProgressiveGenerateTracklistOutput, error) {
	tracklist.IsComplete = isComplete
	tracklist.CurrentRollIndex = currentRollIndex
	tracklist.CurrentSourceIndex = currentSourceIndex
	if err := db.Save(tracklist).Error; err != nil {
		fmt.Println("error updating tracklist")
		return nil, err
	}
	return &jsonmodels.ProgressiveGenerateTracklistOutput{
		IsComplete:         isComplete,
		CurrentRollIndex:   currentRollIndex,
		CurrentSourceIndex: currentSourceIndex,
		PlayrollID:         tracklist.PlayrollID,
		TracklistID:        tracklist.ID,
	}, nil
}

func ProgressiveGenerateTracklist(playroll *models.PlayrollOutput, tracklist *models.Tracklist, rollBatchSize uint, mctx *gqltag.MethodContext, client *spotify.Client) (*jsonmodels.ProgressiveGenerateTracklistOutput, error) {
	deadline, _ := mctx.Context.Deadline()
	deadline = deadline.Add(-1500 * time.Millisecond)
	timeoutChannel := time.After(time.Until(deadline))
	db := mctx.DB
	currentRollBatchSize := uint(0)

	if tracklist.IsComplete {
		return createPGTOutput(tracklist, true, 0, 0, db)
	}

	rolls := playroll.Rolls
	for currentRollIndex := tracklist.CurrentRollIndex; currentRollIndex < uint(len(rolls)); currentRollIndex++ {
		currentRollBatchSize++
		select {
		case <-timeoutChannel:
			return createPGTOutput(tracklist, false, currentRollIndex, 0, db)

		default:
			sources := rolls[currentRollIndex].Data.Sources
			for currentSourceIndex := tracklist.CurrentSourceIndex; currentSourceIndex < uint(len(sources)); currentSourceIndex++ {
				select {
				case <-timeoutChannel:
					return createPGTOutput(tracklist, false, currentRollIndex, currentSourceIndex, db)
				default:
					done, err := policies.CollectSource(&sources[currentSourceIndex], db, client, timeoutChannel)
					if err != nil {
						return nil, err
					}
					if !done {
						return createPGTOutput(tracklist, false, currentRollIndex, currentSourceIndex, db)
					}
				}
			}
			compiledRollOutput, err := CompileRoll(&rolls[currentRollIndex], db, client)
			if err != nil {
				return nil, err
			}
			compiledRoll := &models.CompiledRoll{}
			compiledRoll.TracklistID = tracklist.ID
			compiledRoll.Order = compiledRollOutput.Order
			compiledRoll.RollID = compiledRollOutput.RollID
			tracks, err := json.Marshal(compiledRollOutput.Data.Tracks)
			if err != nil {
				return nil, err
			}
			compiledRoll.Data = jsonmodels.CompiledRollData{Tracks: tracks}
			crDAO := models.InitCompiledRollDAO(db)
			_, err = crDAO.Create(compiledRoll)
			if err != nil {
				return nil, err
			}
		}
		if currentRollBatchSize >= rollBatchSize {
			return createPGTOutput(tracklist, false, currentRollIndex+1, 0, db)
		}
	}

	return createPGTOutput(tracklist, true, 0, 0, db)
}
