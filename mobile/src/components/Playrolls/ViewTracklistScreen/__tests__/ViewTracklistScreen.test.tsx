import * as React from "react";
import renderer from "react-test-renderer";

import ViewTracklistScreen from "../ViewTracklistScreen";

it("renders correctly", () => {
  const tree = renderer.create(<ViewTracklistScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
