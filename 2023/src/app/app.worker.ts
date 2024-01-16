/// <reference lib="webworker" />

import { D20P2 } from "./Solutions/D20P2";

function processData(data: string) {
  return D20P2(data).toString();
}

addEventListener('message', ({ data }) => {
  const response = { result: processData(data) }
  console.log(response);

  postMessage(response);
});
