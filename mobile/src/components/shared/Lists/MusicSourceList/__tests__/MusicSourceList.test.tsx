import * as React from "react";
import renderer from "react-test-renderer";

import MusicSourceList from "../MusicSourceList";

it("renders correctly", () => {
  const tree = renderer.create(<MusicSourceList />).toJSON();
  expect(tree).toMatchSnapshot();
});
