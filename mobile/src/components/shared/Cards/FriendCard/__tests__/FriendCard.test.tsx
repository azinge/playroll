import * as React from "react";
import renderer from "react-test-renderer";

import FriendCard from "../FriendCard";

it("renders correctly", () => {
  const tree = renderer.create(<FriendCard />).toJSON();
  expect(tree).toMatchSnapshot();
});
