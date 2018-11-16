package types

import (
	"github.com/cazinge/playroll/services/schema/types/jsontypes"
)

type Types struct {
	PlayrollTypes           `gql:"GROUP"`
	RollTypes               `gql:"GROUP"`
	TracklistTypes          `gql:"GROUP"`
	CompiledRollTypes       `gql:"GROUP"`
	ExternalCredentialTypes `gql:"GROUP"`
	UserTypes               `gql:"GROUP"`
	jsontypes.JSONTypes     `gql:"GROUP"`
}

var LinkedTypes = Types{
	PlayrollTypes:           LinkedPlayrollTypes,
	RollTypes:               LinkedRollTypes,
	TracklistTypes:          LinkedTracklistTypes,
	CompiledRollTypes:       LinkedCompiledRollTypes,
	ExternalCredentialTypes: LinkedExternalCredentialTypes,
	UserTypes:               LinkedUserTypes,
	JSONTypes:               jsontypes.LinkedJSONTypes,
}
