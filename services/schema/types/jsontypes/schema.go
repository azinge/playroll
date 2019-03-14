package jsontypes

type JSONTypes struct {
	CompiledRollDataTypes `gql:"GROUP"`
	MusicSourceTypes      `gql:"GROUP"`
	RollDataTypes         `gql:"GROUP"`
	RollFilterTypes       `gql:"GROUP"`
	RollLengthTypes       `gql:"GROUP"`
	TokenTypes            `gql:"GROUP"`
	SearchSpotifyTypes    `gql:"GROUP"`
}

var LinkedJSONTypes = JSONTypes{
	CompiledRollDataTypes: LinkedCompiledRollDataTypes,
	MusicSourceTypes:      LinkedMusicSourceTypes,
	RollDataTypes:         LinkedRollDataTypes,
	RollFilterTypes:       LinkedRollFilterTypes,
	RollLengthTypes:       LinkedRollLengthTypes,
	TokenTypes:            LinkedTokenTypes,
	SearchSpotifyTypes:    LinkedSearchSpotifyTypes,
}
