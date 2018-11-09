import React from "react";
import renderer from "react-test-renderer";

import HomeCarousel from "../HomeCarousel";

it("renders correctly", () => {
  const tree = renderer.create(<HomeCarousel />).toJSON();
  expect(tree).toMatchSnapshot();
});
