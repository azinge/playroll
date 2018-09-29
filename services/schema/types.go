package schema

type RollSource struct {
	Type          string   `json:"type"`
	Modifications []string `json:"modifications"`
}

type RollFilter struct {
	Type          string   `json:"type"`
	Modifications []string `json:"modifications"`
}

type RollLength struct {
	Type          string   `json:"type"`
	Modifications []string `json:"modifications"`
}

type MusicSource struct {
	Type   string `json:"type"`
	Source string `json:"modifications"`
}
