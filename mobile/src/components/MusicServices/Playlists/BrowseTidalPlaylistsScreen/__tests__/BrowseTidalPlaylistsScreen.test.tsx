import * as React from "react";
import renderer from "react-test-renderer";

import BrowseTidalPlaylistsScreen from "../BrowseTidalPlaylistsScreen";

it("renders correctly", () => {
  const tree = renderer.create(<BrowseTidalPlaylistsScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
