import * as React from "react";
import renderer from "react-test-renderer";

import ViewProfileScreen from "../ViewProfileScreen";

it("renders correctly", () => {
  const tree = renderer.create(<ViewProfileScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
