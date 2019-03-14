import * as React from 'react';
import renderer from 'react-test-renderer';

import ConfirmationScreen from '../ConfirmationScreen';

it('renders correctly', () => {
  const tree = renderer.create(<ConfirmationScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
