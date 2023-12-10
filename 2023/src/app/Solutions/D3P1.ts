export function D3P1(input: string) {
    let result = 0;
    let separateLines = input.split(/\r?\n/g);
    let currentLine = 0, firstDigit: number | null = null, lastDigit: number | null = null
    separateLines.forEach((line) => {
        let currentDigit = 0
        while (currentDigit <= line.length) {
            if (/\d/.test(line[currentDigit])) {
                if (firstDigit === null) {
                    firstDigit = currentDigit;
                    lastDigit = currentDigit;
                }
                else {
                    lastDigit = currentDigit
                    console.log(currentDigit);

                }
            }
            else if (firstDigit !== null && lastDigit !== null) {
                let doesItCount = false
                if (separateLines[currentLine - 1] !== undefined) {
                    let upperFirstDigit;
                    if (firstDigit > 0) {
                        upperFirstDigit = firstDigit - 1
                    }
                    else {
                        upperFirstDigit = 0
                    }
                    let upperLastDigit;
                    if (lastDigit < separateLines[currentLine - 1].length - 1) {
                        upperLastDigit = lastDigit + 1
                    }
                    else {
                        upperLastDigit = lastDigit
                    }

                    if (/[^\d\.]/g.test(separateLines[currentLine - 1].slice((upperFirstDigit), (upperLastDigit + 1)))) {
                        doesItCount = true
                    }
                }
                if (!doesItCount) {
                    if (firstDigit > 0 && /[^\d\.]/.test(separateLines[currentLine][firstDigit - 1])) {
                        doesItCount = true
                    }
                }
                if (!doesItCount) {
                    if (lastDigit < separateLines[currentLine].length - 1 && /[^\d\.]/.test(separateLines[currentLine][lastDigit + 1])) {
                        doesItCount = true
                    }
                }
                if (!doesItCount && separateLines[currentLine + 1] !== undefined) {
                    let lowerFirstDigit;
                    if (firstDigit > 0) {
                        lowerFirstDigit = firstDigit - 1
                    }
                    else {
                        lowerFirstDigit = 0
                    }
                    let lowerLastDigit;
                    if (lastDigit < separateLines[currentLine].length - 1) {
                        lowerLastDigit = lastDigit + 1
                    }
                    else {
                        lowerLastDigit = lastDigit
                    }

                    if (/[^\d\.]/g.test(separateLines[currentLine + 1].slice((lowerFirstDigit), (lowerLastDigit + 1)))) {
                        doesItCount = true
                    }
                }

                if (doesItCount) {
                    result += parseInt(separateLines[currentLine].slice(firstDigit, (lastDigit + 1)))
                }

                firstDigit = null
                lastDigit = null
                doesItCount = false
            }
            currentDigit++
        }
        currentLine++
    })

    return result
}