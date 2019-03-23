import * as React from "react";
import renderer from "react-test-renderer";

import DiscoverScreen from "../DiscoverScreen";

it("renders correctly", () => {
  const tree = renderer.create(<DiscoverScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
