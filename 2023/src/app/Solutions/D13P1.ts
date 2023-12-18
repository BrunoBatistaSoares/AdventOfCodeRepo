export function D13P1(input: string) {
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
            if (map[0][x] === map[0][x + 1]) {
                possibleXs.push(x)
            }
        }
        for (let y = 0; y < map.length - 1; y++) {
            if (map[y][0] === map[y + 1][0]) {
                possibleYs.push(y)
            }
        }

        console.log(possibleXs);
        console.log(possibleYs);

        for (let y = 0; y < map.length && !foundIt; y++) {
            for (let possibleX = 0; possibleX < possibleXs.length && possibleXs.length > 1; possibleX++) {
                let distance = 0
                while (possibleXs[possibleX] - distance >= 0 && possibleXs[possibleX] + distance + 1 < map[y].length && !foundIt) {
                    if (map[y][possibleXs[possibleX] - distance] !== map[y][possibleXs[possibleX] + distance + 1]) {
                        console.log(possibleX);
                        console.log(JSON.stringify(possibleXs));
                        console.log(JSON.stringify(possibleXs[possibleX]));
                        console.log(y);
                        console.log(map[y]);
                        console.log(possibleXs[possibleX] - distance);
                        console.log(possibleXs[possibleX] + distance + 1);
                        console.log(JSON.stringify(map[y][possibleXs[possibleX] - distance]));
                        console.log(JSON.stringify(map[y][possibleXs[possibleX] + distance + 1]));
                        console.log(y);
                        console.log(distance);
                        possibleXs.splice(possibleX, 1)
                        possibleX--
                    }
                    if (possibleXs.length + possibleYs.length === 1) {
                        foundIt = true
                    }
                    distance++
                }
                console.log(JSON.stringify(possibleXs));
                console.log(JSON.stringify(possibleYs));
            }
        }
        for (let x = 0; x < map[0].length && !foundIt; x++) {
            for (let possibleY = 0; possibleY < possibleYs.length && !foundIt; possibleY++) {
                let distance = 0
                while (possibleYs[possibleY] - distance >= 0 && possibleYs[possibleY] + distance + 1 < map.length && !foundIt) {
                    if (map[possibleYs[possibleY] - distance][x] !== map[possibleYs[possibleY] + distance + 1][x]) {
                        // console.log(possibleY);
                        // console.log(JSON.stringify(possibleYs));
                        // console.log(JSON.stringify(possibleYs[possibleY]));
                        // console.log(x);
                        // console.log(possibleYs[possibleY] - distance);
                        // console.log(possibleYs[possibleY] + distance + 1);
                        // console.log(JSON.stringify(map[y][possibleYs[possibleY] - distance]));
                        // console.log(JSON.stringify(map[y][possibleYs[possibleY] + distance + 1]));
                        // console.log(y);
                        // console.log(distance);
                        possibleYs.splice(possibleY, 1)
                        possibleY--
                    }
                    if (possibleXs.length + possibleYs.length === 1) {
                        console.log('ola');

                        foundIt = true
                    }
                    distance++
                }
            }
        }

        console.log(possibleXs);
        console.log(possibleYs);

        if (possibleXs.length > possibleYs.length) {
            result += possibleXs[0] + 1
        }
        else {
            result += (possibleYs[0] + 1) * 100
        }

    });


    return result
}