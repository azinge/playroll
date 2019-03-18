import * as React from "react";
import renderer from "react-test-renderer";

import SearchScreenHeader from "../SearchScreenHeader";

it("renders correctly", () => {
  const tree = renderer.create(<SearchScreenHeader />).toJSON();
  expect(tree).toMatchSnapshot();
});
