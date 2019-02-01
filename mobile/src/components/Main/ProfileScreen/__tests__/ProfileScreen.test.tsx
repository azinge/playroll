import * as React from "react";
import renderer from "react-test-renderer";

import ProfileScreen from "../ProfileScreen";

it("renders correctly", () => {
  const tree = renderer.create(<ProfileScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
