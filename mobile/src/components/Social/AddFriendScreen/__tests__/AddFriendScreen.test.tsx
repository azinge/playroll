import * as React from 'react';
import renderer from 'react-test-renderer';

import AddFriendScreen from '../AddFriendScreen';

it('renders correctly', () => {
  const tree = renderer.create(<AddFriendScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
