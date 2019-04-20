import * as React from "react";
import renderer from "react-test-renderer";

import ManageRelationshipButton from "../ManageRelationshipButton";

it("renders correctly", () => {
  const tree = renderer.create(<ManageRelationshipButton />).toJSON();
  expect(tree).toMatchSnapshot();
});
