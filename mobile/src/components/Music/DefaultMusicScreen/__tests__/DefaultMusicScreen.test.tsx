import * as React from "react";
import renderer from "react-test-renderer";

import DefaultMusicScreen from "../DefaultMusicScreen";

it("renders correctly", () => {
  const tree = renderer.create(<DefaultMusicScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
