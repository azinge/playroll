import * as React from "react";
import renderer from "react-test-renderer";

import EditPlayrollScreen from "../EditPlayrollScreen";

it("renders correctly", () => {
  const tree = renderer.create(<EditPlayrollScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
