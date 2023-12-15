var GLOBALCOUNTER = 0
var GLOBALCOUNTERED = 0
var map = new Map

export function D12P1(input: string) {
    let result = 0;
    let separateLines = input.split(/\r?\n/g);

    separateLines.forEach((line) => {
        // console.log(line);

        let tempMap = line.split(' ')[0]
        tempMap = tempMap.concat('?', tempMap, '?', tempMap, '?', tempMap, '?', tempMap)
        let map = Array.from(tempMap)
        let tempCoils = line.split(' ')[1]
        tempCoils = tempCoils.concat(',', tempCoils, ',', tempCoils, ',', tempCoils, ',', tempCoils)
        let coils = tempCoils.split(',')
        preCookMap(map, coils)
        // console.log(map);
        // console.log(coils);
        // console.log(JSON.stringify(map));
        // console.log(JSON.stringify(coils));
        let aux = possibilities(map, coils, 0);
        console.log(aux);

        result += aux
    })
    return result
}

function possibilities(map: string[], coils: string[], index: number): number {
    GLOBALCOUNTER++
    console.log(GLOBALCOUNTER);
    if (GLOBALCOUNTER % 1000 === 0) {
        console
    }
    if (index === map.length) {
        return isItPossible(structuredClone(map), coils)
    }
    else {
        if (map[index] === '?') {
            let possibleBranches = 0
            map[index] = '.';
            if (preCheck(map, coils, index)) {
                // console.log(JSON.stringify(map));
                // console.log(index);

                possibleBranches += possibilities(structuredClone(map), coils, index + 1)
            }

            map[index] = '#';
            if (preCheck(map, coils, index)) {
                // console.log(JSON.stringify(map));
                // console.log(index);
                possibleBranches += possibilities(structuredClone(map), coils, index + 1)
            }
            return possibleBranches
        }
        else {
            index++
            while (map[index] !== '?' && index < map.length) {
                index++
            }
            if (index === map.length) {
                return isItPossible(structuredClone(map), coils)
            }
            else if (preCheck(map, coils, index)) {
                // console.log(index);
                return possibilities(structuredClone(map), coils, index)
            }
            else {
                //console.log('nao bateu ');
                return 0
            }

        }
    }
}

function isItPossible(map: string[], coils: string[]): number {
    let coilSnatcher = 0
    let snatcherWorks = 1
    let currentCoilGroup = 0
    let mapIndex = 0
    while (snatcherWorks === 1 && mapIndex < map.length) {
        if (map[mapIndex] === '#') {
            if (coilSnatcher === parseInt(coils[currentCoilGroup])) {
                snatcherWorks = 0
            }
            else if (currentCoilGroup === coils.length) {
                snatcherWorks = 0
            }
            else {
                coilSnatcher++
            }
        }
        if (map[mapIndex] === '.') {
            if (coilSnatcher === parseInt(coils[currentCoilGroup])) {
                coilSnatcher = 0
                currentCoilGroup++
            }
            else if (coilSnatcher > 0) {
                snatcherWorks = 0
            }
        }
        mapIndex++
    }
    if (coilSnatcher === parseInt(coils[currentCoilGroup])) {
        coilSnatcher = 0
        currentCoilGroup++
    }
    if (currentCoilGroup !== coils.length) {
        snatcherWorks = 0
    }
    return snatcherWorks
}

