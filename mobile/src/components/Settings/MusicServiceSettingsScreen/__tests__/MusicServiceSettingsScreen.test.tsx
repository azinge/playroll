import * as React from "react";
import renderer from "react-test-renderer";

import MusicServiceSettingsScreen from "../MusicServiceSettingsScreen";

it("renders correctly", () => {
  const tree = renderer.create(<MusicServiceSettingsScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
