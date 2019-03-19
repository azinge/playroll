import * as React from "react";
import renderer from "react-test-renderer";

import BrowseAppleMusicPlaylistsScreen from "../BrowseAppleMusicPlaylistsScreen";

it("renders correctly", () => {
  const tree = renderer.create(<BrowseAppleMusicPlaylistsScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
