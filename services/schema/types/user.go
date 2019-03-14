package types

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
)

type UserTypes struct {
	User      *gqltag.Output `gql:"User"`
	UserInput *gqltag.Input  `gql:"UserInput"`
}

var userType = gqltag.Type{
	Description: `[User Type Description Goes Here]`,
	Fields:      &models.UserOutput{},
}

var userInputType = gqltag.Type{
	Description: `[User Input Type Description Goes Here]`,
	Fields:      &models.UserInput{},
}

var LinkedUserTypes = UserTypes{
	User:      gqltag.LinkOutput(userType),
	UserInput: gqltag.LinkInput(userInputType),
}
