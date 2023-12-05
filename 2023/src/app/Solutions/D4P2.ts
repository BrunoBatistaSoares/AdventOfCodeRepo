export function D4P2(input: string) {
    let result = 0;
    let separateLines = input.split(/\r?\n/g);
    let lineNumberOfCopies = Array(separateLines.length).fill(1)
    let currentLine = 0;
    separateLines.forEach((line) => {

        let matchs = 0
        let allNumbers = line.trim().split(/\s+/)
        allNumbers.splice(0, 2)
        let cardNumbers = allNumbers.splice(0, 10)
        let winningNumbers = allNumbers
        winningNumbers.splice(0, 1)
        cardNumbers.forEach((cardNumber) => {
            winningNumbers.forEach((winningNumber) => {
                if (cardNumber === winningNumber) {
                    matchs++
                }
            })
        })

        console.log('line ' + currentLine + 'has ' + matchs + 'matchs');
        if (matchs > 0) {
            let aux = matchs
            while (aux > 0) {
                lineNumberOfCopies[currentLine + aux] += lineNumberOfCopies[currentLine]
                aux--
            }
        }
        result += lineNumberOfCopies[currentLine]
        currentLine++
    })

    return result
}