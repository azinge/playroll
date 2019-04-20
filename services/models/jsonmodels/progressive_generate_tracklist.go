package jsonmodels

type ProgressiveGenerateTracklistOutput struct {
	IsComplete         bool `gql:"isComplete: Boolean" json:"is_complete"`
	CurrentRollIndex   uint `gql:"currentRollIndex: Int" json:"current_roll_index"`
	CurrentSourceIndex uint `gql:"currentSourceIndex: Int" json:"current_source_index"`
	TracklistID        uint `gql:"tracklistID: Int" json:"tracklist_id"`
	PlayrollID         uint `gql:"playrollID: Int" json:"playroll_id"`
}
