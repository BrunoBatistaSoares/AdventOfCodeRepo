export function D17P2(input: string) {

    let result = 0;
    let separateInputs = input.split(/\n/g);
    let map: number[][] = []

    separateInputs.forEach(element => {
        let line: number[] = []
        Array.from(element).forEach((x) => {
            line.push(parseInt(x))
        })
        map.push(line)
    });

    let possibleDirections = new Map<string, string[]>;
    possibleDirections.set('S', ['W', 'E'])
    possibleDirections.set('N', ['W', 'E'])
    possibleDirections.set('W', ['S', 'N'])
    possibleDirections.set('E', ['S', 'N'])

    let lavaMemory = new Map<string, number>
    let unprocessedTiles: string[] = []

    let directions = ['S', 'N', 'W', 'E']
    let FactoryX = map[0].length - 1
    let FactoryY = map.length - 1
    let FactoryValue = map[FactoryY][FactoryX]

    directions.forEach((direction) => {
        let tempX = FactoryX
        let tempY = FactoryY
        let value = FactoryValue
        for (let distance = 1; distance <= 10; distance++) {

            switch (direction) {
                case 'S': tempY++; break;
                case 'N': tempY--; break;
                case 'E': tempX++; break;
                case 'W': tempX--; break;
            }

            if (0 <= tempY && tempY < map.length && tempX >= 0 && tempX < map[0].length) {

                if (distance < 4) {
                    value += map[tempY][tempX]
                } else {
                    let key = generateKey(tempX, tempY, direction, distance)
                    value += map[tempY][tempX]
                    lavaMemory.set(key, value)
                    unprocessedTiles.push(key)
                }
            }
        }
    })

    console.log([...lavaMemory.entries()]);


    let lavaStartX = 0
    let lavaStartY = 0

    let shortestPathFound: number | null = null

    while (unprocessedTiles.length > 0) {
        unprocessedTiles.sort((a, b) => {
            return lavaMemory.get(a)! - lavaMemory.get(b)!
        })

        let tile = translateKey(unprocessedTiles[0])
        let value = lavaMemory.get(unprocessedTiles[0])

        possibleDirections.get(tile.dir)?.forEach((direction) => {
            let tempX = tile.x
            let tempY = tile.y

            let tempValue = value
            for (let distance = 1; distance <= 10; distance++) {

                switch (direction) {
                    case 'S': tempY++; break;
                    case 'N': tempY--; break;
                    case 'E': tempX++; break;
                    case 'W': tempX--; break;
                }

                if (0 <= tempY && tempY < map.length && tempX >= 0 && tempX < map[0].length && tempValue !== undefined) {

                    if (distance < 4) {
                        tempValue += map[tempY][tempX]
                    } else {
                        let key = generateKey(tempX, tempY, direction, distance)
                        let alreadyVisited = lavaMemory.get(key)

                        if (tempX === lavaStartX && tempY === lavaStartY) {
                            if (shortestPathFound === null || shortestPathFound > tempValue) {
                                shortestPathFound = tempValue
                            }
                        }
                        else {
                            tempValue += map[tempY][tempX]

                            if (shortestPathFound === null || tempValue < shortestPathFound) {
                                if (alreadyVisited === undefined || alreadyVisited > tempValue) {
                                    lavaMemory.set(key, tempValue)
                                    unprocessedTiles.push(key)
                                }
                            }
                        }
                    }
                }
                else if (tempValue === undefined) {
                    console.log('tempValue undefined');
                }
            }
        })

        unprocessedTiles.shift()
    }

    if (shortestPathFound === null) {
        return -1
    }
    else {
        return shortestPathFound
    }

}

function generateKey(x: number, y: number, dir: string, dirCounter: number): string {
    return x.toString() + '.' + y.toString() + '.' + dir + '.' + dirCounter
}

function translateKey(key: string): { x: number, y: number, dir: string, dirCounter: number } {
    let splitKey = key.split('.')
    let x = parseInt(splitKey[0])
    let y = parseInt(splitKey[1])
    let dir = splitKey[2]
    let dirCounter = parseInt(splitKey[3])
    return { x: x, y: y, dir: dir, dirCounter: dirCounter }
}