import * as React from "react";
import renderer from "react-test-renderer";

import ViewDiscoveryQueueScreen from "../ViewDiscoveryQueueScreen";

it("renders correctly", () => {
  const tree = renderer.create(<ViewDiscoveryQueueScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
