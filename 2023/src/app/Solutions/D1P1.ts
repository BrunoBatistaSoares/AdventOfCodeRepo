export function D1P1(input: string) {
    let result = 0;
    let separateLines = input.split(/\r?\n/g);
    separateLines.forEach(element => {
        let calibrationValue
        let firstPosition = 0, lastPosition = element.length - 1
        while (firstPosition < element.length && !/\d/.test(String(element).charAt(firstPosition))) {
            firstPosition++
        }
        while (lastPosition >= firstPosition && !/\d/.test(String(element).charAt(lastPosition))) {
            lastPosition--
        }
        if (firstPosition === lastPosition) {
            calibrationValue = String(element).charAt(firstPosition) + String(element).charAt(firstPosition)
        }
        else {
            calibrationValue = String(element).charAt(firstPosition) + String(element).charAt(lastPosition)
        }
        result = result + parseInt(calibrationValue)
    });
    return result
}