import * as React from "react";
import renderer from "react-test-renderer";

import BrowseExchangedRecommendationsScreen from "../BrowseExchangedRecommendationsScreen";

it("renders correctly", () => {
  const tree = renderer.create(<BrowseExchangedRecommendationsScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
