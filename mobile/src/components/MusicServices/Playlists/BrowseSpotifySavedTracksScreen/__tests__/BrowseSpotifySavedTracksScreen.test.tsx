import * as React from "react";
import renderer from "react-test-renderer";

import BrowseSpotifySavedTracksScreen from "../BrowseSpotifySavedTracksScreen";

it("renders correctly", () => {
  const tree = renderer.create(<BrowseSpotifySavedTracksScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
