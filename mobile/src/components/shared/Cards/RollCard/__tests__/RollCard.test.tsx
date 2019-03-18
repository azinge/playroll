import * as React from "react";
import renderer from "react-test-renderer";

import RollCard from "../RollCard";

it("renders correctly", () => {
  const tree = renderer.create(<RollCard />).toJSON();
  expect(tree).toMatchSnapshot();
});
