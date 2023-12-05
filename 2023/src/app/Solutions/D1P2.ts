export function D1P2(input: string) {
    let result = 0;
    let separateLines = input.split(/\r?\n/g);
    separateLines.forEach((element: string) => {
        let calibrationValue = ''
        let firstCalibrationValue = ''
        let secondCalibrationValue = ''
        let foundIt = false
        let firstPosition = -1, lastPosition = element.length - 1
        while (!foundIt) {
            firstPosition++
            let currentDigit = String(element).charAt(firstPosition)
            console.log(currentDigit);
            if (/\d/.test(currentDigit)) {
                foundIt = true
                firstCalibrationValue = String(element).charAt(firstPosition)
                console.log(firstCalibrationValue);
            }
            else {
                switch (currentDigit) {
                    case 'o':
                        {
                            let aux = element.slice(firstPosition, (firstPosition + 3))
                            if (aux === 'one') {
                                foundIt = true
                                firstCalibrationValue = '1'
                            }
                            break
                        }
                    case 't':
                        {
                            let aux = element.slice(firstPosition, (firstPosition + 3))
                            if (aux === 'two') {
                                console.log(aux);
                                foundIt = true
                                firstCalibrationValue = '2'
                            }
                            else {
                                aux = element.slice(firstPosition, (firstPosition + 5))
                                if (aux === 'three') {
                                    foundIt = true
                                    firstCalibrationValue = '3'
                                }
                            }
                            break
                        }
                    case 'f':
                        {
                            let aux = element.slice(firstPosition, (firstPosition + 4))
                            if (aux === 'four') {
                                foundIt = true
                                firstCalibrationValue = '4'
                            }
                            else {
                                if (aux === 'five') {
                                    foundIt = true
                                    firstCalibrationValue = '5'
                                }
                            }
                            break
                        }
                    case 's':
                        {
                            let aux = element.slice(firstPosition, (firstPosition + 3))

                            if (aux === 'six') {
                                foundIt = true
                                firstCalibrationValue = '6'
                            }
                            else {
                                aux = element.slice(firstPosition, (firstPosition + 5))
                                if (aux === 'seven') {
                                    foundIt = true
                                    firstCalibrationValue = '7'
                                }
                            }
                            break
                        }
                    case 'e':
                        {
                            let aux = element.slice(firstPosition, (firstPosition + 5))
                            if (aux === 'eight') {
                                foundIt = true
                                firstCalibrationValue = '8'
                            }
                            break
                        }
                    case 'n':
                        {
                            let aux = element.slice(firstPosition, (firstPosition + 4))
                            if (aux === 'nine') {
                                foundIt = true
                                firstCalibrationValue = '9'
                            }
                            break
                        }
                }
            }
            console.log(firstPosition);
        }
        console.log(firstCalibrationValue);
        foundIt = false
        while (!foundIt) {
            console.log(firstPosition);
            console.log(lastPosition);
            if (firstPosition === lastPosition) {
                foundIt = true
                secondCalibrationValue = ''
            }
            let currentDigit = String(element).charAt(lastPosition)
            console.log(currentDigit);
            if (/\d/.test(currentDigit)) {
                foundIt = true
                secondCalibrationValue = String(element).charAt(lastPosition)
            }
            else {
                console.log(currentDigit);
                switch (currentDigit) {
                    case 'o':
                        {
                            let aux = element.slice(lastPosition, (lastPosition + 3))
                            if (aux === 'one') {
                                foundIt = true
                                secondCalibrationValue = '1'
                            }
                            break
                        }
                    case 't':
                        {
                            let aux = element.slice(lastPosition, (lastPosition + 3))
                            if (aux === 'two') {
                                foundIt = true
                                secondCalibrationValue = '2'
                            }
                            else {
                                aux = element.slice(lastPosition, (lastPosition + 5))
                                if (aux === 'three') {
                                    foundIt = true
                                    secondCalibrationValue = '3'
                                }
                            }
                            break
                        }
                    case 'f':
                        {
                            let aux = element.slice(lastPosition, (lastPosition + 4))
                            if (aux === 'four') {
                                foundIt = true
                                secondCalibrationValue = '4'
                            }
                            else {
                                if (aux === 'five') {
                                    foundIt = true
                                    secondCalibrationValue = '5'
                                }
                            }
                            break
                        }
                    case 's':
                        {
                            let aux = element.slice(lastPosition, (lastPosition + 3))
                            if (aux === 'six') {
                                foundIt = true
                                secondCalibrationValue = '6'
                            }
                            else {
                                aux = element.slice(lastPosition, (lastPosition + 5))
                                if (aux === 'seven') {
                                    foundIt = true
                                    secondCalibrationValue = '7'
                                }
                            }
                            break
                        }
                    case 'e':
                        {
                            let aux = element.slice(lastPosition, (lastPosition + 5))
                            if (aux === 'eight') {
                                foundIt = true
                                secondCalibrationValue = '8'
                            }
                            break
                        }
                    case 'n':
                        {
                            let aux = element.slice(lastPosition, (lastPosition + 4))
                            if (aux === 'nine') {
                                foundIt = true
                                secondCalibrationValue = '9'
                            }
                            break
                        }
                }
            }
            lastPosition--
        }
        console.log(secondCalibrationValue);
        calibrationValue = firstCalibrationValue + secondCalibrationValue
        result = result + parseInt(calibrationValue)
    })
    return result
}