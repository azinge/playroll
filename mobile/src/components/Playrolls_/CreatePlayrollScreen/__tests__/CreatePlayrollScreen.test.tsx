import * as React from "react";
import renderer from "react-test-renderer";

import CreatePlayrollScreen from "../CreatePlayrollScreen";

it("renders correctly", () => {
  const tree = renderer.create(<CreatePlayrollScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
