import * as React from "react";
import renderer from "react-test-renderer";

import PlayrollList from "../PlayrollList";

it("renders correctly", () => {
  const tree = renderer.create(<PlayrollList />).toJSON();
  expect(tree).toMatchSnapshot();
});
