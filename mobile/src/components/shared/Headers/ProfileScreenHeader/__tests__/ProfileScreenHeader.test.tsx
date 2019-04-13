import * as React from "react";
import renderer from "react-test-renderer";

import ProfileScreenHeader from "../ProfileScreenHeader";

it("renders correctly", () => {
  const tree = renderer.create(<ProfileScreenHeader />).toJSON();
  expect(tree).toMatchSnapshot();
});
