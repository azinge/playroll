import * as React from "react";
import renderer from "react-test-renderer";

import MusicServicePlaylistsMenuScreen from "../MusicServicePlaylistsMenuScreen";

it("renders correctly", () => {
  const tree = renderer.create(<MusicServicePlaylistsMenuScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
