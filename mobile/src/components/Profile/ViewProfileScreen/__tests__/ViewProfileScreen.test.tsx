import * as React from 'react';
import renderer from 'react-test-renderer';
import { MockedProvider } from 'react-apollo/test-utils';

import ViewProfileScreen from '../ViewProfileScreen';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <MockedProvider>
        <ViewProfileScreen />
      </MockedProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
