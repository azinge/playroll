import * as React from "react";
import renderer from "react-test-renderer";

import UserCard from "../UserCard";

it("renders correctly", () => {
  const tree = renderer.create(<UserCard />).toJSON();
  expect(tree).toMatchSnapshot();
});
