export function D13P2(input: string) {
    let result = 0;
    let separateInputs = input.split(/\n\n/g);
    separateInputs.forEach(unprocessedMap => {
        let separateLines = unprocessedMap.split(/\n/g);
        let map: string[][] = []
        separateLines.forEach((line) => {
            map.push(Array.from(line))
        })

        let possibleXs: number[] = []
        let possibleYs: number[] = []
        let foundIt = false
        for (let x = 0; x < map[0].length - 1; x++) {
            possibleXs.push(x)
        }
        for (let y = 0; y < map.length - 1; y++) {
            possibleYs.push(y)
        }



        for (let possibleX = 0; possibleX < possibleXs.length; possibleX++) {
            let smudges = 0
            for (let y = 0; y < map.length && !foundIt && smudges < 2; y++) {
                let distance = 0

                while (possibleXs[possibleX] - distance >= 0 && possibleXs[possibleX] + distance + 1 < map[y].length && !foundIt && smudges < 2) {
                    if (map[y][possibleXs[possibleX] - distance] !== map[y][possibleXs[possibleX] + distance + 1]) {
                        smudges++
                        if (smudges > 1) {
                            possibleXs.splice(possibleX, 1)
                            possibleX--
                        }
                    }
                    if (possibleXs.length + possibleYs.length === 1) {
                        foundIt = true
                    }
                    distance++
                }
            }
            if (smudges === 0) {
                possibleXs.splice(possibleX, 1)
                possibleX--
            }
        }
        // if (possibleXs.length === 1) {
        //     foundIt = true
        //     possibleYs = []
        // }
        for (let possibleY = 0; possibleY < possibleYs.length && !foundIt; possibleY++) {
            let smudges = 0
            for (let x = 0; x < map[0].length && !foundIt && smudges < 2; x++) {
                let distance = 0
                // console.log('x = ' + x);

                while (possibleYs[possibleY] - distance >= 0 && possibleYs[possibleY] + distance + 1 < map.length && !foundIt && smudges < 2) {
                    // console.log('y1 = ' + (possibleYs[possibleY] - distance));
                    // console.log('y2 = ' + (possibleYs[possibleY] + distance + 1));
                    if (map[possibleYs[possibleY] - distance][x] !== map[possibleYs[possibleY] + distance + 1][x]) {
                        smudges++
                        if (smudges > 1) {
                            // console.log(JSON.stringify(possibleYs[possibleY]));
                            // console.log(x);
                            // console.log(distance);
                            // console.log('smudge === 2');

                            possibleYs.splice(possibleY, 1)
                            possibleY--
                        }
                    }
                    if (possibleXs.length + possibleYs.length === 1) {
                        //console.log('ola');

                        foundIt = true
                    }
                    distance++
                }

            }
            if (smudges === 0) {
                possibleYs.splice(possibleY, 1)
                possibleY--
            }
        }

        // console.log(possibleXs);
        // console.log(possibleYs);

        if (possibleXs.length > possibleYs.length) {
            result += possibleXs[0] + 1
        }
        else {
            result += (possibleYs[0] + 1) * 100
        }

    });


    return result
}

// console.log(possibleX);
// console.log(JSON.stringify(possibleXs));
// console.log(JSON.stringify(possibleXs[possibleX]));
// console.log(y);
// console.log(map[y]);
// console.log(possibleXs[possibleX] - distance);
// console.log(possibleXs[possibleX] + distance + 1);
// console.log(JSON.stringify(map[y][possibleXs[possibleX] - distance]));
// console.log(JSON.stringify(map[y][possibleXs[possibleX] + distance + 1]));
// console.log(y);
// console.log(distance);