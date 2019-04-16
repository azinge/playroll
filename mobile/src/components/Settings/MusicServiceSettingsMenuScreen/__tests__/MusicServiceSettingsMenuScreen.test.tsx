import * as React from "react";
import renderer from "react-test-renderer";

import MusicServiceSettingsMenuScreen from "../MusicServiceSettingsMenuScreen";

it("renders correctly", () => {
  const tree = renderer.create(<MusicServiceSettingsMenuScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
