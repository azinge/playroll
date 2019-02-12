import * as React from "react";
import renderer from "react-test-renderer";

import ManageProfileScreen from "../ManageProfileScreen";

it("renders correctly", () => {
  const tree = renderer.create(<ManageProfileScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
