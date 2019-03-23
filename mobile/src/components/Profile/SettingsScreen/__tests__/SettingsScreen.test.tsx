import * as React from "react";
import renderer from "react-test-renderer";

import SettingsScreen from "../SettingsScreen";

it("renders correctly", () => {
  const tree = renderer.create(<SettingsScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
