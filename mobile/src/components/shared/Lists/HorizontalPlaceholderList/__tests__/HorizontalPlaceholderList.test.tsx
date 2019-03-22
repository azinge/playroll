import * as React from "react";
import renderer from "react-test-renderer";

import HorizontalPlaceholderList from "../HorizontalPlaceholderList";

it("renders correctly", () => {
  const tree = renderer.create(<HorizontalPlaceholderList />).toJSON();
  expect(tree).toMatchSnapshot();
});
