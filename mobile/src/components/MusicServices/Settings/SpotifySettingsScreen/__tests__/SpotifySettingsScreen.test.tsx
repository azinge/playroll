import * as React from "react";
import renderer from "react-test-renderer";

import SpotifySettingsScreen from "../SpotifySettingsScreen";

it("renders correctly", () => {
  const tree = renderer.create(<SpotifySettingsScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
