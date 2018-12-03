import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

export const GET_PLAYROLLS = gql`
  query GET_PLAYROLLS {
    listPlayrolls {
      id
      name
      rolls {
        id
        data {
          sources {
            cover
            name
            type
          }
        }
      }
      tracklists {
        id
      }
    }
  }
`;

export const GENERATE_TRACKLIST_MUTATION = gql`
  mutation GENERATE_TRACKLIST($playrollID: ID!) {
    generateTracklist(playrollID: $playrollID) {
      id
    }
  }
`;

type GenerateTracklistVariables = {
  playrollID?: number;
};

type GenerateTracklistData = {
  generateTracklist?: { id: number };
};

export class GenerateTracklistMutation extends Mutation<
  GenerateTracklistData,
  GenerateTracklistVariables
> {}

export const DELETE_ROLL_MUTATION = gql`
  mutation DELETE_ROLL($id: ID!) {
    deleteRoll(id: $id) {
      id
    }
  }
`;

type DeleteRollVariables = {
  id?: number;
};

type DeleteRollData = {
  deleteRoll?: { id: number };
};

export class DeleteRollMutation extends Mutation<
  DeleteRollData,
  DeleteRollVariables
> {}

export const DELETE_PLAYROLL_MUTATION = gql`
  mutation DELETE_PLAYROLL($id: ID!) {
    deletePlayroll(id: $id) {
      id
    }
  }
`;

type DeletePlayrollVariables = {
  id?: number;
};

type DeletePlayrollData = {
  deletePlayroll?: { id: number };
};

export class DeletePlayrollMutation extends Mutation<
  DeletePlayrollData,
  DeletePlayrollVariables
> {}

export interface PlayrollInput {
  name: string;
  userID: number;
}

export const CREATE_PLAYROLL_MUTATION = gql`
  mutation CREATE_PLAYROLL($input: PlayrollInput!) {
    createPlayroll(input: $input) {
      id
    }
  }
`;

type CreatePlayrollVariables = {
  input?: PlayrollInput;
};

type CreatePlayrollData = {
  createPlayroll?: { id: number };
};

export class CreatePlayrollMutation extends Mutation<
  CreatePlayrollData,
  CreatePlayrollVariables
> {}
