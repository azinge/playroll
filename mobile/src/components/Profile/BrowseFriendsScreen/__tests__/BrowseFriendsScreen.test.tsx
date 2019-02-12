import * as React from "react";
import renderer from "react-test-renderer";

import BrowseFriendsScreen from "../BrowseFriendsScreen";

it("renders correctly", () => {
  const tree = renderer.create(<BrowseFriendsScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
