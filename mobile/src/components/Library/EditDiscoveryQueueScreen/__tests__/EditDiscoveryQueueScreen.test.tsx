import * as React from "react";
import renderer from "react-test-renderer";

import EditDiscoveryQueueScreen from "../EditDiscoveryQueueScreen";

it("renders correctly", () => {
  const tree = renderer.create(<EditDiscoveryQueueScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
