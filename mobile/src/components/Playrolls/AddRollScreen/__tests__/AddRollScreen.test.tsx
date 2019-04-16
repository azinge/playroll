import * as React from 'react';
import renderer from 'react-test-renderer';

import AddRollScreen from '../AddRollScreen';

it('renders correctly', () => {
  const tree = renderer.create(<AddRollScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
