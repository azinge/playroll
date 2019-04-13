import * as React from 'react';
import renderer from 'react-test-renderer';

import Errors from '../Errors';

it('renders correctly', () => {
  const tree = renderer.create(<Errors />).toJSON();
  expect(tree).toMatchSnapshot();
});
