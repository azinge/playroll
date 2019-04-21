import * as React from "react";
import renderer from "react-test-renderer";

import FooterButton from "../FooterButton";

it("renders correctly", () => {
  const tree = renderer.create(<FooterButton />).toJSON();
  expect(tree).toMatchSnapshot();
});
