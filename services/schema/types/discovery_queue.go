package types

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
)

type DiscoveryQueueTypes struct {
	DiscoveryQueue      *gqltag.Output `gql:"DiscoveryQueue"`
	DiscoveryQueueInput *gqltag.Input  `gql:"DiscoveryQueueInput"`
}

var discoveryQueueType = gqltag.Type{
	Description: `[DiscoveryQueue Type Description Goes Here]`,
	Fields:      &models.DiscoveryQueueOutput{},
}

var discoveryQueueInputType = gqltag.Type{
	Description: `[DiscoveryQueue Input Type Description Goes Here]`,
	Fields:      &models.DiscoveryQueueInput{},
}

var LinkedDiscoveryQueueTypes = DiscoveryQueueTypes{
	DiscoveryQueue:      gqltag.LinkOutput(discoveryQueueType),
	DiscoveryQueueInput: gqltag.LinkInput(discoveryQueueInputType),
}
