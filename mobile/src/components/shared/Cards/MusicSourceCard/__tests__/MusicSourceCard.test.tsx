import * as React from "react";
import renderer from "react-test-renderer";

import MusicSourceCard from "../MusicSourceCard";

it("renders correctly", () => {
  const tree = renderer.create(<MusicSourceCard />).toJSON();
  expect(tree).toMatchSnapshot();
});
