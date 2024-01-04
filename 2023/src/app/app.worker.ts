/// <reference lib="webworker" />

import { D18P2 } from "./Solutions/D18P2";

function processData(data: string) {
  return D18P2(data).toString();
}

addEventListener('message', ({ data }) => {
  const response = { result: processData(data) }
  console.log(response);

  postMessage(response);
});
