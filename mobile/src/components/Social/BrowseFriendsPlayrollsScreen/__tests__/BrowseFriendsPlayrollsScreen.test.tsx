import * as React from "react";
import renderer from "react-test-renderer";

import BrowseFriendsPlayrollsScreen from "../BrowseFriendsPlayrollsScreen";

it("renders correctly", () => {
  const tree = renderer.create(<BrowseFriendsPlayrollsScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
