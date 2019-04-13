import * as React from "react";
import renderer from "react-test-renderer";

import GenerateTracklistScreen from "../GenerateTracklistScreen";

it("renders correctly", () => {
  const tree = renderer.create(<GenerateTracklistScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
