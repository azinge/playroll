import * as React from "react";
import renderer from "react-test-renderer";

import EditRollScreen from "../EditRollScreen";

it("renders correctly", () => {
  const tree = renderer.create(<EditRollScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
