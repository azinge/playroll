import * as React from "react";
import renderer from "react-test-renderer";

import SocialMainScreen from "../SocialMainScreen";

it("renders correctly", () => {
  const tree = renderer.create(<SocialMainScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
