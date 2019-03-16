import * as React from "react";
import renderer from "react-test-renderer";

import SubScreenContainer from "../SubScreenContainer";

it("renders correctly", () => {
  const tree = renderer.create(<SubScreenContainer />).toJSON();
  expect(tree).toMatchSnapshot();
});
