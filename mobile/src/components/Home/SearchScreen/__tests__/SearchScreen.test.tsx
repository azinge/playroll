import * as React from "react";
import renderer from "react-test-renderer";

import SearchScreen from "../SearchScreen";

it("renders correctly", () => {
  const tree = renderer.create(<SearchScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
