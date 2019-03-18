import * as React from "react";
import renderer from "react-test-renderer";

import ViewSpotifyPlaylistsScreen from "../ViewSpotifyPlaylistsScreen";

it("renders correctly", () => {
  const tree = renderer.create(<ViewSpotifyPlaylistsScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
