import * as React from "react";
import renderer from "react-test-renderer";

import ChatRecommendationCard from "../ChatRecommendationCard";

it("renders correctly", () => {
  const tree = renderer.create(<ChatRecommendationCard />).toJSON();
  expect(tree).toMatchSnapshot();
});
