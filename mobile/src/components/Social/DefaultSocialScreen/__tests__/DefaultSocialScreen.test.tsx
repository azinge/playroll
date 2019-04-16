import * as React from "react";
import renderer from "react-test-renderer";

import DefaultSocialScreen from "../DefaultSocialScreen";

it("renders correctly", () => {
  const tree = renderer.create(<DefaultSocialScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
