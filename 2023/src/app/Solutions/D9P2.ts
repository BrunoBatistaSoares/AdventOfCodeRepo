export function D9P2(input: string) {
    let result = 0;
    let separateLines = input.split(/\r?\n/g);
    separateLines.forEach((OASISLine) => {
        let historyLines: number[][] = [];
        historyLines.push(OASISLine.split(' ').map(Number))
        console.log(JSON.stringify(historyLines))
        historyLines = processOASIS(historyLines);
        console.log(JSON.stringify(historyLines))
        let lineResult = 0
        for (let index = historyLines.length - 2; index >= 0; index--) {
            lineResult = historyLines[index][0] - lineResult
        }
        result += lineResult

    })

    return result
}

function processOASIS(input: number[][]): number[][] {
    let newLine: number[] = []

    let isItProcessed = true
    input[input.length - 1].forEach((historyPoint, index) => {
        if (historyPoint !== 0) {
            isItProcessed = false
            if (index < input[input.length - 1].length - 1) {
                newLine.push(input[input.length - 1][index + 1] - historyPoint)
            }
        }
        else {
            if (index < input[input.length - 1].length - 1) {
                newLine.push(input[input.length - 1][index + 1] - historyPoint)
            }
        }
    })
    if (isItProcessed) {
        return input
    }
    else {
        input.push(newLine);
        console.log(JSON.stringify(input))

        return processOASIS(input)
    }
}