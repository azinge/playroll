import * as React from "react";
import renderer from "react-test-renderer";

import ConnectTidalScreen from "../ConnectTidalScreen";

it("renders correctly", () => {
  const tree = renderer.create(<ConnectTidalScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
