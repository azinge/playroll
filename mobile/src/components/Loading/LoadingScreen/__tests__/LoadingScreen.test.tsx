import * as React from 'react';
import renderer from 'react-test-renderer';
import { MockedProvider } from 'react-apollo/test-utils';

import LoadingScreen from '../LoadingScreen';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <MockedProvider>
        <LoadingScreen />
      </MockedProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
