package private

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
	"github.com/cazinge/playroll/services/schema/resolvers/admin"
)

type DiscoveryQueueEntryMethods struct {
	GetCurrentUserDiscoveryQueueEntry    *gqltag.Query    `gql:"currentUserDiscoveryQueueEntry(id: ID!): DiscoveryQueueEntry"`
	CreateCurrentUserDiscoveryQueueEntry *gqltag.Mutation `gql:"createCurrentUserDiscoveryQueueEntry(input: DiscoveryQueueEntryInput!): DiscoveryQueueEntry"`
	UpdateCurrentUserDiscoveryQueueEntry *gqltag.Mutation `gql:"updateCurrentUserDiscoveryQueueEntry(id: ID!, input: DiscoveryQueueEntryInput!): DiscoveryQueueEntry"`
	DeleteCurrentUserDiscoveryQueueEntry *gqltag.Mutation `gql:"deleteCurrentUserDiscoveryQueueEntry(id: ID!): DiscoveryQueueEntry"`
}

// TODO(cazinge): Switch to using Authenticated style

var getCurrentUserDiscoveryQueueEntry = gqltag.Method{
	Description: `[Get Current User Discovery Queue Entry Description Goes Here]`,
	Request:     admin.GenerateGetEntityMethod(&models.DiscoveryQueueEntry{}),
}

var createCurrentUserDiscoveryQueueEntry = gqltag.Method{
	Description: `[Create Current User Discovery Queue Entry Description Goes Here]`,
	Request:     admin.GenerateCreateEntityMethod(&models.DiscoveryQueueEntry{}, &models.DiscoveryQueueEntryInput{}),
}

var updateCurrentUserDiscoveryQueueEntry = gqltag.Method{
	Description: `[Update Current User Discovery Queue Entry Description Goes Here]`,
	Request:     admin.GenerateUpdateEntityMethod(&models.DiscoveryQueueEntry{}, &models.DiscoveryQueueEntryInput{}),
}

var deleteCurrentUserDiscoveryQueueEntry = gqltag.Method{
	Description: `[Delete Current User Discovery Queue Entry Description Goes Here]`,
	Request:     admin.GenerateDeleteEntityMethod(&models.DiscoveryQueueEntry{}),
}

var LinkedDiscoveryQueueEntryMethods = DiscoveryQueueEntryMethods{
	GetCurrentUserDiscoveryQueueEntry:    gqltag.LinkQuery(getCurrentUserDiscoveryQueueEntry),
	CreateCurrentUserDiscoveryQueueEntry: gqltag.LinkMutation(createCurrentUserDiscoveryQueueEntry),
	UpdateCurrentUserDiscoveryQueueEntry: gqltag.LinkMutation(updateCurrentUserDiscoveryQueueEntry),
	DeleteCurrentUserDiscoveryQueueEntry: gqltag.LinkMutation(deleteCurrentUserDiscoveryQueueEntry),
}
