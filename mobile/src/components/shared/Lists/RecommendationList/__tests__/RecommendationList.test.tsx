import * as React from "react";
import renderer from "react-test-renderer";

import RecommendationList from "../RecommendationList";

it("renders correctly", () => {
  const tree = renderer.create(<RecommendationList />).toJSON();
  expect(tree).toMatchSnapshot();
});
