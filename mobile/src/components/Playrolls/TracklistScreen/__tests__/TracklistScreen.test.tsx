import * as React from "react";
import renderer from "react-test-renderer";

import TracklistScreen from "../TracklistScreen";

it("renders correctly", () => {
  const tree = renderer.create(<TracklistScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
