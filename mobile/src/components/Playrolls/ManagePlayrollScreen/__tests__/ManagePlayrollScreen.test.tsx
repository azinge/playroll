import * as React from "react";
import renderer from "react-test-renderer";

import ManagePlayrollScreen from "../ManagePlayrollScreen";

it("renders correctly", () => {
  const tree = renderer.create(<ManagePlayrollScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
