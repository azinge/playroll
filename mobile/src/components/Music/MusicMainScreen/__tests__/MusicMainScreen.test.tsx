import * as React from "react";
import renderer from "react-test-renderer";

import MusicMainScreen from "../MusicMainScreen";

it("renders correctly", () => {
  const tree = renderer.create(<MusicMainScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
