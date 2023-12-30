export function D16P1(input: string) {
    let result = 0;
    let separateLines = input.split(/\n/g);
    let map: string[][] = []

    separateLines.forEach(element => {
        map.push(Array.from(element))
    });



    result = process(map, 0, 0, 'E')


    return result
}

function process(originalMap: string[][], x: number, y: number, previousDirection: string): number {
    let map = structuredClone(originalMap)
    let energizedTiles: { visited: boolean, directionsWhenVisited: string[] }[][] = []
    for (let index = 0; index < map.length; index++) {
        energizedTiles.push(Array(map.length).fill({ visited: false, directionsWhenVisited: [] }))
    }

    tracePath(map, energizedTiles, x, y, previousDirection)
    let tempResult = 0
    energizedTiles.forEach((line) => {
        line.forEach((x) => {
            if (x.visited) {
                tempResult++
            }
        })
    })
    return tempResult
}

function tracePath(map: string[][], energizedTiles: { visited: boolean, directionsWhenVisited: string[] }[][], x: number, y: number, previousDirection: string) {




    if (0 <= y && y < map.length && x >= 0 && x < map[0].length) {
        if (energizedTiles[y][x].visited !== undefined) {
            if (energizedTiles[y][x].visited === true) {
                for (let direction = 0; direction < energizedTiles[y][x].directionsWhenVisited.length; direction++) {






                    if (energizedTiles[y][x].directionsWhenVisited[direction] === previousDirection) {
                        return 0;
                    }

                }
            }
        }
        let visitedDirections = structuredClone(energizedTiles[y][x].directionsWhenVisited)
        visitedDirections.push(previousDirection)
        energizedTiles[y][x] = { visited: true, directionsWhenVisited: visitedDirections }


        switch (map[y][x]) {
            case '.': {
                switch (previousDirection) {
                    case 'W':
                        tracePath(map, energizedTiles, x - 1, y, 'W');
                        break
                    case 'E':
                        tracePath(map, energizedTiles, x + 1, y, 'E');
                        break;

                    case 'S':
                        tracePath(map, energizedTiles, x, y + 1, 'S');
                        break;
                    case 'N':
                        tracePath(map, energizedTiles, x, y - 1, 'N');
                        break;
                }
                break
            }
            case '|': {
                switch (previousDirection) {
                    case 'W':
                        tracePath(map, energizedTiles, x, y + 1, 'S');
                        tracePath(map, energizedTiles, x, y - 1, 'N');
                        break;
                    case 'E':
                        tracePath(map, energizedTiles, x, y + 1, 'S');
                        tracePath(map, energizedTiles, x, y - 1, 'N');
                        break;

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
                        break;
                    case 'N':
                        tracePath(map, energizedTiles, x + 1, y, 'E');
                        tracePath(map, energizedTiles, x - 1, y, 'W');
                        break;

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
    }

    return 0
}