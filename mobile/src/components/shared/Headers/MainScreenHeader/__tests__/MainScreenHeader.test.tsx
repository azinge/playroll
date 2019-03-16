import * as React from "react";
import renderer from "react-test-renderer";

import MainScreenHeader from "../MainScreenHeader";

it("renders correctly", () => {
  const tree = renderer.create(<MainScreenHeader />).toJSON();
  expect(tree).toMatchSnapshot();
});
