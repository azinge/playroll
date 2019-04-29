import * as React from "react";
import renderer from "react-test-renderer";

import BrowseSentRecommendationsScreen from "../BrowseSentRecommendationsScreen";

it("renders correctly", () => {
  const tree = renderer.create(<BrowseSentRecommendationsScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
