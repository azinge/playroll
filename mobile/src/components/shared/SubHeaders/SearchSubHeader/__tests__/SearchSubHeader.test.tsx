import * as React from "react";
import renderer from "react-test-renderer";

import SearchSubHeader from "../SearchSubHeader";

it("renders correctly", () => {
  const tree = renderer.create(<SearchSubHeader />).toJSON();
  expect(tree).toMatchSnapshot();
});
