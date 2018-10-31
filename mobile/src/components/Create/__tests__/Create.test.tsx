import React from "react";
import renderer from "react-test-renderer";

import Create from "../Create";

it("renders correctly", () => {
  const tree = renderer.create(<Create />).toJSON();
  expect(tree).toMatchSnapshot();
});
