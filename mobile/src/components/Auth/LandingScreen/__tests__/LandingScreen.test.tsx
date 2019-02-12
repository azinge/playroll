import * as React from "react";
import renderer from "react-test-renderer";

import LandingScreen from "../LandingScreen";

it("renders correctly", () => {
  const tree = renderer.create(<LandingScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
