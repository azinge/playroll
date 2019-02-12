import * as React from "react";
import renderer from "react-test-renderer";
import { MockedProvider } from "react-apollo/test-utils";

import TracklistScreen from "../TracklistScreen";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <MockedProvider>
        <TracklistScreen />
      </MockedProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
