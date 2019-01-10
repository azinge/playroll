import gql from "graphql-tag";
import { Mutation } from "react-apollo";

export interface MusicSource {
  cover?: string;
  name?: string;
  provider?: string;
  providerID?: string;
  type?: string;
}

export interface RollFilter {
  type?: string;
  modifications?: string[];
}

export interface RollLength {
  type?: string;
  modifications?: string[];
}

export interface RollDataInput {
  filter?: RollFilter;
  length?: RollLength;
  sources?: MusicSource[];
}

export interface RollInput {
  data?: RollDataInput;
  playrollID?: number;
  order?: number;
}

export const CREATE_ROLL_MUTATION = gql`
  mutation CREATE_ROLL($input: RollInput!) {
    createRoll(input: $input) {
      id
    }
  }
`;

type CreateRollVariables = {
  input?: RollInput;
};

type CreateRollData = {
  createRoll?: { id: number };
};

export class CreateRollMutation extends Mutation<
  CreateRollData,
  CreateRollVariables
> {}
