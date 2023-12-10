export function D3P2(input: string) {
    let result = 0;
    let separateLines = input.split(/\r?\n/g);
    let currentLine = 0
    separateLines.forEach((line) => {
        let currentDigit = 0
        while (currentDigit < line.length) {
            let numbersTouching: number[] = []
            if (/\*/.test(line[currentDigit])) {
                if (currentLine > 0) {
                    let touchs: number[] = []
                    for (let index = -1; index < 2; index++) {
                        if (/\d/.test(separateLines[currentLine - 1][currentDigit + index])) {
                            touchs.push(currentDigit + index)
                        }
                    }
                    if (touchs.length === 3) {
                        numbersTouching.push(findNumber(currentDigit, separateLines[currentLine - 1]))
                    }
                    if (touchs.length === 2) {
                        if (!/\d/.test(separateLines[currentLine - 1][currentDigit])) {
                            numbersTouching.push(findNumber(currentDigit - 1, separateLines[currentLine - 1]))
                            numbersTouching.push(findNumber(currentDigit + 1, separateLines[currentLine - 1]))
                        }
                        else {
                            numbersTouching.push(findNumber(currentDigit, separateLines[currentLine - 1]))
                        }
                    }
                    if (touchs.length === 1) {
                        numbersTouching.push(findNumber(touchs[0], separateLines[currentLine - 1]))
                    }
                }
                if (/\d/.test(line[currentDigit - 1])) {
                    numbersTouching.push(findNumber(currentDigit - 1, separateLines[currentLine]))
                }
                if (/\d/.test(line[currentDigit + 1])) {
                    numbersTouching.push(findNumber(currentDigit + 1, separateLines[currentLine]))
                }
                if (currentLine < separateLines.length - 1) {
                    let touchs: number[] = []
                    for (let index = -1; index < 2; index++) {
                        if (/\d/.test(separateLines[currentLine + 1][currentDigit + index])) {
                            touchs.push(currentDigit + index)
                        }
                    }
                    if (touchs.length === 3) {
                        numbersTouching.push(findNumber(currentDigit, separateLines[currentLine + 1]))
                    }
                    if (touchs.length === 2) {
                        if (!/\d/.test(separateLines[currentLine + 1][currentDigit])) {
                            numbersTouching.push(findNumber(currentDigit - 1, separateLines[currentLine + 1]))
                            numbersTouching.push(findNumber(currentDigit + 1, separateLines[currentLine + 1]))
                        }
                        else {
                            numbersTouching.push(findNumber(currentDigit, separateLines[currentLine + 1]))
                        }
                    }
                    if (touchs.length === 1) {
                        numbersTouching.push(findNumber(touchs[0], separateLines[currentLine + 1]))
                    }
                }
            }
            if (numbersTouching.length === 2) {
                result += numbersTouching[0] * numbersTouching[1]
            }
            currentDigit++
        }
        currentLine++
    })


    return result
}

function findNumber(digitFound: number, line: string): number {
    let firstDigit = digitFound, lastDigit = digitFound
    while (firstDigit - 1 >= 0 && /\d/.test(line[firstDigit - 1])) {
        firstDigit--
    }
    while (lastDigit + 1 <= line.length - 1 && /\d/.test(line[lastDigit + 1])) {
        lastDigit++
    }
    return parseInt(line.slice(firstDigit, lastDigit + 1))
}