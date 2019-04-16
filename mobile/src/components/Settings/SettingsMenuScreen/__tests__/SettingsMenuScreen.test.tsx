import * as React from "react";
import renderer from "react-test-renderer";

import SettingsMenuScreen from "../SettingsMenuScreen";

it("renders correctly", () => {
  const tree = renderer.create(<SettingsMenuScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
