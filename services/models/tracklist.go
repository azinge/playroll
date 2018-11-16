package models

type Tracklist struct {
	Model         `gql:"MODEL"`
	Starred       bool           `gql:"starred: Boolean"`
	Primary       bool           `gql:"primary: Boolean"`
	CompiledRolls []CompiledRoll `gql:"compiledRolls: [CompiledRoll]"`
}

type TracklistInput struct {
	Starred bool `gql:"starred: Boolean"`
	Primary bool `gql:"primary: Boolean"`
}

type TracklistOutput struct {
	Model         `gql:"MODEL"`
	Starred       bool           `gql:"starred: Boolean"`
	Primary       bool           `gql:"primary: Boolean"`
	CompiledRolls []CompiledRoll `gql:"compiledRolls: [CompiledRoll]"`
}

func (ti *TracklistInput) CreateTracklistFromInputFields() *Tracklist {
	tracklist := &Tracklist{}
	tracklist.Starred = ti.Starred
	tracklist.Primary = ti.Primary
	return tracklist
}
