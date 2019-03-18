import * as React from "react";
import renderer from "react-test-renderer";

import ViewPlayrollsScreen from "../ViewPlayrollsScreen";

it("renders correctly", () => {
  const tree = renderer.create(<ViewPlayrollsScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
