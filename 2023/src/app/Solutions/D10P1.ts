export function D10P1(input: string) {
    let result = 0;
    let separateLines = input.split(/\r?\n/g);
    let map: string[][] = []

    separateLines.forEach(element => {
        map.push(element.split(''))
    });
    let xStart = 0, yStart = 0

    map.forEach((line, y) => {
        line.forEach((colunm, x) => {
            if (colunm === 'S') {
                xStart = x
                yStart = y
            }
        })
    })

    let xNext = 0, yNext = 0
    if (map[yStart - 1][xStart] === '7' || map[yStart - 1][xStart] === 'F' || map[yStart - 1][xStart] === '|') {
        xNext = xStart
        yNext = yStart - 1
    }
    else if (map[yStart + 1][xStart] === 'J' || map[yStart + 1][xStart] === 'L' || map[yStart + 1][xStart] === '|') {
        xNext = xStart
        yNext = yStart + 1
    }
    else if (map[yStart][xStart + 1] === 'J' || map[yStart][xStart + 1] === '7' || map[yStart][xStart + 1] === '-') {
        xNext = xStart + 1
        yNext = yStart
    }
    return goWithTheFlow(xStart, yStart, xNext, yNext, map, 1)
}

function goWithTheFlow(x1: number, y1: number, x2: number, y2: number, map: string[][], steps: number): number {
    while (map[y2][x2] !== 'S') {
        steps++
        if (y1 === y2) {
            if (map[y2][x2] === 'J' || map[y2][x2] === 'L') {
                x1 = x2
                y1 = y2
                y2--
            }
            else if (map[y2][x2] === '-') {
                if (x2 < x1) {
                    x1 = x2
                    y1 = y2
                    x2--
                }
                else {
                    x1 = x2
                    y1 = y2
                    x2++
                }
            }
            else if (map[y2][x2] === '7' || map[y2][x2] === 'F') {
                x1 = x2
                y1 = y2
                y2++
            }
        }
        else if (x1 === x2) {
            if (map[y2][x2] === 'J' || map[y2][x2] === '7') {
                x1 = x2
                y1 = y2
                x2--
            }
            else if (map[y2][x2] === '|') {
                if (y2 < y1) {
                    x1 = x2
                    y1 = y2
                    y2--
                }
                else {
                    x1 = x2
                    y1 = y2
                    y2++
                }

            }
            else if (map[y2][x2] === 'F' || map[y2][x2] === 'L') {
                x1 = x2
                y1 = y2
                x2++
            }
        }
    }
    return steps / 2
}