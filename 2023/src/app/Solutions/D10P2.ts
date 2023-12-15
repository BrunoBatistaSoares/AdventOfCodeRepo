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

    let startingConections: string[] = []
    if (loop[yStart][xStart - 1]) {
        if (map[yStart][xStart - 1] === '-' || map[yStart][xStart - 1] === 'F' || map[yStart][xStart - 1] === 'L') {
            startingConections.push('W')
        }
    }
    if (loop[yStart][xStart + 1]) {
        if (map[yStart][xStart + 1] === '-' || map[yStart][xStart + 1] === 'J' || map[yStart][xStart + 1] === '7') {
            startingConections.push('E')
        }
    }
    if (loop[yStart + 1][xStart]) {
        if (map[yStart + 1][xStart] === '|' || map[yStart + 1][xStart] === 'L' || map[yStart + 1][xStart] === 'J') {
            startingConections.push('S')
        }
    }
    if (loop[yStart - 1][xStart]) {
        if (map[yStart - 1][xStart] === '|' || map[yStart - 1][xStart] === '7' || map[yStart - 1][xStart] === 'F') {
            startingConections.push('N')
        }
    }

    if (startingConections[0] === 'W') {
        if (startingConections[1] === 'N') {
            map[yStart][xStart] = 'J'
        }
        if (startingConections[1] === 'S') {
            map[yStart][xStart] = '7'
        }
        if (startingConections[1] === 'E') {
            map[yStart][xStart] = '-'
        }
    }
    if (startingConections[0] === 'E') {
        if (startingConections[1] === 'S') {
            map[yStart][xStart] = 'F'
        }
        if (startingConections[1] === 'N') {
            map[yStart][xStart] = 'L'
        }
    }
    if (startingConections[0] === 'S') {
        if (startingConections[1] === 'N') {
            map[yStart][xStart] = '|'
        }
    }



    return countTheCorrectSide(x, y, innerSideDirection, map, loop)
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

