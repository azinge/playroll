package jsontypes

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models/jsonmodels"
)

type ProgressiveGenerateTracklistTypes struct {
	ProgressiveGenerateTracklistOutput *gqltag.Output `gql:"ProgressiveGenerateTracklistOutput"`
}

var progressiveGenerateTracklistOutputType = gqltag.Type{
	Description: `[Progressive Generate Tracklist Output Type Description Goes Here]`,
	Fields:      &jsonmodels.ProgressiveGenerateTracklistOutput{},
}

var LinkedProgressiveGenerateTracklistTypes = ProgressiveGenerateTracklistTypes{
	ProgressiveGenerateTracklistOutput: gqltag.LinkOutput(progressiveGenerateTracklistOutputType),
}
