import * as React from "react";
import renderer from "react-test-renderer";

import BrowseRecommendationsScreen from "../BrowseRecommendationsScreen";

it("renders correctly", () => {
  const tree = renderer.create(<BrowseRecommendationsScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
