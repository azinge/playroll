import React from "react";
import renderer from "react-test-renderer";

import AlertModal from "../AlertModal";

it("renders correctly", () => {
  const tree = renderer.create(<AlertModal />).toJSON();
  expect(tree).toMatchSnapshot();
});
