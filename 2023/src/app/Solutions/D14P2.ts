var mapGoingUp = new Map<string, string>
var wholeMapGoingUp = new Map<string, string[][]>
var mapGoingDown = new Map<string, string>
var wholeMapGoingDown = new Map<string, string[][]>
var mapGoingEast = new Map<string, string>
var wholeMapGoingEast = new Map<string, string[][]>
var mapGoingWest = new Map<string, string>
var wholeMapGoingWest = new Map<string, string[][]>

var fourLoops = new Map<string, string[][]>

export function D14P2(input: string) {
    let result = 0;
    let separateInputs = input.split(/\n/g);
    let map: string[][] = []

    separateInputs.forEach((line) => {
        map.push(Array.from(line))
    })

    let firstLoop = ''
    let loopCount = 0
    let indexWhenLooped = 0
    let isLooping = false
    let n = 1000000000

    for (let index = 0; index < n; index++) {
        let fourLoopsKey = map.toString()
        let compareMap = fourLoops.get(fourLoopsKey)
        if (compareMap !== undefined) {
            if (firstLoop === '') {
                firstLoop = fourLoopsKey
                loopCount = index - 1
                indexWhenLooped = index - 1
                map = structuredClone(compareMap)
            }
            else if (firstLoop === fourLoopsKey && !isLooping) {
                loopCount = index - 1 - loopCount
                isLooping = true
                let remainingIterations = (n - index - 1) % loopCount
                index = n - remainingIterations - 2
            } else {
                map = structuredClone(compareMap)
            }
        }
        else {
            let temp = tiltNorth(map)
            temp = tiltWest(map)
            temp = tiltSouth(map)
            temp = tiltEast(map)

            if (true) {
                fourLoops.set(fourLoopsKey, structuredClone(map))
            }
        }
    }

    for (let x = 0; x < map[0].length; x++) {
        for (let y = 0; y < map.length; y++) {
            if (map[y][x] === 'O') {
                result += map[y].length - y
            }
        }

    }
    return result
}
function tiltWest(map: string[][]): { processedMap: string[][], isMemorized: boolean } {
    let memoCount = 0
    let mapKey = map.toString()
    let mapMemo = wholeMapGoingWest.get(mapKey)?.slice()
    if (mapMemo !== undefined) {
        //console.log('whole map');
        map = mapMemo
        return { processedMap: map, isMemorized: true }
    }
    else {

        for (let y = 0; y < map[0].length; y++) {

            let memoKey: string = map[y].toString();
            let colunmMemo = mapGoingWest.get(memoKey)
            if (colunmMemo !== undefined) {
                //console.log('ola');
                memoCount++
                map[y] = Array.from(colunmMemo)
            }
            else {

                //console.log('entrou');
                let memoValue: string = ''
                let base = map[0].length - 1


                let rollingBoulders = 0
                for (let x = base; x >= 0; x--) {

                    if (map[y][x] === 'O') {
                        rollingBoulders++
                    }
                    if (map[y][x] === '#') {

                        for (let height = base; height > x + rollingBoulders; height--) {
                            map[y][height] = '.'
                            memoValue = '.' + memoValue
                        }
                        for (let height = x + rollingBoulders; height > x; height--) {
                            map[y][height] = 'O'
                            memoValue = 'O' + memoValue
                        }
                        memoValue = '#' + memoValue
                        base = x - 1
                        rollingBoulders = 0
                    }
                    else if (x === 0) {
                        for (let height = base; height >= x + rollingBoulders; height--) {
                            map[y][height] = '.'
                            memoValue = '.' + memoValue
                        }
                        for (let height = x + rollingBoulders - 1; height >= x; height--) {
                            map[y][height] = 'O'
                            memoValue = 'O' + memoValue
                        }
                    }

                }
                mapGoingWest.set(memoKey, memoValue)
            }
        }
        if (memoCount === map[0].length) {
            let clone = structuredClone(map)
            wholeMapGoingWest.set(mapKey, clone)
            // console.log(clone);

        }
        return { processedMap: map, isMemorized: false }
    }

}

function tiltEast(map: string[][]): { processedMap: string[][], isMemorized: boolean } {
    let memoCount = 0
    let mapKey = map.toString()
    let mapMemo = wholeMapGoingEast.get(mapKey)?.slice()
    if (mapMemo !== undefined) {
        //console.log('whole map');
        map = mapMemo
        return { processedMap: map, isMemorized: true }
    }
    else {

        for (let y = 0; y < map[0].length; y++) {

            let memoKey: string = map[y].toString();
            let colunmMemo = mapGoingEast.get(memoKey)
            if (colunmMemo !== undefined) {
                //console.log('ola');
                memoCount++
                map[y] = Array.from(colunmMemo)
            }
            else {

                //console.log('entrou');
                let memoValue: string = ''
                let base = map[0].length - 1


                let rollingBoulders = 0
                for (let x = base; x >= 0; x--) {

                    if (map[y][x] === 'O') {
                        rollingBoulders++
                    }
                    if (map[y][x] === '#') {

                        for (let height = base; height > base - rollingBoulders; height--) {
                            map[y][height] = 'O'
                            memoValue = 'O' + memoValue
                        }
                        for (let height = base - rollingBoulders; height > x; height--) {
                            map[y][height] = '.'
                            memoValue = '.' + memoValue
                        }
                        memoValue = '#' + memoValue
                        base = x - 1
                        rollingBoulders = 0
                    }
                    else if (x === 0) {
                        for (let height = base; height > base - rollingBoulders; height--) {
                            map[y][height] = 'O'
                            memoValue = 'O' + memoValue
                        }
                        for (let height = base - rollingBoulders; height >= x; height--) {
                            map[y][height] = '.'
                            memoValue = '.' + memoValue
                        }
                    }

                }
                mapGoingEast.set(memoKey, memoValue)
            }
        }
        if (memoCount === map[0].length) {
            let clone = structuredClone(map)
            wholeMapGoingEast.set(mapKey, clone)
            // console.log(clone);

        }
        return { processedMap: map, isMemorized: false }
    }

}

