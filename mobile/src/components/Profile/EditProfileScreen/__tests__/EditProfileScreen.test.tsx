import * as React from "react";
import renderer from "react-test-renderer";

import EditProfileScreen from "../EditProfileScreen";

it("renders correctly", () => {
  const tree = renderer.create(<EditProfileScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
