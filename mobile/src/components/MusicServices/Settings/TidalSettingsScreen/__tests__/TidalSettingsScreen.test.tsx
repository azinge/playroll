import * as React from "react";
import renderer from "react-test-renderer";

import TidalSettingsScreen from "../TidalSettingsScreen";

it("renders correctly", () => {
  const tree = renderer.create(<TidalSettingsScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
