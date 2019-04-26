import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { User, UserFragments } from '../../types';

export const STORE_DEVICE_TOKEN = 'STORE_DEVICE_TOKEN';

export const STORE_DEVICE_TOKEN_MUTATION = gql`
  mutation STORE_DEVICE_TOKEN($deviceToken: String) {
    private {
      storeDeviceToken(deviceToken: $deviceToken) {
        ...DefaultUser
      }
    }
  }
  ${UserFragments.default}
`;

type StoreDeviceTokenVariables = {
  deviceToken?: string;
};

type StoreDeviceTokenData = {
  private: {
    storeDeviceToken?: User;
  };
};

export class StoreDeviceTokenMutation extends Mutation<
  StoreDeviceTokenData,
  StoreDeviceTokenVariables
> {
  static defaultProps = {
    mutation: STORE_DEVICE_TOKEN_MUTATION,
  };
}
