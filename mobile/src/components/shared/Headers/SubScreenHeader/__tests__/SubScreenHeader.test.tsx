import * as React from "react";
import renderer from "react-test-renderer";

import SubScreenHeader from "../SubScreenHeader";

it("renders correctly", () => {
  const tree = renderer.create(<SubScreenHeader />).toJSON();
  expect(tree).toMatchSnapshot();
});
