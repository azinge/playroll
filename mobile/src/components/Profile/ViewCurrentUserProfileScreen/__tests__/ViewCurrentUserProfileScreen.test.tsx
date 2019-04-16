import * as React from "react";
import renderer from "react-test-renderer";

import ViewCurrentUserProfileScreen from "../ViewCurrentUserProfileScreen";

it("renders correctly", () => {
  const tree = renderer.create(<ViewCurrentUserProfileScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
