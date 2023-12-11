import { Binary } from "@angular/compiler";

export function D10P2(input: string) {
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
    let loop: boolean[][] = goWithTheFlow(xStart, yStart, xNext, yNext, map)

    let whereIFoundTheOutersideX = 0
    let whereIFoundTheOutersidey = 0
    let innerSideDirection = ''
    let outersideIsFound = false
    let y = 0
    let x = 0
    while (!outersideIsFound && y < map.length) {
        while (!outersideIsFound && x < map[y].length) {
            let distance = 1
            let faceOnTheWall = false


            if (loop[y][x] && (map[y][x] === '-' || map[y][x] === '|')) {
                while (!faceOnTheWall) {
                    console.log(JSON.stringify(loop[y][x]) + ' ' + x + ' ' + y + ' ' + distance);
                    if (y - distance < 0) {
                        outersideIsFound = true
                        faceOnTheWall = true
                        innerSideDirection = 'S'
                        whereIFoundTheOutersideX = x
                        whereIFoundTheOutersidey = y
                    }
                    else if (loop[y - distance][x]) {
                        faceOnTheWall = true
                    }
                    distance++
                }
                distance = 1
                while (!faceOnTheWall) {
                    if (y + distance === map.length) {
                        outersideIsFound = true
                        faceOnTheWall = true
                        innerSideDirection = 'N'
                        whereIFoundTheOutersideX = x
                        whereIFoundTheOutersidey = y
                    }
                    else if (loop[y + distance][x]) {
                        faceOnTheWall = true
                    }
                    distance++
                }
                distance = 1
                while (!faceOnTheWall) {
                    if (x - distance < 0) {
                        outersideIsFound = true
                        faceOnTheWall = true
                        innerSideDirection = 'E'
                        whereIFoundTheOutersideX = x
                        whereIFoundTheOutersidey = y
                    }
                    else if (loop[y][x - distance]) {
                        faceOnTheWall = true
                    }
                    distance++
                }
                distance = 1
                while (!faceOnTheWall) {
                    if (x + distance === map[y].length) {
                        outersideIsFound = true
                        faceOnTheWall = true
                        innerSideDirection = 'W'
                        whereIFoundTheOutersideX = x
                        whereIFoundTheOutersidey = y
                    }
                    else if (loop[y][x + distance]) {
                        faceOnTheWall = true
                    }
                    distance++
                }
            }
            x++
        }
        x = 0
        y++
    }

    console.log(JSON.stringify(whereIFoundTheOutersideX));
    console.log(JSON.stringify(whereIFoundTheOutersidey));
    console.log(JSON.stringify(innerSideDirection));
    x = whereIFoundTheOutersideX
    y = whereIFoundTheOutersidey
    //criar e preencher novo mapa binario para marcar o que ja foi contado
    while (y < map.length) {
        while (x < map[y].length) {
            // muda o novo mapa binario baseado no innerSideDirection
            // se for - e direction for N vai pra direita se direction for S esquerda
            if (false) {

            }
            x++
        }
        x = 0
        y++
    }






    return 0
}

function goWithTheFlow(x1: number, y1: number, x2: number, y2: number, map: string[][]): boolean[][] {
    let loop: boolean[][] = []
    for (let i = 0; i < map.length; i++) {
        loop[i] = new Array(map[0].length).fill(false);
    }
    loop[y1][x1] = true
    while (map[y2][x2] !== 'S' || loop.length < 3) {


        loop[y2][x2] = true
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
    return loop
}