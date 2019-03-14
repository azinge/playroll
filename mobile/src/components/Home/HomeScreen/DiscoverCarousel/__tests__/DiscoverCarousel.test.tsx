import * as React from 'react';
import renderer from 'react-test-renderer';

import DiscoverCarousel from '../DiscoverCarousel';

it('renders correctly', () => {
  const tree = renderer.create(<DiscoverCarousel />).toJSON();
  expect(tree).toMatchSnapshot();
});
