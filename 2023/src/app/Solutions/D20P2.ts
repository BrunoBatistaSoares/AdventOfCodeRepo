let loop: number[] = []
export function D20P2(input: string) {
    let result = 0;
    let separateInputs = input.split(/\n/g);
    let flipFlops = new Map<string, FlipFlop>
    let conjuctions = new Map<string, Conjunction>
    let moduleType = new Map<string, string>
    let broadcasterOutputs: { isHighPulse: boolean, origin: string, destination: string }[] = []

    separateInputs.forEach(element => {

        if (element[0] === 'b') {
            element.split(/\ /g).forEach((destination, index) => {
                if (index > 1) {
                    broadcasterOutputs.push({ isHighPulse: false, origin: element.split(/\ /g)[0], destination: destination.replace(',', '') })
                }
            })
        } else {
            let aux = element.replace(/\ /g, '').split('->')
            let name = aux[0].slice(1, aux[0].length)
            let destinations = aux[1].replace(/\ /g, '').split(/\,/g)

            if (element[0] === '%') {
                flipFlops.set(name, new FlipFlop(destinations))
                moduleType.set(name, 'flipFlop')
            } else {
                conjuctions.set(name, new Conjunction(destinations))
                moduleType.set(name, 'conjuction')
            }
        }

    });

    separateInputs.forEach((element) => {
        let aux = element.replace(/\ /g, '').split('->')

        aux[1].split(',').forEach((input) => {
            let conjuction = conjuctions.get(input)

            if (conjuction !== undefined) {
                if (aux[0][0] === 'b') {
                    conjuction.addInputModule(aux[0])
                } else {
                    conjuction.addInputModule(aux[0].substring(1))
                }
            }
        })

    })



    let signalQueue: { isHighPulse: boolean, origin: string, destination: string }[] = []
    let finalInputs: { name: string, loop: number, loopFound: boolean }[] = []

    for (let [key, value] of conjuctions.get('rs')!.inputs.entries()) {
        finalInputs.push({ name: key, loop: 0, loopFound: false })
    }


    console.log(finalInputs);



    for (let buttonPress = 0; true; buttonPress++) {
        broadcasterOutputs.forEach((signal) => {
            signalQueue.push(structuredClone(signal))
        })

        while (signalQueue.length > 0) {
            let signal = signalQueue[0]



            if (moduleType.get(signal.destination) === 'flipFlop') {
                flipFlops.get(signal.destination)?.processInput(signal).forEach((output) => {
                    if (output.destination === 'rx' && !output.isHighPulse) {
                        result = buttonPress
                    } else {
                        signalQueue.push(structuredClone(output))
                    }
                })
            } else {
                conjuctions.get(signal.destination)?.processInput(signal, buttonPress).forEach((output) => {
                    if (output.destination === 'rx' && !output.isHighPulse) {
                        result = buttonPress
                    } else {
                        signalQueue.push(structuredClone(output))
                    }
                    finalInputs.forEach((finalInput) => {
                        if (!finalInput.loopFound && output.destination === 'rs' && output.isHighPulse && output.origin === finalInput.name) {
                            if (finalInput.loop === 0) {
                                finalInput.loop = buttonPress
                            } else {
                                finalInput.loop = buttonPress - finalInput.loop
                                finalInput.loopFound = true
                            }
                        }
                    })

                })
            }

            let loopFound = true
            finalInputs.forEach((loop) => {
                if (!loop.loopFound) {
                    loopFound = false
                }
            })

            if (loopFound) {
                result = 1
                finalInputs.forEach((input) => {
                    result *= input.loop
                })
                return result
            }

            signalQueue.shift()
        }
    }
}

class FlipFlop {

    outputs: string[] = []
    on: boolean = false
    constructor(outputs: string[]) {
        this.outputs = structuredClone(outputs)
    }

    processInput(signal: { isHighPulse: boolean, origin: string, destination: string }): { isHighPulse: boolean, origin: string, destination: string }[] {
        if (signal.isHighPulse) {
            return []
        } else {
            this.on = !this.on
            let finalOutput: { isHighPulse: boolean, origin: string, destination: string }[] = []
            this.outputs.forEach((output) => {
                finalOutput.push({ isHighPulse: this.on, origin: signal.destination, destination: output })
            })
            return finalOutput
        }
    }

}

class Conjunction {
    inputs = new Map<string, boolean>
    inputsArray: { name: string, loop: number }[] = []
    turnedOffInputs = 0
    outputs: string[] = []
    constructor(outputs: string[]) {
        this.outputs = structuredClone(outputs)
    }

    addInputModule(module: string) {
        if (this.inputs.get(module) === undefined) {
            this.inputs.set(module, false)
            this.inputsArray.push({ name: module, loop: 0 })
            this.turnedOffInputs++
        }
    }

    processInput(signal: { isHighPulse: boolean, origin: string, destination: string }, buttonPress: number): { isHighPulse: boolean, origin: string, destination: string }[] {

        if (this.inputs.get(signal.origin) !== signal.isHighPulse) {
            this.inputs.set(signal.origin, signal.isHighPulse)
            if (signal.isHighPulse) {
                this.turnedOffInputs--
            } else {
                this.turnedOffInputs++
            }
        }

        let isOutputHigh = true
        if (this.turnedOffInputs === 0) { isOutputHigh = false }

        let finalOutput: { isHighPulse: boolean, origin: string, destination: string }[] = []

        this.outputs.forEach((output) => {
            finalOutput.push({ isHighPulse: isOutputHigh, origin: signal.destination, destination: output })
        })

        return finalOutput
    }
}