/// <reference lib="webworker" />

import { D13P2 } from "./Solutions/D13P2";

function processData(data: string) {
  return D13P2(data).toString();
}

addEventListener('message', ({ data }) => {
  const response = { result: processData(data) }
  console.log(response);

  postMessage(response);
});
