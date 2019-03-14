import * as React from "react";
import renderer from "react-test-renderer";
import { MockedProvider } from "react-apollo/test-utils";

import SignUpScreen from "../SignUpScreen";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <MockedProvider>
        <SignUpScreen />
      </MockedProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
