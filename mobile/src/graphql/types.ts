import gql from 'graphql-tag';

// MusicSource Types / Fragments

export type MusicSource = {
  cover?: string;
  creator?: string;
  name?: string;
  provider?: string;
  providerID?: string;
  type?: string;
};

export type MusicSourceInput = MusicSource;

export const MusicSourceFragments = {
  default: gql`
    fragment DefaultMusicSource on MusicSource {
      cover
      creator
      name
      provider
      providerID
      type
    }
  `,
};

// RollFilter Types / Fragments

export type RollFilter = {
  type?: string;
  name?: string;
  modifications?: string[];
};

export type RollFilterInput = RollFilter;

export const RollFilterFragments = {
  default: gql`
    fragment DefaultRollFilter on RollFilter {
      type
      name
      modifications
    }
  `,
};

// RollData Types / Fragments

export type RollData = {
  filters?: RollFilter[];
  sources?: MusicSource[];
};

export type RollDataInput = {
  filters?: RollFilterInput[];
  sources?: MusicSourceInput[];
};

export const RollDataFragments = {
  default: gql`
    fragment DefaultRollData on RollData {
      sources {
        ...DefaultMusicSource
      }
      filters {
        ...DefaultRollFilter
      }
    }
    ${MusicSourceFragments.default}
    ${RollFilterFragments.default}
  `,
};

// DiscoveryQueueEntry Types / Fragments

export type DiscoveryQueueEntry = {
  id?: number;
  discoveryQueueID?: number;
  data?: RollData;
};

export const DiscoveryQueueEntryFragments = {
  default: gql`
    fragment DefaultDiscoveryQueueEntry on DiscoveryQueueEntry {
      id
      discoveryQueueID
      data {
        ...DefaultRollData
      }
    }
    ${RollDataFragments.default}
  `,
};

// DiscoveryQueue Types / Fragments

export type DiscoveryQueue = {
  id?: number;
  userID?: number;
  entries?: DiscoveryQueueEntry[];
};

export const DiscoveryQueueFragments = {
  default: gql`
    fragment DefaultDiscoveryQueue on DiscoveryQueue {
      id
      userID
      entries {
        ...DefaultDiscoveryQueueEntry
      }
    }
    ${DiscoveryQueueEntryFragments.default}
  `,
};

// User Types / Fragments

export type User = {
  id?: number;
  name?: string;
  avatar?: string;
  email?: string;
  accountType?: string;
};

export const UserFragments = {
  default: gql`
    fragment DefaultUser on User {
      id
      name
      avatar
      email
      accountType
    }
  `,
};

// Roll Types / Fragments

export type Roll = {
  id?: number;
  playrollID?: number;
  order?: number;
  data?: RollData;
};

export type RollInput = {
  data?: RollDataInput;
  playrollID?: number;
  order?: number;
};

export const RollFragments = {
  default: gql`
    fragment DefaultRoll on Roll {
      id
      playrollID
      order
      data {
        ...DefaultRollData
      }
    }
    ${RollDataFragments.default}
  `,
};

// CompiledRoll Types / Fragments

export type CompiledRoll = {
  id?: number;
  data?: { tracks?: MusicSource[] };
};

export const CompiledRollFragments = {
  default: gql`
    fragment DefaultCompiledRoll on CompiledRoll {
      id
      data {
        tracks {
          ...DefaultMusicSource
        }
      }
    }
    ${MusicSourceFragments.default}
  `,
};

// Tracklist Types / Fragments

export type Tracklist = {
  id?: number;
  playrollID?: number;
  isPrimary?: boolean;
  isStarred?: boolean;
  compiledRolls?: CompiledRoll[];
};

export const TracklistFragments = {
  default: gql`
    fragment DefaultTracklist on Tracklist {
      id
      playrollID
      isPrimary
      isStarred
      compiledRolls {
        ...DefaultCompiledRoll
      }
    }
    ${CompiledRollFragments.default}
  `,
};

// Playroll Types / Fragments

export type Playroll = {
  id?: number;
  userID: number;
  name?: string;
  rolls?: [Roll];
  tracklists?: [Tracklist];
};

export type PlayrollInput = {
  name?: string;
  userID?: number;
};

export const PlayrollFragments = {
  default: gql`
    fragment DefaultPlayroll on Playroll {
      id
      userID
      name
      rolls {
        ...DefaultRoll
      }
    }
    ${RollFragments.default}
  `,
  withTracklist: gql`
    fragment PlayrollWithTracklist on Playroll {
      id
      userID
      name
      rolls {
        ...DefaultRoll
      }
      tracklists {
        ...DefaultTracklist
      }
    }
    ${RollFragments.default}
    ${TracklistFragments.default}
  `,
};

// Recommendation Types / Fragments

export type Recommendation = {
  id?: number;
  userID?: number;
  recommenderID?: number;
  recommender?: User;
  isActive?: boolean;
  data?: RollData;
  playroll?: Playroll;
};

export const RecommendationFragments = {
  default: gql`
    fragment DefaultRecommendation on Recommendation {
      id
      isActive
      data {
        ...DefaultRollData
      }
      playroll {
        ...DefaultPlayroll
      }
      recommender {
        ...DefaultUser
      }
      user {
        ...DefaultUser
      }
    }
    ${RollDataFragments.default}
    ${PlayrollFragments.default}
    ${UserFragments.default}
  `,
};
