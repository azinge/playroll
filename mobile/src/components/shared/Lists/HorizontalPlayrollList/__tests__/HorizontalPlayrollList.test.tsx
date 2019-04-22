import * as React from "react";
import renderer from "react-test-renderer";

import HorizontalPlayrollList from "../HorizontalPlayrollList";

it("renders correctly", () => {
  const tree = renderer.create(<HorizontalPlayrollList />).toJSON();
  expect(tree).toMatchSnapshot();
});
