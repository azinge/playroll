import * as React from 'react';
import renderer from 'react-test-renderer';
import { MockedProvider } from 'react-apollo/test-utils';

import SearchScreen from '../SearchScreen';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <MockedProvider>
        <SearchScreen />
      </MockedProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
