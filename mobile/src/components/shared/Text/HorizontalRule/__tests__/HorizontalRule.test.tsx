import * as React from "react";
import renderer from "react-test-renderer";

import HorizontalRule from "../HorizontalRule";

it("renders correctly", () => {
  const tree = renderer.create(<HorizontalRule />).toJSON();
  expect(tree).toMatchSnapshot();
});
