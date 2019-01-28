import * as React from "react";
import renderer from "react-test-renderer";

import SignUpScreen from "../SignUpScreen";

it("renders correctly", () => {
  const tree = renderer.create(<SignUpScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
