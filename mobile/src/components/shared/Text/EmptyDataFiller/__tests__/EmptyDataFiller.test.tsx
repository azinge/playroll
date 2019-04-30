import * as React from "react";
import renderer from "react-test-renderer";

import EmptyDataFiller from "../EmptyDataFiller";

it("renders correctly", () => {
  const tree = renderer.create(<EmptyDataFiller />).toJSON();
  expect(tree).toMatchSnapshot();
});
