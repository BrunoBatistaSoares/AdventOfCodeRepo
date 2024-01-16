export function D19P1(input: string) {
    let result = 0;
    let separateInputs = input.split(/\n\n/);
    let workflows = new Map<string, string>

    separateInputs[0].split(/\n/g).forEach((workflow) => {
        let aux = workflow.split(/\{/g)
        workflows.set(aux[0], aux[1].replace('}', ''))
    })

    let parts: { x: number, m: number, a: number, s: number }[] = []

    separateInputs[1].replace(/[\{\}]/g, '').split(/\n/g).forEach((unprocessedPart) => {
        let part = { x: 0, m: 0, a: 0, s: 0 }
        unprocessedPart.split(/,/g).forEach((rating) => {
            let aux = rating.split('=')
            switch (aux[0]) {
                case 'x': part.x = parseInt(aux[1]); break;
                case 'm': part.m = parseInt(aux[1]); break;
                case 'a': part.a = parseInt(aux[1]); break;
                case 's': part.s = parseInt(aux[1]); break;
            }
        })
        parts.push(part)
    })

    parts.forEach((part) => {
        let aux = executeWorkflow('in', workflows, part)
        result += aux
        console.log(aux);

    })

    return result
}

function executeWorkflow(workflow: string, workflows: Map<string, string>, part: { x: number, m: number, a: number, s: number }): number {
    let instructions = workflows.get(workflow)?.split(/,/g)


    if (instructions !== undefined) {
        for (let index = 0; index < instructions.length - 1; index++) {
            let aux = instructions[index].split(':')
            let ratingCode = aux[0][0]
            let ruleType = aux[0][1]
            let ruleValue = parseInt(aux[0].slice(2, aux[0].length))
            let destination = aux[1]

            console.log(JSON.stringify(part));
            console.log(JSON.stringify(instructions[index]));
            console.log(JSON.stringify(ratingCode));
            console.log(JSON.stringify(ruleType));
            console.log(JSON.stringify(ruleValue));
            console.log(JSON.stringify(destination));


            switch (ratingCode) {
                case 'a':
                    if (ruleType === '>') {
                        if (part.a > ruleValue) {
                            if (destination === 'A') {
                                return part.a + part.m + part.s + part.x


                            } else if (destination === 'R') {
                                return 0
                            } else {
                                return executeWorkflow(destination, workflows, part)
                            }
                        }
                    } else {
                        if (part.a < ruleValue) {
                            if (destination === 'A') {
                                return part.a + part.m + part.s + part.x
                            } else if (destination === 'R') {
                                return 0
                            } else {
                                return executeWorkflow(destination, workflows, part)
                            }
                        }
                    }

                    break;

                case 'm':
                    if (ruleType === '>') {
                        console.log('hi');
                        console.log(JSON.stringify(part.m));
                        console.log(JSON.stringify(ruleValue));

                        if (part.m > ruleValue) {
                            console.log('hey');

                            if (destination === 'A') {
                                console.log('hello');
                                return part.a + part.m + part.s + part.x
                            } else if (destination === 'R') {
                                return 0
                            } else {
                                return executeWorkflow(destination, workflows, part)
                            }
                        }
                    } else {
                        if (part.m < ruleValue) {
                            if (destination === 'A') {
                                return part.a + part.m + part.s + part.x
                            } else if (destination === 'R') {
                                return 0
                            } else {
                                return executeWorkflow(destination, workflows, part)
                            }
                        }
                    }

                    break;

                case 'x':
                    if (ruleType === '>') {
                        if (part.x > ruleValue) {
                            if (destination === 'A') {
                                return part.a + part.m + part.s + part.x
                            } else if (destination === 'R') {
                                return 0
                            } else {
                                return executeWorkflow(destination, workflows, part)
                            }
                        }
                    } else {
                        if (part.x < ruleValue) {
                            if (destination === 'A') {
                                return part.a + part.m + part.s + part.x
                            } else if (destination === 'R') {
                                return 0
                            } else {
                                return executeWorkflow(destination, workflows, part)
                            }
                        }
                    }

                    break;

                case 's':

                    if (ruleType === '>') {
                        if (part.s > ruleValue) {
                            if (destination === 'A') {
                                return part.a + part.m + part.s + part.x
                            } else if (destination === 'R') {
                                return 0
                            } else {
                                return executeWorkflow(destination, workflows, part)
                            }
                        }
                    } else {

                        if (part.s < ruleValue) {


                            if (destination === 'A') {
                                return part.a + part.m + part.s + part.x
                            } else if (destination === 'R') {
                                return 0
                            } else {
                                return executeWorkflow(destination, workflows, part)
                            }
                        }
                    }

                    break;

                default:
                    console.log('somethign wrong');
                    break;
            }

        }
        if (instructions[instructions.length - 1] === 'A') {
            return part.a + part.m + part.s + part.x
        } else if (instructions[instructions.length - 1] === 'R') {
            return 0
        } else {
            return executeWorkflow(instructions[instructions.length - 1], workflows, part)
        }

    }
    else {
        return 0
    }
}