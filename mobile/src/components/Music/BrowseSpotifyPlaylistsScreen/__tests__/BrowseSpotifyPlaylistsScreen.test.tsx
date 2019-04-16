import * as React from "react";
import renderer from "react-test-renderer";

import BrowseSpotifyPlaylistsScreen from "../BrowseSpotifyPlaylistsScreen";

it("renders correctly", () => {
  const tree = renderer.create(<BrowseSpotifyPlaylistsScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
