import * as React from "react";
import renderer from "react-test-renderer";
import { MockedProvider } from "react-apollo/test-utils";

import PlayrollCard from "../PlayrollCard";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <MockedProvider>
        <PlayrollCard />
      </MockedProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
