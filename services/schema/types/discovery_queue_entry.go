package types

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
)

type DiscoveryQueueEntryTypes struct {
	DiscoveryQueueEntry      *gqltag.Output `gql:"DiscoveryQueueEntry"`
	DiscoveryQueueEntryInput *gqltag.Input  `gql:"DiscoveryQueueEntryInput"`
}

var discoveryQueueEntryType = gqltag.Type{
	Description: `[DiscoveryQueueEntry Type Description Goes Here]`,
	Fields:      &models.DiscoveryQueueEntryOutput{},
}

var discoveryQueueEntryInputType = gqltag.Type{
	Description: `[DiscoveryQueueEntry Input Type Description Goes Here]`,
	Fields:      &models.DiscoveryQueueEntryInput{},
}

var LinkedDiscoveryQueueEntryTypes = DiscoveryQueueEntryTypes{
	DiscoveryQueueEntry:      gqltag.LinkOutput(discoveryQueueEntryType),
	DiscoveryQueueEntryInput: gqltag.LinkInput(discoveryQueueEntryInputType),
}
