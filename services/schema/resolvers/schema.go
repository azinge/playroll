package resolvers

import (
	"github.com/cazinge/playroll/services/schema/resolvers/admin"
	"github.com/cazinge/playroll/services/schema/resolvers/private"
	"github.com/cazinge/playroll/services/schema/resolvers/public"
)

type AdminMethods struct {
	admin.AdminMethods     `gql:"GROUP: Admin"`
	private.PrivateMethods `gql:"GROUP: Private"`
	public.PublicMethods   `gql:"GROUP: Public"`
}

type Methods struct {
	private.PrivateMethods `gql:"GROUP: Private"`
	public.PublicMethods   `gql:"GROUP: Public"`
}

var LinkedAdminMethods = AdminMethods{
	AdminMethods:   admin.LinkedAdminMethods,
	PrivateMethods: private.LinkedPrivateMethods,
	PublicMethods:  public.LinkedPublicMethods,
}

var LinkedMethods = Methods{
	PrivateMethods: private.LinkedPrivateMethods,
	PublicMethods:  public.LinkedPublicMethods,
}
