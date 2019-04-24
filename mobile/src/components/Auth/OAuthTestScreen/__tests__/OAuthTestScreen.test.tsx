import * as React from "react";
import renderer from "react-test-renderer";

import OAuthTestScreen from "../OAuthTestScreen";

it("renders correctly", () => {
  const tree = renderer.create(<OAuthTestScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
