export function D5P1(input: string) {
    let separateLines = input.split(/\r?\n\r?\n/g);
    let seeds = separateLines.shift()!.split(' ')
    seeds?.shift();
    let numberSeeds: number[] = []
    seeds.forEach((stringSeed) => {
        numberSeeds.push(parseInt(stringSeed))
    })
    let maps: string[] = []
    let processedMaps: string[][] = [];
    separateLines.forEach((unprocessedMap) => maps.push(unprocessedMap.split(':\n')[1]))
    maps.forEach((unprocessedMapLines) => {
        processedMaps.push(unprocessedMapLines.split('\n'))
    })
    let numberMaps: number[][][] = []

    processedMaps.forEach((map, currentMap) => {
        let tempMap: number[][] = []
        map.forEach((value, currentLine) => {
            let tempLine: number[] = []
            value.split(' ').forEach((number) => {
                tempLine.push(parseInt(number))
            })
            tempMap.push(tempLine)
        })
        numberMaps.push(tempMap)
    })
    numberMaps.forEach((map) => {
        map.sort((a, b) => a[1] - b[1])
    })

    console.log(numberMaps);


    for (let seedIndex = 0; seedIndex < numberSeeds.length; seedIndex++) {
        for (let mapIndex = 0; mapIndex < numberMaps.length; mapIndex++) {
            let currentLine = 0
            let found = false;
            while (currentLine < numberMaps[mapIndex].length && !found) {
                if (numberSeeds[seedIndex] < numberMaps[mapIndex][currentLine][1]) {
                    found = true
                }
                else if (numberSeeds[seedIndex] <= numberMaps[mapIndex][currentLine][1] + numberMaps[mapIndex][currentLine][2] - 1) {
                    console.log(numberSeeds[seedIndex] + '->' + numberMaps[mapIndex][currentLine][1] + "+" + numberMaps[mapIndex][currentLine][2] + ' => ' + numberSeeds[seedIndex] + '+' + numberMaps[mapIndex][currentLine][0] + '-' + numberMaps[mapIndex][currentLine][1]);

                    numberSeeds[seedIndex] += numberMaps[mapIndex][currentLine][0] - numberMaps[mapIndex][currentLine][1]
                    found = true
                }
                else {
                    currentLine++
                }
            }
            console.log(numberSeeds[seedIndex]);
        }
        console.log(numberSeeds[seedIndex]);
    }
    console.log(numberSeeds);
    numberSeeds.sort((a, b) => a - b)
    console.log(numberSeeds);

    return numberSeeds[0]
}

// numberMaps.forEach((map) => {
//     let tempLine: number[] = []
//     map.forEach((line) => {
//         for (let index = 0; index < line[2]; index++) {
//             tempLine[line[1] + index] = line[0] + index
//         }
//     })
//     for (let index = 0; index < tempLine.length; index++) {
//         if (tempLine[index] === undefined) {
//             tempLine[index] = index;
//         }
//     }
//     perfectMaps.push(tempLine)
// })

// console.log(perfectMaps);

// for (let seedIndex = 0; seedIndex < numberSeeds.length; seedIndex++) {
//     for (let mapIndex = 0; mapIndex < perfectMaps.length; mapIndex++) {

//         if (perfectMaps[mapIndex][numberSeeds[seedIndex]] === undefined) {
//             perfectMaps[mapIndex][numberSeeds[seedIndex]] = seedIndex
//         }
//         console.log(perfectMaps[mapIndex]);
//         console.log(numberSeeds[seedIndex]);
//         console.log(perfectMaps[mapIndex][numberSeeds[seedIndex]]);
//         numberSeeds[seedIndex] = perfectMaps[mapIndex][numberSeeds[seedIndex]]
//     }
// }