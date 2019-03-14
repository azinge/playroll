import * as React from 'react';
import renderer from 'react-test-renderer';

import ConnectSpotifyScreen from '../ConnectSpotifyScreen';

it('renders correctly', () => {
  const tree = renderer.create(<ConnectSpotifyScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
