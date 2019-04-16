import * as React from "react";
import renderer from "react-test-renderer";

import ConnectYouTubeScreen from "../ConnectYouTubeScreen";

it("renders correctly", () => {
  const tree = renderer.create(<ConnectYouTubeScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
