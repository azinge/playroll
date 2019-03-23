package crud

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
)

type <ENTITY_NAME_HERE>Methods struct {
	Get<ENTITY_NAME_HERE>    *gqltag.Query    `gql:"<LOWER_ENTITY_NAME_HERE>(id: ID!): <ENTITY_NAME_HERE>"`
	List<ENTITY_NAME_HERE>s  *gqltag.Query    `gql:"list<ENTITY_NAME_HERE>s(offset: Int, count: Int): [<ENTITY_NAME_HERE>]"`
	Create<ENTITY_NAME_HERE> *gqltag.Mutation `gql:"create<ENTITY_NAME_HERE>(input: <ENTITY_NAME_HERE>Input!): <ENTITY_NAME_HERE>"`
	Update<ENTITY_NAME_HERE> *gqltag.Mutation `gql:"update<ENTITY_NAME_HERE>(id: ID!, input: <ENTITY_NAME_HERE>Input!): <ENTITY_NAME_HERE>"`
	Delete<ENTITY_NAME_HERE> *gqltag.Mutation `gql:"delete<ENTITY_NAME_HERE>(id: ID!): <ENTITY_NAME_HERE>"`
}

var get<ENTITY_NAME_HERE> = gqltag.Method{
	Description: `[Get <ENTITY_NAME_HERE> Description Goes Here]`,
	Request:     GenerateGetEntityMethod(&models.<ENTITY_NAME_HERE>{}),
}

var list<ENTITY_NAME_HERE>s = gqltag.Method{
	Description: `[List <ENTITY_NAME_HERE>s Description Goes Here]`,
	Request:     GenerateListEntityMethod(&models.<ENTITY_NAME_HERE>{}),
}

var create<ENTITY_NAME_HERE> = gqltag.Method{
	Description: `[Create <ENTITY_NAME_HERE> Description Goes Here]`,
	Request:     GenerateCreateEntityMethod(&models.<ENTITY_NAME_HERE>{}, &models.<ENTITY_NAME_HERE>Input{}),
}

var update<ENTITY_NAME_HERE> = gqltag.Method{
	Description: `[Update <ENTITY_NAME_HERE> Description Goes Here]`,
	Request:     GenerateUpdateEntityMethod(&models.<ENTITY_NAME_HERE>{}, &models.<ENTITY_NAME_HERE>Input{}),
}

var delete<ENTITY_NAME_HERE> = gqltag.Method{
	Description: `[Delete <ENTITY_NAME_HERE> Description Goes Here]`,
	Request:     GenerateDeleteEntityMethod(&models.<ENTITY_NAME_HERE>{}),
}

var Linked<ENTITY_NAME_HERE>Methods = <ENTITY_NAME_HERE>Methods{
	Get<ENTITY_NAME_HERE>:    gqltag.LinkQuery(get<ENTITY_NAME_HERE>),
	List<ENTITY_NAME_HERE>s:  gqltag.LinkQuery(list<ENTITY_NAME_HERE>s),
	Create<ENTITY_NAME_HERE>: gqltag.LinkMutation(create<ENTITY_NAME_HERE>),
	Update<ENTITY_NAME_HERE>: gqltag.LinkMutation(update<ENTITY_NAME_HERE>),
	Delete<ENTITY_NAME_HERE>: gqltag.LinkMutation(delete<ENTITY_NAME_HERE>),
}
