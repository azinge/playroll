package admin

import (
	"github.com/cazinge/playroll/services/gqltag"

	"github.com/cazinge/playroll/services/models"
)

type DiscoveryQueueEntryMethods struct {
	GetDiscoveryQueueEntry    *gqltag.Query    `gql:"discoveryQueueEntry(id: ID!): DiscoveryQueueEntry"`
	ListDiscoveryQueueEntries *gqltag.Query    `gql:"listDiscoveryQueueEntries(offset: Int, count: Int): [DiscoveryQueueEntry]"`
	CreateDiscoveryQueueEntry *gqltag.Mutation `gql:"createDiscoveryQueueEntry(input: DiscoveryQueueEntryInput!): DiscoveryQueueEntry"`
	UpdateDiscoveryQueueEntry *gqltag.Mutation `gql:"updateDiscoveryQueueEntry(id: ID!, input: DiscoveryQueueEntryInput!): DiscoveryQueueEntry"`
	DeleteDiscoveryQueueEntry *gqltag.Mutation `gql:"deleteDiscoveryQueueEntry(id: ID!): DiscoveryQueueEntry"`
}

var getDiscoveryQueueEntry = gqltag.Method{
	Description: `[Get DiscoveryQueueEntry Description Goes Here]`,
	Request:     GenerateGetEntityMethod(&models.DiscoveryQueueEntry{}),
}

var listDiscoveryQueueEntries = gqltag.Method{
	Description: `[List DiscoveryQueueEntries Description Goes Here]`,
	Request:     GenerateListEntityMethod(&models.DiscoveryQueueEntry{}),
}

var createDiscoveryQueueEntry = gqltag.Method{
	Description: `[Create DiscoveryQueueEntry Description Goes Here]`,
	Request:     GenerateCreateEntityMethod(&models.DiscoveryQueueEntry{}, &models.DiscoveryQueueEntryInput{}),
}

var updateDiscoveryQueueEntry = gqltag.Method{
	Description: `[Update DiscoveryQueueEntry Description Goes Here]`,
	Request:     GenerateUpdateEntityMethod(&models.DiscoveryQueueEntry{}, &models.DiscoveryQueueEntryInput{}),
}

var deleteDiscoveryQueueEntry = gqltag.Method{
	Description: `[Delete DiscoveryQueueEntry Description Goes Here]`,
	Request:     GenerateDeleteEntityMethod(&models.DiscoveryQueueEntry{}),
}

var LinkedDiscoveryQueueEntryMethods = DiscoveryQueueEntryMethods{
	GetDiscoveryQueueEntry:    gqltag.LinkQuery(getDiscoveryQueueEntry),
	ListDiscoveryQueueEntries: gqltag.LinkQuery(listDiscoveryQueueEntries),
	CreateDiscoveryQueueEntry: gqltag.LinkMutation(createDiscoveryQueueEntry),
	UpdateDiscoveryQueueEntry: gqltag.LinkMutation(updateDiscoveryQueueEntry),
	DeleteDiscoveryQueueEntry: gqltag.LinkMutation(deleteDiscoveryQueueEntry),
}
