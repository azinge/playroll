import * as React from "react";
import renderer from "react-test-renderer";

import PlayrollsScreen from "../PlayrollsScreen";

it("renders correctly", () => {
  const tree = renderer.create(<PlayrollsScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
