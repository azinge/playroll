import * as React from 'react';
import renderer from 'react-test-renderer';

import ManageRollScreen from '../ManageRollScreen';

it('renders correctly', () => {
  const tree = renderer.create(<ManageRollScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
