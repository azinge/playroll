import * as React from "react";
import renderer from "react-test-renderer";

import PlaceholderList from "../PlaceholderList";

it("renders correctly", () => {
  const tree = renderer.create(<PlaceholderList />).toJSON();
  expect(tree).toMatchSnapshot();
});
