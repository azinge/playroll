import * as React from "react";
import renderer from "react-test-renderer";

import PlayrollCard from "../PlayrollCard";

it("renders correctly", () => {
  const tree = renderer.create(<PlayrollCard />).toJSON();
  expect(tree).toMatchSnapshot();
});
