package resolvers

import (
	"github.com/cazinge/playroll/services/schema/resolvers/admin"
	"github.com/cazinge/playroll/services/schema/resolvers/private"
	"github.com/cazinge/playroll/services/schema/resolvers/public"
)

type AdminMethods struct {
	DeprecatedAdminMethods   admin.AdminMethods     `gql:"GROUP"`
	DeprecatedPrivateMethods private.PrivateMethods `gql:"GROUP"`
	DeprecatedPublicMethods  public.PublicMethods   `gql:"GROUP"`
	admin.AdminMethods       `gql:"GROUP: Admin"`
	private.PrivateMethods   `gql:"GROUP: Private"`
	public.PublicMethods     `gql:"GROUP: Public"`
}

type Methods struct {
	DeprecatedAdminMethods   admin.AdminMethods     `gql:"GROUP"`
	DeprecatedPrivateMethods private.PrivateMethods `gql:"GROUP"`
	DeprecatedPublicMethods  public.PublicMethods   `gql:"GROUP"`
	private.PrivateMethods   `gql:"GROUP: Private"`
	public.PublicMethods     `gql:"GROUP: Public"`
}

var LinkedAdminMethods = AdminMethods{
	DeprecatedAdminMethods:   admin.LinkedAdminMethods,
	DeprecatedPrivateMethods: private.LinkedPrivateMethods,
	DeprecatedPublicMethods:  public.LinkedPublicMethods,
	AdminMethods:             admin.LinkedAdminMethods,
	PrivateMethods:           private.LinkedPrivateMethods,
	PublicMethods:            public.LinkedPublicMethods,
}

var LinkedMethods = Methods{
	DeprecatedAdminMethods:   admin.LinkedAdminMethods,
	DeprecatedPrivateMethods: private.LinkedPrivateMethods,
	DeprecatedPublicMethods:  public.LinkedPublicMethods,
	PrivateMethods:           private.LinkedPrivateMethods,
	PublicMethods:            public.LinkedPublicMethods,
}
