import * as React from "react";
import renderer from "react-test-renderer";

import SearchScreenContainer from "../SearchScreenContainer";

it("renders correctly", () => {
  const tree = renderer.create(<SearchScreenContainer />).toJSON();
  expect(tree).toMatchSnapshot();
});
