import * as React from "react";
import renderer from "react-test-renderer";

import BrowseYouTubePlaylistsScreen from "../BrowseYouTubePlaylistsScreen";

it("renders correctly", () => {
  const tree = renderer.create(<BrowseYouTubePlaylistsScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
