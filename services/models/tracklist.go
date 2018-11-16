package models

type Tracklist struct {
	Model
	Starred       bool
	Primary       bool
	CompiledRolls []CompiledRoll `gorm:"auto_preload"`
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

func (ti *TracklistInput) ToModel() (*Tracklist, error) {
	t := &Tracklist{}
	t.Starred = ti.Starred
	t.Primary = ti.Primary
	return t, nil
}

func (t *Tracklist) ToOutput() (*TracklistOutput, error) {
	to := &TracklistOutput{}
	to.Model = t.Model
	to.Starred = t.Starred
	to.Primary = t.Primary
	to.CompiledRolls = t.CompiledRolls
	return to, nil
}

func (ti *TracklistInput) CreateTracklistFromInputFields() *Tracklist {
	tracklist := &Tracklist{}
	tracklist.Starred = ti.Starred
	tracklist.Primary = ti.Primary
	return tracklist
}
