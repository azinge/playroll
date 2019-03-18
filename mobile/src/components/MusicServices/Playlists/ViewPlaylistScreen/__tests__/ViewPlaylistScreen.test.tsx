import * as React from "react";
import renderer from "react-test-renderer";

import ViewPlaylistScreen from "../ViewPlaylistScreen";

it("renders correctly", () => {
  const tree = renderer.create(<ViewPlaylistScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
