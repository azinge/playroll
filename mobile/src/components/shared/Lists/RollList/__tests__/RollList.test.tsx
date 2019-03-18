import * as React from "react";
import renderer from "react-test-renderer";

import RollList from "../RollList";

it("renders correctly", () => {
  const tree = renderer.create(<RollList />).toJSON();
  expect(tree).toMatchSnapshot();
});
