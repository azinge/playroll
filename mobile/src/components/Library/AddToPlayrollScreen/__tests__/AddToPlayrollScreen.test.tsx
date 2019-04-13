import * as React from "react";
import renderer from "react-test-renderer";

import AddToPlayrollScreen from "../AddToPlayrollScreen";

it("renders correctly", () => {
  const tree = renderer.create(<AddToPlayrollScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
