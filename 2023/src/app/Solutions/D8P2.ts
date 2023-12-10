export function D8P2(input: string) {
    let result = 1;
    input = input.replace(/[^\w\s]/g, '')
    input = input.replace(/\ \ /g, ' ')
    let separateLines = input.split(/\r?\n/g);

    let instructions: string = '';
    instructions = separateLines[0]
    separateLines.shift()
    separateLines.shift()

    let map = new Map()
    let ghostsCurrentLocations: string[] = []

    separateLines.forEach((inntruction) => {
        let splits = inntruction.split(' ')
        if (splits[0][2] === 'A') {
            ghostsCurrentLocations.push(splits[0])
        }
        map.set('L' + splits[0], splits[1])
        map.set('R' + splits[0], splits[2])
    })

    let ghostLoops: { firstTime: number, numberOfSteps: number, instructionWhenFound: number }[] = []
    let ghostPatterns: number[] = [];

    for (let index = 0; index < ghostsCurrentLocations.length; index++) {

        let currentInstruction = 0
        let steps = 0
        let whenTheGhostFoundTheWay: { firstTime: number, numberOfSteps: number, instructionWhenFound: number } = { firstTime: 0, numberOfSteps: 0, instructionWhenFound: 0 }
        let isGhostLost = true

        while (isGhostLost) {
            ghostsCurrentLocations[index] = map.get(instructions[currentInstruction] + ghostsCurrentLocations[index])
            steps++
            if (ghostsCurrentLocations[index][2] === 'Z') {
                if (whenTheGhostFoundTheWay.firstTime === 0) {
                    whenTheGhostFoundTheWay.firstTime = steps
                    whenTheGhostFoundTheWay.instructionWhenFound = currentInstruction
                }
                else if (whenTheGhostFoundTheWay.instructionWhenFound === currentInstruction) {
                    isGhostLost = false
                    whenTheGhostFoundTheWay.numberOfSteps = steps - whenTheGhostFoundTheWay.firstTime

                }
            }
            if (currentInstruction < instructions.length - 1) {
                currentInstruction++
            }
            else {
                currentInstruction = 0
            }
        }
        ghostLoops.push(whenTheGhostFoundTheWay)
        ghostPatterns.push(whenTheGhostFoundTheWay.firstTime / (whenTheGhostFoundTheWay.instructionWhenFound + 1))
    }

    for (let index = 0; index < ghostPatterns.length; index++) {
        result *= ghostPatterns[index]
    }
    //they all loop at the end of the instructions so
    result *= instructions.length
    return result
}
