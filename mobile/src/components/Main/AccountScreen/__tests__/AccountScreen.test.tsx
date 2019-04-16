import * as React from "react";
import renderer from "react-test-renderer";

import AccountScreen from "../AccountScreen";

it("renders correctly", () => {
  const tree = renderer.create(<AccountScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
