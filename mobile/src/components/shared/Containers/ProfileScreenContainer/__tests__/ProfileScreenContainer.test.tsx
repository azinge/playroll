import * as React from "react";
import renderer from "react-test-renderer";

import ProfileScreenContainer from "../ProfileScreenContainer";

it("renders correctly", () => {
  const tree = renderer.create(<ProfileScreenContainer />).toJSON();
  expect(tree).toMatchSnapshot();
});
