package models

type Playroll struct {
	Model  `gql:"MODEL"`
	Name   string `gql:"name: String"`
	UserID uint   `gql:"userID: ID"`
	User   User   `gql:"user: User"`
	Rolls  []Roll `gql:"rolls: [Roll]" gorm:"auto_preload"`
}

type PlayrollInput struct {
	Name   string `gql:"name: String"`
	UserID uint   `gql:"userID: ID"`
}

type PlayrollOutput struct {
	Model  `gql:"MODEL"`
	Name   string `gql:"name: String"`
	UserID uint   `gql:"userID: ID"`
	User   User   `gql:"user: User"`
	Rolls  []Roll `gql:"rolls: [Roll]" gorm:"auto_preload"`
}

func (pi *PlayrollInput) CreatePlayrollFromInputFields() *Playroll {
	playroll := &Playroll{}
	playroll.Name = pi.Name
	return playroll
}
