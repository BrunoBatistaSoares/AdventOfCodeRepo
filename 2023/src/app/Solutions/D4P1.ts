export function D4P1(input: string) {
    let result = 0;
    let separateLines = input.split(/\r?\n/g);
    separateLines.forEach((line) => {
        let matchs = 0
        let allNumbers = line.trim().split(/\s+/)
        allNumbers.splice(0, 2)
        let cardNumbers = allNumbers.splice(0, 10)
        let winningNumbers = allNumbers
        winningNumbers.splice(0, 1)
        cardNumbers.forEach((cardNumber) => {
            winningNumbers.forEach((winningNumber) => {
                cardNumber === winningNumber && matchs++
            })
        })
        console.log(matchs + '  ' + result);
        if (matchs > 0) {
            result += Math.pow(2, (matchs - 1))
        }

    })

    return result
}