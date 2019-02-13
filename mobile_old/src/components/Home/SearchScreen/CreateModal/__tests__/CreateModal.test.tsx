import React from "react";
import renderer from "react-test-renderer";
import { MockedProvider } from "react-apollo/test-utils";

import CreateModal from "../CreateModal";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <MockedProvider>
        <CreateModal />
      </MockedProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
