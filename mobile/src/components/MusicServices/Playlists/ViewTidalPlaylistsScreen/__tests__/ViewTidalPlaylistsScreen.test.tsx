import * as React from "react";
import renderer from "react-test-renderer";

import ViewTidalPlaylistsScreen from "../ViewTidalPlaylistsScreen";

it("renders correctly", () => {
  const tree = renderer.create(<ViewTidalPlaylistsScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
