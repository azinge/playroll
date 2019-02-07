import * as React from "react";
import renderer from "react-test-renderer";

import BrowsePlayrollsScreen from "../BrowsePlayrollsScreen";

it("renders correctly", () => {
  const tree = renderer.create(<BrowsePlayrollsScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
