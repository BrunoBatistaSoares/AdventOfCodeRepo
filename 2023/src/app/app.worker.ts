/// <reference lib="webworker" />

import { D14P2 } from "./Solutions/D14P2";

function processData(data: string) {
  return D14P2(data).toString();
}

addEventListener('message', ({ data }) => {
  const response = { result: processData(data) }
  console.log(response);

  postMessage(response);
});
