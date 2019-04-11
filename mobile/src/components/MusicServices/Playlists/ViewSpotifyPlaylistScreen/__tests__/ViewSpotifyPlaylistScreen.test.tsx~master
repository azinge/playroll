import * as React from "react";
import renderer from "react-test-renderer";

import ViewSpotifyPlaylistScreen from "../ViewSpotifyPlaylistScreen";

it("renders correctly", () => {
  const tree = renderer.create(<ViewSpotifyPlaylistScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
