import * as React from "react";
import renderer from "react-test-renderer";

import ViewAppleMusicPlaylistsScreen from "../ViewAppleMusicPlaylistsScreen";

it("renders correctly", () => {
  const tree = renderer.create(<ViewAppleMusicPlaylistsScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
