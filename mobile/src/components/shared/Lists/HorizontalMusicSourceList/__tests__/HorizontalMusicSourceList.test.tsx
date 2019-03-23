import * as React from "react";
import renderer from "react-test-renderer";

import HorizontalMusicSourceList from "../HorizontalMusicSourceList";

it("renders correctly", () => {
  const tree = renderer.create(<HorizontalMusicSourceList />).toJSON();
  expect(tree).toMatchSnapshot();
});
