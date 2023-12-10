export function D5P2(input: string) {
    let separateLines = input.split(/\r?\n\r?\n/g);
    let seeds = separateLines.shift()!.split(' ')
    seeds?.shift();
    let numberSeeds: number[] = []
    seeds.forEach((stringSeed) => {
        numberSeeds.push(parseInt(stringSeed))
    })
    let seedIntervals: number[][] = []

    numberSeeds.forEach((seed, seedIndex) => {
        if (seedIndex % 2 === 0) {
            seedIntervals.push([seed, seed + numberSeeds[seedIndex + 1] - 1])
        }
    })


    let maps: string[] = []
    let processedMaps: string[][] = [];
    separateLines.forEach((unprocessedMap) => maps.push(unprocessedMap.split(':\n')[1]))
    maps.forEach((unprocessedMapLines) => {
        processedMaps.push(unprocessedMapLines.split('\n'))
    })
    let numberMaps: number[][][] = []

    processedMaps.forEach((map) => {
        let tempMap: number[][] = []
        map.forEach((value) => {
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

    for (let mapIndex = 0; mapIndex < numberMaps.length; mapIndex++) {
        let tempSeeds: number[][] = []

        for (let seedIndex = 0; seedIndex < seedIntervals.length; seedIndex++) {
            let currentLine = 0
            let isDistributed = false;
            while (currentLine < numberMaps[mapIndex].length && !isDistributed) {
                let mappingStart = numberMaps[mapIndex][currentLine][1]
                let mappingEnd = mappingStart + numberMaps[mapIndex][currentLine][2] - 1
                let delta = numberMaps[mapIndex][currentLine][0] - numberMaps[mapIndex][currentLine][1]
                if (seedIntervals[seedIndex][0] <= mappingEnd) {
                    if (seedIntervals[seedIndex][1] < mappingStart) {
                        tempSeeds.push([seedIntervals[seedIndex][0], seedIntervals[seedIndex][1]])
                        isDistributed = true
                    }
                    else {
                        if (seedIntervals[seedIndex][0] < mappingStart) {
                            tempSeeds.push([seedIntervals[seedIndex][0], mappingStart - 1])
                            seedIntervals[seedIndex][0] = mappingStart


                        }
                        if (seedIntervals[seedIndex][1] <= mappingEnd) {
                            tempSeeds.push([seedIntervals[seedIndex][0] + delta, seedIntervals[seedIndex][1] + delta])
                            isDistributed = true
                        }
                        else {
                            tempSeeds.push([seedIntervals[seedIndex][0] + delta, mappingEnd + delta])
                            seedIntervals[seedIndex][0] = mappingEnd + 1
                        }
                    }
                }

                currentLine++
                if (currentLine === numberMaps[mapIndex].length && !isDistributed) {
                    tempSeeds.push([seedIntervals[seedIndex][0], seedIntervals[seedIndex][1]])
                }
            }
        }
        seedIntervals = []
        seedIntervals = tempSeeds
    }
    seedIntervals.sort((a, b) => a[0] - b[0])
    return seedIntervals[0][0]
}