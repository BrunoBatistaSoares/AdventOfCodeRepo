/// <reference lib="webworker" />

import { D18P1 } from "./Solutions/D18P1";

function processData(data: string) {
  return D18P1(data).toString();
}

addEventListener('message', ({ data }) => {
  const response = { result: processData(data) }
  console.log(response);

  postMessage(response);
});
