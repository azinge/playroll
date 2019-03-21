import * as React from "react";
import renderer from "react-test-renderer";

import DiscoveryQueueEntryCard from "../DiscoveryQueueEntryCard";

it("renders correctly", () => {
  const tree = renderer.create(<DiscoveryQueueEntryCard />).toJSON();
  expect(tree).toMatchSnapshot();
});