function preCheck(map: string[], coils: string[], permutedSpace: number): boolean {
    let isPossible = true
    if (permutedSpace < map.length - 1) {
        let unkowns = 0
        let brokenCoils = 0
        let revealedBrokenCoils = 0
        let revealedBrokenCoilsOnPermutedSpace = 0
        map.forEach((currentCoil, index) => {
            if (currentCoil === '?') { unkowns++ }
            else if (currentCoil === '#') {
                revealedBrokenCoils++
                if (index <= permutedSpace) {
                    revealedBrokenCoilsOnPermutedSpace++
                }
            }
        })
        coils.forEach((coilGroup) => {
            brokenCoils += parseInt(coilGroup)
        })

        if ((revealedBrokenCoilsOnPermutedSpace === 0) && (map.length - permutedSpace - 1 < brokenCoils + coils.length - 1)) {
            isPossible = false
        }

        else {
            if (revealedBrokenCoils <= brokenCoils) {
                let index = 0
                let counter = 0
                let currentCoilGroup = 0
                while (currentCoilGroup < coils.length && isPossible && index <= permutedSpace) {
                    while (isPossible && map[index] === '.' && index <= permutedSpace) {
                        index++
                    }
                    while (isPossible && map[index] === '#' && index <= permutedSpace) {
                        counter++
                        index++
                        if (counter > parseInt(coils[currentCoilGroup])) {
                            // console.log(JSON.stringify(map));
                            // console.log(JSON.stringify(coils));
                            // console.log(permutedSpace);
                            isPossible = false
                        }
                    }
                    if (isPossible && map[index] === '.' && index <= permutedSpace) {
                        if (counter < parseInt(coils[currentCoilGroup])) {
                            // console.log(JSON.stringify(map));
                            // console.log(JSON.stringify(coils));
                            // console.log(permutedSpace);
                            isPossible = false
                        }
                    }



                    if (isPossible && counter > 0 && index < map.length && (map[index] === '#' || map[index] === '?') && counter < parseInt(coils[currentCoilGroup]) && index > permutedSpace) {
                        while (isPossible && index < map.length && (map[index] === '#' || map[index] === '?')) {
                            counter++
                            index++
                        }

                        if (counter < parseInt(coils[currentCoilGroup])) {
                            // console.log(JSON.stringify(map));
                            // console.log(JSON.stringify(coils));
                            // console.log(permutedSpace);
                            // console.log(index);

                            // console.log(currentCoilGroup);
                            // console.log(counter);


                            isPossible = false
                        }
                    }
                    counter = 0

                    currentCoilGroup++

                    if (isPossible) {

                    }
                    if (currentCoilGroup < coils.length && isPossible && index === permutedSpace && map[index] === '.') {
                        let unprocessedMinSpace = 0
                        for (let index = currentCoilGroup; index < coils.length; index++) {
                            unprocessedMinSpace += parseInt(coils[index])
                        }
                        let tempIndex = permutedSpace + 1
                        let futureSpaceAvailable = 0
                        while (tempIndex < map.length) {
                            if (map[tempIndex] !== '.') {
                                futureSpaceAvailable++
                            }
                            tempIndex++
                        }
                        if (isPossible && unprocessedMinSpace > futureSpaceAvailable) {
                            isPossible = false
                            // console.log(JSON.stringify(map));
                            // console.log(JSON.stringify(coils));
                            // console.log(permutedSpace);
                            // console.log(index);
                            // console.log(currentCoilGroup);
                        }
                        unprocessedMinSpace += coils.length - currentCoilGroup - 1
                        if (isPossible && unprocessedMinSpace > map.length - permutedSpace - 1) {
                            isPossible = false
                            // console.log(JSON.stringify(map));
                            // console.log(JSON.stringify(coils));
                            // console.log(permutedSpace);
                            // console.log(index);
                            // console.log(currentCoilGroup);
                        }


                        // console.log(index);
                        let foundAFittingRange = false
                        while (!foundAFittingRange && isPossible && index < map.length) {
                            while (isPossible && index < map.length && map[index] === '.') {
                                index++
                            }
                            while (isPossible && index < map.length && map[index]! !== '.' && counter < parseInt(coils[currentCoilGroup])) {
                                index++
                                counter++
                            }
                            if (counter >= parseInt(coils[currentCoilGroup])) {
                                // console.log(JSON.stringify(map));
                                // console.log(JSON.stringify(coils));
                                // console.log(permutedSpace);
                                // console.log(index);
                                // console.log(currentCoilGroup);
                                // GLOBALCOUNTERED++
                                // console.log(GLOBALCOUNTERED);

                                foundAFittingRange = true
                            }
                            counter = 0
                        }
                        if (!foundAFittingRange) {
                            // console.log(JSON.stringify(map));
                            // console.log(JSON.stringify(coils));
                            // console.log(permutedSpace);
                            // console.log(index);
                            // console.log(currentCoilGroup);
                            isPossible = false
                        }

                    }


                }


            }
            else {
                // console.log(JSON.stringify(map));
                // console.log(JSON.stringify(coils));
                // console.log(permutedSpace);
                isPossible = false
            }
        }
    }


    // if (!isPossible) {


    // }




    return isPossible
}

function preCookMap(map: string[], coils: string[]) {
    let index = 0
    let currentCoilGroup = 0
    while (map[index] !== '?') {
        if (map[index] === '.') {
            map.shift()
        }
        else if (map[index] === '#') {
            map.splice(0, parseInt(coils[currentCoilGroup]) + 1)
            coils.shift()
        }
        // console.log(JSON.stringify(map));
        // console.log(JSON.stringify(coils));
    }
    index = map.length - 1
    currentCoilGroup = coils.length - 1
    //?###.....##... 3,2
    while (map[index] !== '?' && map[index] !== undefined) {
        if (map[index] === '.') {
            map.pop()
            index--
        }
        else if (map[index] === '#') {
            map.splice(map.length - parseInt(coils[currentCoilGroup]) - 1, parseInt(coils[currentCoilGroup]) + 1)
            index -= parseInt(coils[currentCoilGroup]) + 1
            coils.pop()
            currentCoilGroup--
            // console.log(JSON.stringify(map));
            // console.log(JSON.stringify(coils));
        }

    }
}

// if (revealedBrokenCoils <= brokenCoils) {
//     console.log('entrou');
//     console.log(revealedBrokenCoilsOnPermutedSpace);
//     let tempBrokenCoils = 0
//     let index = 0
//     tempBrokenCoils += parseInt(coils[index])
//     console.log(tempBrokenCoils);
//     while (isPossible && index < coils.length) {
//         if (revealedBrokenCoilsOnPermutedSpace === tempBrokenCoils) {
//             if (!isItPossible(structuredClone(map).slice(0, permutedSpace + 1), structuredClone(coils).slice(0, index + 1))) {
//                 isPossible = false
//                 console.log(JSON.stringify(structuredClone(map).slice(0, permutedSpace + 1)));
//                 console.log(JSON.stringify(structuredClone(coils).slice(0, index + 1)));
//             }
//         }
//         index++
//         tempBrokenCoils += parseInt(coils[index])
//     }
// }
// else {
//     isPossible = false
// }

// coils.forEach((group) => {

//     while (isPossible && map[index] === '.' && index <= permutedSpace) {
//         index++
//     }
//     while (isPossible && map[index] === '#' && index <= permutedSpace) {
//         counter++
//         index++
//         if (counter > parseInt(group)) {
//             // console.log(JSON.stringify(map));
//             // console.log(JSON.stringify(coils));
//             // console.log(permutedSpace);
//             isPossible = false
//         }
//     }
//     if (isPossible && map[index] === '.' && index <= permutedSpace) {
//         if (counter < parseInt(group)) {
//             // console.log(JSON.stringify(map));
//             // console.log(JSON.stringify(coils));
//             // console.log(permutedSpace);
//             isPossible = false
//         }
//     }
//     counter = 0
// })