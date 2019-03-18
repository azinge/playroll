import * as React from "react";
import renderer from "react-test-renderer";

import LibraryMenuScreen from "../LibraryMenuScreen";

it("renders correctly", () => {
  const tree = renderer.create(<LibraryMenuScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
