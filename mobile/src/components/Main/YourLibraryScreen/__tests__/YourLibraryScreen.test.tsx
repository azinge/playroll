import * as React from "react";
import renderer from "react-test-renderer";

import YourLibraryScreen from "../YourLibraryScreen";

it("renders correctly", () => {
  const tree = renderer.create(<YourLibraryScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
