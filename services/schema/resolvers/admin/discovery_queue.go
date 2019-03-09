package admin

import (
	"github.com/cazinge/playroll/services/gqltag"

	"github.com/cazinge/playroll/services/models"
)

type DiscoveryQueueMethods struct {
	GetDiscoveryQueue    *gqltag.Query    `gql:"discoveryQueue(id: ID!): DiscoveryQueue"`
	ListDiscoveryQueues  *gqltag.Query    `gql:"listDiscoveryQueues(offset: Int, count: Int): [DiscoveryQueue]"`
	CreateDiscoveryQueue *gqltag.Mutation `gql:"createDiscoveryQueue(input: DiscoveryQueueInput!): DiscoveryQueue"`
	UpdateDiscoveryQueue *gqltag.Mutation `gql:"updateDiscoveryQueue(id: ID!, input: DiscoveryQueueInput!): DiscoveryQueue"`
	DeleteDiscoveryQueue *gqltag.Mutation `gql:"deleteDiscoveryQueue(id: ID!): DiscoveryQueue"`
}

var getDiscoveryQueue = gqltag.Method{
	Description: `[Get DiscoveryQueue Description Goes Here]`,
	Request:     GenerateGetEntityMethod(&models.DiscoveryQueue{}),
}

var listDiscoveryQueues = gqltag.Method{
	Description: `[List DiscoveryQueues Description Goes Here]`,
	Request:     GenerateListEntityMethod(&models.DiscoveryQueue{}),
}

var createDiscoveryQueue = gqltag.Method{
	Description: `[Create DiscoveryQueue Description Goes Here]`,
	Request:     GenerateCreateEntityMethod(&models.DiscoveryQueue{}, &models.DiscoveryQueueInput{}),
}

var updateDiscoveryQueue = gqltag.Method{
	Description: `[Update DiscoveryQueue Description Goes Here]`,
	Request:     GenerateUpdateEntityMethod(&models.DiscoveryQueue{}, &models.DiscoveryQueueInput{}),
}

var deleteDiscoveryQueue = gqltag.Method{
	Description: `[Delete DiscoveryQueue Description Goes Here]`,
	Request:     GenerateDeleteEntityMethod(&models.DiscoveryQueue{}),
}

var LinkedDiscoveryQueueMethods = DiscoveryQueueMethods{
	GetDiscoveryQueue:    gqltag.LinkQuery(getDiscoveryQueue),
	ListDiscoveryQueues:  gqltag.LinkQuery(listDiscoveryQueues),
	CreateDiscoveryQueue: gqltag.LinkMutation(createDiscoveryQueue),
	UpdateDiscoveryQueue: gqltag.LinkMutation(updateDiscoveryQueue),
	DeleteDiscoveryQueue: gqltag.LinkMutation(deleteDiscoveryQueue),
}
