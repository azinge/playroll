import * as React from 'react';
import renderer from 'react-test-renderer';
import { MockedProvider } from 'react-apollo/test-utils';

import SignInScreen from '../SignInScreen';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <MockedProvider>
        <SignInScreen />
      </MockedProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
