import * as React from "react";
import renderer from "react-test-renderer";

import MusicMenuScreen from "../MusicMenuScreen";

it("renders correctly", () => {
  const tree = renderer.create(<MusicMenuScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
