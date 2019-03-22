import * as React from "react";
import renderer from "react-test-renderer";

import FriendsMenuScreen from "../FriendsMenuScreen";

it("renders correctly", () => {
  const tree = renderer.create(<FriendsMenuScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
