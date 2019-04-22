import gql from 'graphql-tag';

// MusicSource Types

export type MusicSource = {
  cover?: string;
  creator?: string;
  name?: string;
  provider?: string;
  providerID?: string;
  type?: string;
};

export type MusicSourceInput = MusicSource;

// DiscoveryQueueEntry Types

type DiscoveryQueueEntry = {
  id?: number;
  discoveryQueueID?: number;
  data?: RollData;
};

// RollFilter Types

export type RollFilter = {
  type?: string;
  name?: string;
  modifications?: string[];
};

export type RollFilterInput = RollFilter;

// RollData Types

export type RollData = {
  filters?: RollFilter[];
  sources?: MusicSource[];
};

export type RollDataInput = {
  filters?: RollFilterInput[];
  sources?: MusicSourceInput[];
};

// DiscoveryQueue Types

export type DiscoveryQueue = {
  id?: number;
  userID?: number;
  entries?: DiscoveryQueueEntry[];
};

// Roll Types

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

// CompiledRoll Types

export type CompiledRoll = {
  id?: number;
  data?: { tracks?: MusicSource[] };
};

// Tracklist Types

export type Tracklist = {
  id?: number;
  playrollID?: number;
  isPrimary?: boolean;
  isStarred?: boolean;
  compiledRolls?: CompiledRoll[];
};

// User Types

export type User = {
  id?: number;
  name?: string;
  avatar?: string;
  email?: string;
  accountType?: string;
  relationships?: Relationship[];
};

// Playroll Types

export type Playroll = {
  id?: number;
  userID?: number;
  user?: User;
  name?: string;
  rolls?: Roll[];
  tracklists?: Tracklist[];
};

export type PlayrollInput = {
  name?: string;
  userID?: number;
};

// Recommendation Types

export type Recommendation = {
  id?: number;
  userID?: number;
  recommenderID?: number;
  recommender?: User;
  isActive?: boolean;
  data?: RollData;
  playroll?: Playroll;
};

export type RecommendationInput = {
  userID?: number;
  recommenderID?: number;
  isActive?: boolean;
  data?: RollData;
  playrollID?: Playroll;
};

// Relationship Types

export type Relationship = {
  createdAt?: string;
  deletedAt?: string;
  id?: number;
  isBlocking?: boolean;
  otherUser?: User;
  otherUserID?: number;
  status?: string;
  updatedAt?: string;
  user?: User;
  userID?: number;
};

// Default Fragments

const MusicSourceFragments = {
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

const RollFilterFragments = {
  default: gql`
    fragment DefaultRollFilter on RollFilter {
      type
      name
      modifications
    }
  `,
};

const RollDataFragments = {
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

const DiscoveryQueueEntryFragments = {
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

const DiscoveryQueueFragments = {
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

const RollFragments = {
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

const CompiledRollFragments = {
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

const TracklistFragments = {
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

const RelationshipFragments = {
  default: gql`
    fragment DefaultRelationship on Relationship {
      createdAt
      deletedAt
      id
      isBlocking
      otherUserID
      status
      updatedAt
      userID
    }
  `,
  withOtherUser: undefined,
};

const UserFragments = {
  default: gql`
    fragment DefaultUser on User {
      id
      name
      avatar
      email
      accountType
    }
  `,
  withRelationships: undefined,
};

const PlayrollFragments = {
  default: gql`
    fragment DefaultPlayroll on Playroll {
      id
      userID
      name
      rolls {
        ...DefaultRoll
      }
      user {
        ...DefaultUser
      }
    }
    ${RollFragments.default}
    ${UserFragments.default}
  `,
  withTracklists: undefined,
};

const RecommendationFragments = {
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

// Extra Fragments

UserFragments.withRelationships = gql`
  fragment UserWithRelationships on User {
    id
    name
    avatar
    email
    accountType
    relationships {
      ...DefaultRelationship
    }
  }
  ${RelationshipFragments.default}
`;

RelationshipFragments.withOtherUser = gql`
  fragment RelationshipWithOtherUser on Relationship {
    createdAt
    deletedAt
    id
    isBlocking
    otherUser {
      ...DefaultUser
    }
    otherUserID
    status
    updatedAt
    userID
  }
  ${UserFragments.default}
`;

PlayrollFragments.withTracklists = gql`
  fragment PlayrollWithTracklists on Playroll {
    id
    userID
    name
    rolls {
      ...DefaultRoll
    }
    tracklists {
      ...DefaultTracklist
    }
    user {
      ...DefaultUser
    }
  }
  ${RollFragments.default}
  ${TracklistFragments.default}
  ${UserFragments.default}
`;

export {
  MusicSourceFragments,
  RollDataFragments,
  RollFragments,
  DiscoveryQueueEntryFragments,
  DiscoveryQueueFragments,
  CompiledRollFragments,
  TracklistFragments,
  RelationshipFragments,
  UserFragments,
  PlayrollFragments,
  RecommendationFragments,
};
