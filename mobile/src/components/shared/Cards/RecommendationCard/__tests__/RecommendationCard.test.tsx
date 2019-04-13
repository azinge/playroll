import * as React from "react";
import renderer from "react-test-renderer";

import RecommendationCard from "../RecommendationCard";

it("renders correctly", () => {
  const tree = renderer.create(<RecommendationCard />).toJSON();
  expect(tree).toMatchSnapshot();
});
