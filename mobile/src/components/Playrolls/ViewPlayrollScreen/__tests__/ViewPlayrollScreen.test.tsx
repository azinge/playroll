import * as React from "react";
import renderer from "react-test-renderer";

import ViewPlayrollScreen from "../ViewPlayrollScreen";

it("renders correctly", () => {
  const tree = renderer.create(<ViewPlayrollScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
