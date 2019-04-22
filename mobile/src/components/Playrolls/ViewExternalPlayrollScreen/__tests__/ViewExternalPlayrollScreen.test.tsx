import * as React from "react";
import renderer from "react-test-renderer";

import ViewExternalPlayrollScreen from "../ViewExternalPlayrollScreen";

it("renders correctly", () => {
  const tree = renderer.create(<ViewExternalPlayrollScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
