import * as React from "react";
import renderer from "react-test-renderer";
import { MockedProvider } from "react-apollo/test-utils";

import ManagePlayrollScreen from "../ManagePlayrollScreen";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <MockedProvider>
        <ManagePlayrollScreen />
      </MockedProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
