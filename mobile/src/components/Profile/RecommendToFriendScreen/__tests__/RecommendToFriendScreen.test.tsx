import * as React from "react";
import renderer from "react-test-renderer";

import RecommendToFriendScreen from "../RecommendToFriendScreen";

it("renders correctly", () => {
  const tree = renderer.create(<RecommendToFriendScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
