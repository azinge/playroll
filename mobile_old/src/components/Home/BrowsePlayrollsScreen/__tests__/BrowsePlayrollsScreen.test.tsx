import * as React from "react";
import renderer from "react-test-renderer";
import { MockedProvider } from "react-apollo/test-utils";

import BrowsePlayrollsScreen from "../BrowsePlayrollsScreen";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <MockedProvider>
        <BrowsePlayrollsScreen />
      </MockedProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
