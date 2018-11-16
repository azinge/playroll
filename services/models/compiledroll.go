package models

import (
	"github.com/cazinge/playroll/services/models/jsonmodels"
	"github.com/cazinge/playroll/services/utils"
)

type CompiledRoll struct {
	Model       `gql:"MODEL"`
	Order       string                      `gql:"order: String"`
	Data        jsonmodels.CompiledRollData `gql:"data: CompiledRollData"`
	TracklistID uint                        `gql:"tracklistID: ID"`
	Tracklist   Tracklist                   `gql:"tracklist: Tracklist"`
}

type CompiledRollInput struct {
	Order       string                           `gql:"order: String"`
	Data        jsonmodels.CompiledRollDataInput `gql:"data: CompiledRollDataInput"`
	TracklistID string                           `gql:"tracklistID: ID"`
}

type CompiledRollOutput struct {
	Model       `gql:"MODEL"`
	Order       string                            `gql:"order: String"`
	Data        jsonmodels.CompiledRollDataOutput `gql:"data: CompiledRollData"`
	TracklistID uint                              `gql:"tracklistID: ID"`
	Tracklist   Tracklist                         `gql:"tracklist: Tracklist"`
}

func (cri *CompiledRollInput) ToModel() (*CompiledRoll, error) {
	cr := &CompiledRoll{}
	cr.TracklistID = utils.StringIDToNumber(cri.TracklistID)
	cr.Order = cri.Order
	data, err := cri.Data.ToModel()
	if err != nil {
		return nil, err
	}
	cr.Data = *data
	return cr, nil
}

func (cr *CompiledRoll) ToOutput() (*CompiledRollOutput, error) {
	cro := &CompiledRollOutput{}
	cro.Model = cr.Model
	cro.TracklistID = cr.TracklistID
	cro.Order = cr.Order
	data, err := cr.Data.ToOutput()
	if err != nil {
		return nil, err
	}
	cro.Data = *data
	return cro, nil
}