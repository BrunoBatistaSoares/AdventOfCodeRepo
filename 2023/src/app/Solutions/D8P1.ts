export function D8P1(input: string) {
    input = input.replace(/[^\w\s]/g, '')
    input = input.replace(/\ \ /g, ' ')

    let separateLines = input.split(/\r?\n/g);
    let instructions: string = '';

    instructions = separateLines[0]
    separateLines.shift()
    separateLines.shift()

    let map = new Map()
    let ghostCurrentLocation: string = 'AAA'

    separateLines.forEach((inntruction) => {
        let splits = inntruction.split(' ')
        map.set('L' + splits[0], splits[1])
        map.set('R' + splits[0], splits[2])
    })

    let currentInstruction = 0
    let steps = 0
    let isGhostLost = true

    while (isGhostLost) {
        ghostCurrentLocation = map.get(instructions[currentInstruction] + ghostCurrentLocation)
        steps++
        if (ghostCurrentLocation === 'ZZZ') {
            isGhostLost = false
        }
        if (currentInstruction < instructions.length - 1) {
            currentInstruction++
        }
        else {
            currentInstruction = 0
        }
    }

    return steps
}
