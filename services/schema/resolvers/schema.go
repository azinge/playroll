package resolvers

import (
	"github.com/cazinge/playroll/services/schema/resolvers/admin"
	"github.com/cazinge/playroll/services/schema/resolvers/currentuser"
)

// type AdminMethods struct {
// 	admin.AdminMethods             `gql:"GROUP: Admin"`
// 	currentuser.CurrentUserMethods `gql:"GROUP: CurrentUser"`
// }

type Methods struct {
	admin.AdminMethods             `gql:"GROUP: Admin"` //TODO: Remove
	currentuser.CurrentUserMethods `gql:"GROUP: CurrentUser"`
}

// var LinkedAdminMethods = AdminMethods{
// 	AdminMethods:       admin.LinkedAdminMethods,
// 	CurrentUserMethods: currentuser.LinkedCurrentUserMethods,
// }

var LinkedMethods = Methods{
	AdminMethods:       admin.LinkedAdminMethods, //TODO: Remove
	CurrentUserMethods: currentuser.LinkedCurrentUserMethods,
}
