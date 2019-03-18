import * as React from "react";
import renderer from "react-test-renderer";

import ViewRecommendationsScreen from "../ViewRecommendationsScreen";

it("renders correctly", () => {
  const tree = renderer.create(<ViewRecommendationsScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
