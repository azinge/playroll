import * as React from "react";
import renderer from "react-test-renderer";

import ConnectAppleMusicScreen from "../ConnectAppleMusicScreen";

it("renders correctly", () => {
  const tree = renderer.create(<ConnectAppleMusicScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
