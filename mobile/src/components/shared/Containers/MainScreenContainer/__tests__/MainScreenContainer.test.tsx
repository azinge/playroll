import * as React from "react";
import renderer from "react-test-renderer";

import MainScreenContainer from "../MainScreenContainer";

it("renders correctly", () => {
  const tree = renderer.create(<MainScreenContainer />).toJSON();
  expect(tree).toMatchSnapshot();
});
