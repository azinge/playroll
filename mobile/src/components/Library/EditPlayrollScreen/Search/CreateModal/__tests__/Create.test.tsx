import React from 'react';
import renderer from 'react-test-renderer';

import CreateModal from "../CreateModal"

it("renders correctly", () => {
  const tree = renderer.create(<CreateModal />).toJSON()
  expect(tree).toMatchSnapshot()
})