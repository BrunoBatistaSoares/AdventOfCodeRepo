/// <reference lib="webworker" />

import { D12P1 } from "./Solutions/D12P1";

function processData(data: string) {
  return D12P1(data).toString();
}

addEventListener('message', ({ data }) => {
  const response = { result: processData(data) }
  console.log(response);

  postMessage(response);
});
