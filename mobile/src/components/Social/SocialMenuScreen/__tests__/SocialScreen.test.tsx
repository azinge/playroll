import * as React from "react";
import renderer from "react-test-renderer";

import SocialScreen from "../SocialScreen";

it("renders correctly", () => {
  const tree = renderer.create(<SocialScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