function tiltNorth(map: string[][]): { processedMap: string[][], isMemorized: boolean } {
    let memoCount = 0
    let mapKey = map.toString()
    let mapMemo = wholeMapGoingUp.get(mapKey)?.slice()
    if (mapMemo !== undefined) {
        //console.log('whole map');
        map = mapMemo
        return { processedMap: map, isMemorized: true }
    }
    else {
        // console.log(mapGoingUp);

        for (let x = 0; x < map[0].length; x++) {

            let memoKey: string = ''
            for (let y = 0; y < map.length; y++) {
                memoKey += map[y][x];
            }
            let colunmMemo = mapGoingUp.get(memoKey)
            if (colunmMemo !== undefined) {
                //console.log('ola');
                memoCount++
                Array.from(colunmMemo).forEach((value, y) => {
                    map[y][x] = value
                })
            }
            else {

                //console.log('entrou');
                let memoValue: string = ''
                let base = 0
                let rollingBoulders = 0
                for (let y = 0; y < map.length; y++) {

                    if (map[y][x] === 'O') {
                        rollingBoulders++
                    }
                    if (map[y][x] === '#') {

                        for (let height = base; height < rollingBoulders + base; height++) {
                            map[height][x] = 'O'
                            memoValue += 'O'
                        }
                        for (let height = rollingBoulders + base; height < y; height++) {
                            map[height][x] = '.'
                            memoValue += '.'
                        }
                        memoValue += '#'
                        base = y + 1
                        rollingBoulders = 0
                    }
                    else if (y === map.length - 1) {
                        for (let height = base; height < rollingBoulders + base; height++) {
                            map[height][x] = 'O'
                            memoValue += 'O'
                        }
                        for (let height = rollingBoulders + base; height <= y; height++) {
                            map[height][x] = '.'
                            memoValue += '.'
                        }
                        base = y + 1
                        rollingBoulders = 0
                    }

                }
                mapGoingUp.set(memoKey, memoValue)
            }
        }
        if (memoCount === map[0].length) {
            let clone = structuredClone(map)
            wholeMapGoingUp.set(mapKey, clone)
        }
        return { processedMap: map, isMemorized: false }
    }

}

function tiltSouth(map: string[][]): { processedMap: string[][], isMemorized: boolean } {
    let memoCount = 0
    let mapKey = map.toString()
    let mapMemo = wholeMapGoingDown.get(mapKey)?.slice()
    if (mapMemo !== undefined) {
        //console.log('whole map');
        map = mapMemo
        return { processedMap: map, isMemorized: true }
    }
    else {

        for (let x = 0; x < map[0].length; x++) {

            let memoKey: string = ''
            for (let y = 0; y < map.length; y++) {
                memoKey += map[y][x];
            }
            let colunmMemo = mapGoingDown.get(memoKey)
            if (colunmMemo !== undefined) {
                memoCount++
                Array.from(colunmMemo).forEach((value, y) => {
                    map[y][x] = value
                })
            }
            else {

                //console.log('entrou');
                let memoValue: string = ''
                let base = 0
                let rollingBoulders = 0
                for (let y = 0; y < map.length; y++) {

                    if (map[y][x] === 'O') {
                        rollingBoulders++
                    }
                    if (map[y][x] === '#') {

                        for (let height = base; height < y - rollingBoulders; height++) {
                            map[height][x] = '.'
                            memoValue += '.'
                        }
                        for (let height = y - rollingBoulders; height < y; height++) {
                            map[height][x] = 'O'
                            memoValue += 'O'
                        }

                        memoValue += '#'
                        base = y + 1
                        rollingBoulders = 0
                    }
                    else if (y === map.length - 1) {
                        for (let height = base; height <= y - rollingBoulders; height++) {
                            map[height][x] = '.'
                            memoValue += '.'
                        }
                        for (let height = y - rollingBoulders + 1; height <= y; height++) {
                            map[height][x] = 'O'
                            memoValue += 'O'
                        }
                        base = y + 1
                        rollingBoulders = 0
                    }

                }

                mapGoingDown.set(memoKey, memoValue)
            }
        }
        if (memoCount === map[0].length) {
            let clone = structuredClone(map)
            wholeMapGoingDown.set(mapKey, clone)
        }
        return { processedMap: map, isMemorized: false }
    }
}