import * as React from "react";
import renderer from "react-test-renderer";

import YouTubeSettingsScreen from "../YouTubeSettingsScreen";

it("renders correctly", () => {
  const tree = renderer.create(<YouTubeSettingsScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
