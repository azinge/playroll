import * as React from "react";
import renderer from "react-test-renderer";

import ManageDiscoveryQueueScreen from "../ManageDiscoveryQueueScreen";

it("renders correctly", () => {
  const tree = renderer.create(<ManageDiscoveryQueueScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
