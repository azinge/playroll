import * as React from "react";
import renderer from "react-test-renderer";

import AppleMusicSettingsScreen from "../AppleMusicSettingsScreen";

it("renders correctly", () => {
  const tree = renderer.create(<AppleMusicSettingsScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
