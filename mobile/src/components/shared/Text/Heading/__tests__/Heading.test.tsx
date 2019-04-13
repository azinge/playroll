import * as React from "react";
import renderer from "react-test-renderer";

import Heading from "../Heading";

it("renders correctly", () => {
  const tree = renderer.create(<Heading />).toJSON();
  expect(tree).toMatchSnapshot();
});
