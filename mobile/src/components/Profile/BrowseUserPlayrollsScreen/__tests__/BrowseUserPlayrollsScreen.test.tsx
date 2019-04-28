import * as React from "react";
import renderer from "react-test-renderer";

import BrowseUserPlayrollsScreen from "../BrowseUserPlayrollsScreen";

it("renders correctly", () => {
  const tree = renderer.create(<BrowseUserPlayrollsScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
