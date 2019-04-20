import * as React from "react";
import renderer from "react-test-renderer";

import BrowseFriendRequestsScreen from "../BrowseFriendRequestsScreen";

it("renders correctly", () => {
  const tree = renderer.create(<BrowseFriendRequestsScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
