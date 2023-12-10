export function D7P1(input: string) {
    let result = 0;
    let separateLines = input.split(/\r?\n/g);
    let handsBetsValues: { hand: string, bet: number, value: number }[] = []
    separateLines.forEach((line) => {
        handsBetsValues.push({ hand: line.split(' ')[0], bet: parseInt(line.split(' ')[1]), value: 0 })
    })

    console.log(handsBetsValues);
    handsBetsValues.forEach((handBetValue, index) => {
        let cardSnatcher: number[] = Array(13).fill(0);
        for (let index = 0; index < 5; index++) {
            if (handBetValue.hand[index] === 'A') {
                cardSnatcher[12]++
            }
            else if (handBetValue.hand[index] === 'K') {
                cardSnatcher[11]++
            }
            else if (handBetValue.hand[index] === 'Q') {
                cardSnatcher[10]++
            }
            else if (handBetValue.hand[index] === 'J') {
                cardSnatcher[9]++
            }
            else if (handBetValue.hand[index] === 'T') {
                cardSnatcher[8]++
            }
            else {
                cardSnatcher[parseInt(handBetValue.hand[index]) - 2]++
            }
        }
        cardSnatcher.sort((a, b) => b - a)


        if (cardSnatcher[0] === 5) {
            handsBetsValues[index].value = 7
        }
        else if (cardSnatcher[0] === 4) {
            handsBetsValues[index].value = 6
        }
        else if (cardSnatcher[0] === 3) {
            if (cardSnatcher[1] === 2) {
                handsBetsValues[index].value = 5
            }
            else {
                handsBetsValues[index].value = 4
            }
        }
        else if (cardSnatcher[0] === 2) {
            if (cardSnatcher[1] === 2) {
                handsBetsValues[index].value = 3
            }
            else {
                handsBetsValues[index].value = 2
            }
        }
        else {
            handsBetsValues[index].value = 1
        }
    })
    for (let index = 4; index >= 0; index--) {
        handsBetsValues.sort((a, b) => {
            let x = getCardValue(a.hand[index])
            let y = getCardValue(b.hand[index])
            return y - x
        })
    }

    handsBetsValues.sort((a, b) => {
        return b.value - a.value
    })

    handsBetsValues.forEach((a, index) => {
        result += a.bet * (handsBetsValues.length - index)
        console.log(a.value);
        console.log((handsBetsValues.length - index));


    })

    console.log(handsBetsValues);

    return result
}

function getCardValue(card: string) {
    switch (card) {
        case 'A': return 13;
        case 'K': return 12;
        case 'Q': return 11;
        case 'J': return 10;
        case 'T': return 9;
        case '9': return 8;
        case '8': return 7;
        case '7': return 6;
        case '6': return 5;
        case '5': return 4;
        case '4': return 3;
        case '3': return 2;
        case '2': return 1;
    }
    return 0
}