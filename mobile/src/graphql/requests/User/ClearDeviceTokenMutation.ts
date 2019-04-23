import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { User, UserFragments } from '../../types';

export const CLEAR_DEVICE_TOKEN = 'CLEAR_DEVICE_TOKEN';

export const CLEAR_DEVICE_TOKEN_MUTATION = gql`
  mutation CLEAR_DEVICE_TOKEN($deviceToken: String) {
    private {
      clearDeviceToken(deviceToken: $deviceToken) {
        ...DefaultUser
      }
    }
  }
  ${UserFragments.default}
`;

type ClearDeviceTokenVariables = {
  deviceToken?: string;
};

type ClearDeviceTokenData = {
  private: {
    clearDeviceToken?: User;
  };
};

export class ClearDeviceTokenMutation extends Mutation<
  ClearDeviceTokenData,
  ClearDeviceTokenVariables
> {
  static defaultProps = {
    mutation: CLEAR_DEVICE_TOKEN_MUTATION,
  };
}
