let result = 0;

export function D19P2(input: string) {

    let separateInputs = input.split(/\n\n/);
    let workflows = new Map<string, string>

    separateInputs[0].split(/\n/g).forEach((workflow) => {
        let aux = workflow.split(/\{/g)
        workflows.set(aux[0], aux[1].replace('}', ''))
    })

    let possibility: { minX: number, maxX: number, minM: number, maxM: number, minA: number, maxA: number, minS: number, maxS: number } = { minX: 1, maxX: 4000, minM: 1, maxM: 4000, minA: 1, maxA: 4000, minS: 1, maxS: 4000 }

    executeWorkflow('in', workflows, possibility)

    return result
}

function executeWorkflow(workflow: string, workflows: Map<string, string>, passedPossibility: { minX: number, maxX: number, minM: number, maxM: number, minA: number, maxA: number, minS: number, maxS: number }) {
    let possibility = structuredClone(passedPossibility)
    let instructions = workflows.get(workflow)?.split(/,/g)

    if (instructions !== undefined) {
        for (let index = 0; index < instructions.length - 1; index++) {
            let aux = instructions[index].split(':')
            let ratingCode = aux[0][0]
            let ruleType = aux[0][1]
            let ruleValue = parseInt(aux[0].slice(2, aux[0].length))
            let destination = aux[1]


            let clonedPossibility = structuredClone(possibility)
            switch (ratingCode) {
                case 'a':

                    if (ruleType === '>') {
                        possibility.maxA = ruleValue
                        clonedPossibility.minA = ruleValue + 1
                    } else {
                        clonedPossibility.maxA = ruleValue - 1
                        possibility.minA = ruleValue
                    }
                    break;
                case 'm':
                    if (ruleType === '>') {
                        possibility.maxM = ruleValue
                        clonedPossibility.minM = ruleValue + 1
                    } else {
                        clonedPossibility.maxM = ruleValue - 1
                        possibility.minM = ruleValue
                    }
                    break;
                case 's':
                    if (ruleType === '>') {
                        possibility.maxS = ruleValue
                        clonedPossibility.minS = ruleValue + 1
                    } else {
                        clonedPossibility.maxS = ruleValue - 1
                        possibility.minS = ruleValue
                    }
                    break;
                case 'x':
                    if (ruleType === '>') {
                        possibility.maxX = ruleValue
                        clonedPossibility.minX = ruleValue + 1
                    } else {
                        clonedPossibility.maxX = ruleValue - 1
                        possibility.minX = ruleValue
                    }
                    break;

                default:
                    console.log('somethign wrong');
                    break;
            }

            if (destination === 'A') {
                result += calcPossibilities(clonedPossibility)
            } else if (destination !== 'R') {
                executeWorkflow(destination, workflows, clonedPossibility)
            }
        }


        if (instructions[instructions.length - 1] === 'A') {
            result += calcPossibilities(possibility)
        } else if (instructions[instructions.length - 1] !== 'R') {
            let lastClonedPossibility = structuredClone(possibility)
            executeWorkflow(instructions[instructions.length - 1], workflows, lastClonedPossibility)
        }
    }

    function calcPossibilities(possibility: { minX: number, maxX: number, minM: number, maxM: number, minA: number, maxA: number, minS: number, maxS: number }): number {
        return (possibility.maxX - possibility.minX + 1) * (possibility.maxM - possibility.minM + 1) * (possibility.maxS - possibility.minS + 1) * (possibility.maxA - possibility.minA + 1)
    }
}