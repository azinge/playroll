import * as React from "react";
import renderer from "react-test-renderer";

import SignInScreen from "../SignInScreen";

it("renders correctly", () => {
  const tree = renderer.create(<SignInScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
