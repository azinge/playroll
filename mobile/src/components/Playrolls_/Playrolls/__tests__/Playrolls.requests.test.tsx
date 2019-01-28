import { client } from "app/App";
import { GET_PLAYROLLS } from "../Playrolls.requests";

test("GET_PLAYROLLS does not error", () => {
  expect.assertions(1);
  const data = client
    .query({ query: GET_PLAYROLLS })
    .then(data => expect(data).toBeTruthy);
});
