export type Playroll = {
  createdAt: string;
  deletedAt: string;
  id: number;
  name: string;
  rolls: [Roll];
  tracklists: [Tracklist];
  updatedAt: string;
  // user: User;
  userID: number;
};

export type PlayrollInput = {
  name: string;
  userID: number;
};

export type Roll = {
  createdAt?: string;
  data?: RollData;
  deletedAt?: string;
  id?: number;
  order?: number;
  playroll?: Playroll;
  playrollID?: number;
  updatedAt?: String;
};

export type RollInput = {
  data?: RollDataInput;
  playrollID?: number;
  order?: number;
};

export type CompiledRoll = {
  id?: number;
  data?: { tracks?: MusicSource[] };
};

export type Tracklist = {
  compiledRolls?: CompiledRoll[];
  createdAt?: string;
  deletedAt?: string;
  id?: number;
  isPrimary?: boolean;
  isStarred?: boolean;
  playrollID?: number;
  updatedAt?: string;
};

export type MusicSource = {
  cover?: string;
  name?: string;
  provider?: string;
  providerID?: string;
  type?: string;
};

export type RollLength = {
  type?: string;
  modifications?: string[];
};

export type RollFilter = {
  type?: string;
  modifications?: string[];
};

export type RollData = {
  filter?: RollFilter;
  length?: RollLength;
  sources?: MusicSource[];
};

export type RollDataInput = {
  filter?: RollFilter;
  length?: RollLength;
  sources?: MusicSource[];
};
