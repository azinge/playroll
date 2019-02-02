package jsontypes

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models/jsonmodels"
)

type SearchSpotifyTypes struct {
	SearchSpotifyOutput *gqltag.Output `gql:"SearchSpotifyOutput"`
}

var searchSpotifyOutputType = gqltag.Type{
	Description: `[Search Spotify Output Type Description Goes Here]`,
	Fields:      &jsonmodels.SearchSpotifyOutput{},
}

var LinkedSearchSpotifyTypes = SearchSpotifyTypes{
	SearchSpotifyOutput: gqltag.LinkOutput(searchSpotifyOutputType),
}
