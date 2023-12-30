var GLOBALCOUNTER = 0

export function D16P2(input: string) {
    let result = 0;
    let separateLines = input.split(/\n/g);
    let map: string[][] = []

    separateLines.forEach(element => {
        map.push(Array.from(element))
    });

    console.log(map);



    //result = process(map, energizedTiles, 0, 0, 'E')
    for (let y = 0; y < map.length; y++) {
        let aux = process(map, 0, y, 'E')
        if (result < aux) {
            result = aux
        }
    }
    for (let y = 0; y < map.length; y++) {
        let aux = process(map, map[0].length - 1, y, 'W')
        if (result < aux) {
            result = aux
        }
    }
    for (let x = 0; x < map[0].length; x++) {
        let aux = process(map, x, 0, 'S')
        if (result < aux) {
            result = aux
        }
    }
    for (let x = 0; x < map[0].length; x++) {
        let aux = process(map, x, map.length - 1, 'N')
        if (result < aux) {
            result = aux
        }
    }


    return result
}

function process(map: string[][], x: number, y: number, previousDirection: string): number {

    //console.log(x + ' ' + y);
    let energizedTiles: string[][] = []
    for (let index = 0; index < map.length; index++) {
        energizedTiles.push(Array(map[0].length).fill(''))
    }
    //let newEnergizesTiles: { visited: boolean, directionsWhenVisited: string[] }[][] = structuredClone(energizedTiles)
    //console.log(tempEnergized);
    console.log(x + ' ' + y);
    tracePath(map, energizedTiles, x, y, previousDirection)
    // console.log(map[y][x]);

    // 85 77 S
    // tracePath(map, energizedTiles, 0, 0, 'E')

    let tempResult = 0
    console.log(energizedTiles);


    energizedTiles.forEach((line) => {
        line.forEach((x) => {
            if (x.length > 0) {
                tempResult++
            }
        })
    })
    // console.log(tempResult);

    return tempResult
}

function tracePath(map: string[][], energizedTiles: string[][], x: number, y: number, previousDirection: string) {

    if (0 <= y && y < map.length && x >= 0 && x < map[0].length) {


        // console.log(JSON.stringify(energizedTiles[y][x].directionsWhenVisited));
        //console.log(x + ' ' + y);

        if (energizedTiles[y][x].length > 0) {
            for (let direction = 0; direction < energizedTiles[y][x].length; direction++) {
                if (energizedTiles[y][x].charAt(direction) === previousDirection) {
                    //console.log('oi');

                    return false
                }
            }
        }

        //console.log(previousDirection);

        energizedTiles[y][x] += previousDirection

        if (map[y][x] === '.') {
            switch (previousDirection) {
                case 'W':
                    x--
                    while (x >= 0 && map[y][x] === '.') {
                        energizedTiles[y][x] += previousDirection
                        x--
                    }
                    break
                case 'E':
                    x++
                    while (x < map[0].length && map[y][x] === '.') {
                        energizedTiles[y][x] += previousDirection
                        x++
                    }
                    break
                case 'S':
                    y++
                    while (y < map.length && map[y][x] === '.') {
                        energizedTiles[y][x] += previousDirection
                        y++
                    }
                    break
                case 'N':
                    y--
                    while (y >= 0 && map[y][x] === '.') {
                        energizedTiles[y][x] += previousDirection
                        y--
                    }
                    break
            }

        }
        if (0 <= y && y < map.length && x >= 0 && x < map[0].length) {
            energizedTiles[y][x] += previousDirection
            switch (map[y][x]) {
                case '|': {
                    switch (previousDirection) {
                        case 'W':
                            tracePath(map, energizedTiles, x, y + 1, 'S');
                            tracePath(map, energizedTiles, x, y - 1, 'N');
                            return true
                        case 'E':
                            tracePath(map, energizedTiles, x, y + 1, 'S');
                            tracePath(map, energizedTiles, x, y - 1, 'N');
                            return true

                        case 'S':
                            tracePath(map, energizedTiles, x, y + 1, 'S');
                            break;
                        case 'N':
                            tracePath(map, energizedTiles, x, y - 1, 'N');
                            break;
                    }
                    break
                }
                case '-': {
                    switch (previousDirection) {
                        case 'S':
                            tracePath(map, energizedTiles, x + 1, y, 'E');
                            tracePath(map, energizedTiles, x - 1, y, 'W');
                            return true
                        case 'N':
                            tracePath(map, energizedTiles, x + 1, y, 'E');
                            tracePath(map, energizedTiles, x - 1, y, 'W');
                            return true

                        case 'W':
                            tracePath(map, energizedTiles, x - 1, y, 'W');
                            break;
                        case 'E':
                            tracePath(map, energizedTiles, x + 1, y, 'E');
                            break;
                    }
                    break
                }
                case '\\': {
                    switch (previousDirection) {
                        case 'N':
                            tracePath(map, energizedTiles, x - 1, y, 'W');
                            break
                        case 'S':
                            tracePath(map, energizedTiles, x + 1, y, 'E');
                            break;
                        case 'E':
                            tracePath(map, energizedTiles, x, y + 1, 'S');
                            break;
                        case 'W':
                            tracePath(map, energizedTiles, x, y - 1, 'N');
                            break;
                    }
                    break
                }
                case '/': {
                    switch (previousDirection) {
                        case 'S':
                            tracePath(map, energizedTiles, x - 1, y, 'W');
                            break
                        case 'N':
                            tracePath(map, energizedTiles, x + 1, y, 'E');
                            break;
                        case 'W':
                            tracePath(map, energizedTiles, x, y + 1, 'S');
                            break;
                        case 'E':
                            tracePath(map, energizedTiles, x, y - 1, 'N');
                            break;
                    }
                    break
                }
            }
            return true
        }
        else {
            return false
        }
    }
    else {
        return false
    }
}

function checkIfLooped(energizedTiles: string[][], x: number, y: number, previousDirection: string): boolean {
    if (energizedTiles[y][x].length > 0) {
        for (let direction = 0; direction < energizedTiles[y][x].length; direction++) {
            if (energizedTiles[y][x].charAt(direction) === previousDirection) {
                console.log('oi');

                return true
            }
        }
    }
    return false
}