function countTheCorrectSide(xStart: number, yStart: number, startingInnerSide: string, map: string[][], loop: boolean[][]): number {
    let innerSpace: boolean[][] = []
    for (let i = 0; i < map.length; i++) {
        innerSpace[i] = new Array(map[0].length).fill(false);
    }
    let x = xStart
    let y = yStart
    let innerSide = startingInnerSide
    let innerSide2 = startingInnerSide
    console.log(map[6][13]);
    do {
        let distance = 1
        let faceOnTheWall = false
        console.log(x + ',' + y + ' ' + map[y][x] + ' ' + innerSide);
        if (x === 13 && y === 6) {
            console.log(innerSide);
            console.log(innerSide2);
            console.log(JSON.stringify(map[y][x]));

        }
        switch (innerSide) {
            case 'N': {
                while (!faceOnTheWall) {
                    if (y - distance < 0 || loop[y - distance][x]) {
                        faceOnTheWall = true
                    }
                    else {
                        console.log(x + ',' + y + ' ' + map[y][x] + ' ' + innerSide);
                        innerSpace[y - distance][x] = true
                    }
                    distance++
                }
                break
            }
            case 'S': {
                while (!faceOnTheWall) {
                    if (y + distance === map.length || loop[y + distance][x]) {
                        faceOnTheWall = true
                    }
                    else {
                        console.log(x + ',' + y + ' ' + map[y][x] + ' ' + innerSide);
                        innerSpace[y + distance][x] = true
                    }
                    distance++
                }
                break
            }
            case 'E': {
                while (!faceOnTheWall) {
                    if (x + distance === map[y].length || loop[y][x + distance]) {
                        faceOnTheWall = true
                    }
                    else {
                        console.log(x + ',' + y + ' ' + map[y][x] + ' ' + innerSide);
                        innerSpace[y][x + distance] = true
                    }
                    distance++
                }
                break
            }
            case 'W': {
                while (!faceOnTheWall) {
                    if (x - distance < 0 || loop[y][x - distance]) {
                        faceOnTheWall = true
                    }
                    else {
                        console.log(x + ',' + y + ' ' + map[y][x] + ' ' + innerSide);
                        innerSpace[y][x - distance] = true
                    }
                    distance++
                }
                break
            }
        }
        if (innerSide !== innerSide2) {
            distance = 1
            faceOnTheWall = false
            switch (innerSide2) {
                case 'N': {
                    while (!faceOnTheWall) {
                        if (y - distance < 0 || loop[y - distance][x]) {
                            faceOnTheWall = true
                        }
                        else {
                            console.log(x + ',' + y + ' ' + map[y][x] + ' ' + innerSide2);
                            innerSpace[y - distance][x] = true
                        }
                        distance++
                    }
                    break
                }
                case 'S': {
                    while (!faceOnTheWall) {
                        if (y + distance === map.length || loop[y + distance][x]) {
                            faceOnTheWall = true
                        }
                        else {
                            console.log(x + ',' + y + ' ' + map[y][x] + ' ' + innerSide2);
                            innerSpace[y + distance][x] = true
                        }
                        distance++
                    }
                    break
                }
                case 'E': {
                    while (!faceOnTheWall) {
                        if (x + distance === map[y].length || loop[y][x + distance]) {
                            faceOnTheWall = true
                        }
                        else {
                            console.log(x + ',' + y + ' ' + map[y][x] + ' ' + innerSide2);
                            innerSpace[y][x + distance] = true
                        }
                        distance++
                    }
                    break
                }
                case 'W': {
                    while (!faceOnTheWall) {
                        if (x - distance < 0 || loop[y][x - distance]) {
                            faceOnTheWall = true
                        }
                        else {
                            console.log(x + ',' + y + ' ' + map[y][x] + ' ' + innerSide2);
                            innerSpace[y][x - distance] = true
                        }
                        distance++
                    }
                    break
                }
            }
        }
        switch (map[y][x]) {
            case '-': {
                if (innerSide === 'S') {
                    x--
                }
                else {
                    x++
                }
                break
            }
            case '|': {
                if (innerSide === 'E') {
                    y++
                }
                else {
                    y--
                }
                break
            }
            case 'L': {
                if (innerSide === 'S') {
                    y--
                    innerSide = 'W'
                }
                else if (innerSide === 'N') {
                    y--
                    innerSide = 'E'
                }
                else if (innerSide === 'E') {
                    x++
                    innerSide = 'N'
                }
                else if (innerSide === 'W') {
                    x++
                    innerSide = 'S'
                }
                break
            }
            case 'J': {
                if (innerSide === 'S') {
                    y--
                    innerSide = 'E'
                }
                else if (innerSide === 'N') {
                    y--
                    innerSide = 'W'
                }
                else if (innerSide === 'E') {
                    x--
                    innerSide = 'S'
                }
                else if (innerSide === 'W') {
                    x--
                    innerSide = 'N'
                }
                break
            }
            case 'F': {
                if (innerSide === 'S') {
                    y++
                    innerSide = 'E'
                }
                else if (innerSide === 'N') {
                    y++
                    innerSide = 'W'
                }
                else if (innerSide === 'E') {
                    x++
                    innerSide = 'S'
                }
                else if (innerSide === 'W') {
                    x++
                    innerSide = 'N'
                }
                break
            }
            case '7': {
                if (innerSide === 'S') {
                    y++
                    innerSide = 'W'
                }
                else if (innerSide === 'N') {
                    y++
                    innerSide = 'E'
                }
                else if (innerSide === 'E') {
                    x--
                    innerSide = 'N'
                }
                else if (innerSide === 'W') {
                    x--
                    innerSide = 'S'
                }
                break
            }
        }
        switch (map[y][x]) {
            case '-': {
                innerSide2 = innerSide
                break
            }
            case '|': {
                innerSide2 = innerSide
                break
            }
            case 'L': {
                if (innerSide === 'S') {
                    innerSide2 = 'W'
                }
                else if (innerSide === 'N') {
                    innerSide2 = 'E'
                }
                else if (innerSide === 'E') {
                    innerSide2 = 'N'
                }
                else if (innerSide === 'W') {
                    innerSide2 = 'S'
                }
                break
            }
            case 'J': {
                if (innerSide === 'S') {
                    innerSide2 = 'E'
                }
                else if (innerSide === 'N') {
                    innerSide2 = 'W'
                }
                else if (innerSide === 'E') {
                    innerSide2 = 'S'
                }
                else if (innerSide === 'W') {
                    innerSide2 = 'N'
                }
                break
            }
            case 'F': {
                if (innerSide === 'S') {
                    innerSide2 = 'E'
                }
                else if (innerSide === 'N') {
                    innerSide2 = 'W'
                }
                else if (innerSide === 'E') {
                    innerSide2 = 'S'
                }
                else if (innerSide === 'W') {
                    innerSide2 = 'N'
                }
                break
            }
            case '7': {
                if (innerSide === 'S') {
                    innerSide2 = 'W'
                }
                else if (innerSide === 'N') {
                    innerSide2 = 'E'
                }
                else if (innerSide === 'E') {
                    innerSide2 = 'N'
                }
                else if (innerSide === 'W') {
                    innerSide2 = 'S'
                }
                break
            }
        }
    } while (x !== xStart || y !== yStart)

    let count = 0

    innerSpace.forEach((line) => {
        line.forEach((block) => {
            if (block) {
                count++
            }
        })
    })

    return count
}

