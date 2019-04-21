import * as React from "react";
import renderer from "react-test-renderer";

import ManageRelationshipRow from "../ManageRelationshipRow";

it("renders correctly", () => {
  const tree = renderer.create(<ManageRelationshipRow />).toJSON();
  expect(tree).toMatchSnapshot();
});
