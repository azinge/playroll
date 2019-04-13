import * as React from "react";
import renderer from "react-test-renderer";

import DetailedPlayrollCard from "../DetailedPlayrollCard";

it("renders correctly", () => {
  const tree = renderer.create(<DetailedPlayrollCard />).toJSON();
  expect(tree).toMatchSnapshot();
});
