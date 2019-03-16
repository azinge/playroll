import * as React from "react";
import renderer from "react-test-renderer";

import ViewFriendsScreen from "../ViewFriendsScreen";

it("renders correctly", () => {
  const tree = renderer.create(<ViewFriendsScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
