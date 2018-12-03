import React from "react";
import renderer from "react-test-renderer";

import Playrolls from "../Tracklist";

it("renders correctly", () => {
  const tree = renderer.create(<Playrolls />).toJSON();
  expect(tree).toMatchSnapshot();
});
