var GLOBALCOUNTER = 0
var memo = new Map

export function D12P2(input: string) {
    console.log(`start`);

    let result = 0;
    let separateLines = input.split(/\r?\n/g);

    separateLines.forEach((line) => {
        // console.log(line);

        let tempMap = line.split(' ')[0]
        tempMap = tempMap.concat('?', tempMap, '?', tempMap, '?', tempMap, '?', tempMap)
        let map = Array.from(tempMap)
        let tempCoils = line.split(' ')[1]
        tempCoils = tempCoils.concat(',', tempCoils, ',', tempCoils, ',', tempCoils, ',', tempCoils)
        let stringCoils = tempCoils.split(',')
        let coils: number[] = []

        stringCoils.forEach((coil) => {
            coils.push(parseInt(coil))
        })
        preCookMap(map, coils)

        let unkowns = 0
        let visibleBrokenCoils = 0
        map.forEach((currentCoil) => {
            if (currentCoil === '?') { unkowns++ }
            else if (currentCoil === '#') {
                visibleBrokenCoils++
            }
        })

        let coilIndexToRemainingCoilsToCount = new Map

        let auxSum = 0
        coils.forEach((coil) => {
            auxSum += coil
        })
        coils.forEach((coil, index) => {
            coilIndexToRemainingCoilsToCount.set(index, auxSum)
            auxSum -= coil
        })
        coilIndexToRemainingCoilsToCount.set(coils.length, 0)

        let aux = possibilities(map, coils, 0, 0, unkowns, visibleBrokenCoils, coilIndexToRemainingCoilsToCount);
        result += aux
        memo = new Map
    })
    return result
}

function possibilities(map: string[], coils: number[], index: number, coilIndex: number, futureUnkowns: number, futureBrokenCoils: number, coilRemainingMap: Map<number, number>): number {
    if (coilIndex === coils.length && futureBrokenCoils === 0) {
        return 1
    }
    else if (index === map.length) {
        if (coilIndex === coils.length) { return 1 }
        else { return 0 }
    }
    else if (futureBrokenCoils + futureUnkowns < coilRemainingMap.get(coilIndex)!) {
        return 0
    }
    else if ((map.length - index < coilRemainingMap.get(coilIndex)! + (coils.length - coilIndex - 1))) {
        return 0
    }
    else {
        if (map[index] === '?') {
            futureUnkowns--
            let possibleBranches = 0
            let clone = structuredClone(map)
            clone[index] = '.';
            possibleBranches += possibilities(clone, coils, index, coilIndex, futureUnkowns, futureBrokenCoils, coilRemainingMap)
            clone = structuredClone(map)
            clone[index] = '#';
            futureBrokenCoils++
            possibleBranches += possibilities(clone, coils, index, coilIndex, futureUnkowns, futureBrokenCoils, coilRemainingMap)
            return possibleBranches
        }
        else if (map[index] === '#') {
            futureBrokenCoils--
            let count = 0
            while (map[index] !== '.' && index < map.length && count < coils[coilIndex]) {
                index++
                count++
            }
            if (count < coils[coilIndex]) {
                return 0
            }
            else {
                if (map[index] === '#') {
                    return 0
                }
                else {
                    coilIndex++
                    let clone = structuredClone(map)
                    if (clone[index] === '?') {
                        futureUnkowns--
                        clone[index] = '.';
                    }
                    return possibilities(clone, coils, index, coilIndex, futureUnkowns, futureBrokenCoils, coilRemainingMap)
                }
            }
        }
        else {
            let key: string = index.toString() + '.' + coilRemainingMap.get(coilIndex);
            let memoPreResult = memo.get(key)
            if (memoPreResult === undefined) {
                while (map[index] === '.' && index < map.length) {
                    index++
                }
                let possibilitiesAfterDot = possibilities(map, coils, index, coilIndex, futureUnkowns, futureBrokenCoils, coilRemainingMap)
                memo.set(key, possibilitiesAfterDot)
                return possibilitiesAfterDot
            }
            else {
                return memoPreResult
            }
        }

    }
}

function preCookMap(map: string[], coils: number[]) {
    let index = 0
    let currentCoilGroup = 0
    while (map[index] !== '?' && coils.length > 0) {
        if (map[index] === '.') {
            map.shift()
        }
        else if (map[index] === '#') {
            map.splice(0, coils[currentCoilGroup] + 1)
            coils.shift()
        }
    }
    index = map.length - 1
    currentCoilGroup = coils.length - 1
    while (map[index] !== '?' && map[index] !== undefined && coils.length > 0) {
        if (map[index] === '.') {
            map.pop()
            index--
        }
        else if (map[index] === '#') {
            map.splice(map.length - coils[currentCoilGroup] - 1, coils[currentCoilGroup] + 1)
            index -= coils[currentCoilGroup] + 1
            coils.pop()
            currentCoilGroup--
        }

    }
}