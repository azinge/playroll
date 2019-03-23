package generate

import (
	"github.com/cazinge/playroll/services/generate/policies"
	"github.com/cazinge/playroll/services/models"
	"github.com/cazinge/playroll/services/models/jsonmodels"
	"github.com/jinzhu/gorm"
	"github.com/zmb3/spotify"
)

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
