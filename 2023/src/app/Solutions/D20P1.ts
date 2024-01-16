import { elementAt } from "rxjs";

export function D20P1(input: string) {
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
            console.log(JSON.stringify(destinations));

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

    // console.log([...flipFlops.entries()]);
    // console.log([...conjuctions.entries()]);

    let aux = conjuctions.get('inv')?.inputs
    // console.log([...aux!.entries()]);






    let lowSignals = 0
    let highSignals = 0
    let signalQueue: { isHighPulse: boolean, origin: string, destination: string }[] = []

    for (let buttonPress = 0; buttonPress < 1000; buttonPress++) {
        lowSignals++
        broadcasterOutputs.forEach((signal) => {
            signalQueue.push(structuredClone(signal))
            if (signal.isHighPulse) {
                highSignals++
            } else {
                lowSignals++
            }
        })

        while (signalQueue.length > 0) {
            let signal = signalQueue[0]
            console.log(JSON.stringify(signal));
            // console.log(JSON.stringify(signalQueue));

            // console.log([...aux!.entries()]);


            if (moduleType.get(signal.destination) === 'flipFlop') {
                flipFlops.get(signal.destination)?.processInput(signal).forEach((output) => {
                    signalQueue.push(structuredClone(output))
                    if (output.isHighPulse) {
                        highSignals++
                    } else {
                        lowSignals++
                    }
                })
            } else {
                conjuctions.get(signal.destination)?.processInput(signal).forEach((output) => {
                    signalQueue.push(structuredClone(output))
                    if (output.isHighPulse) {
                        highSignals++
                    } else {
                        lowSignals++
                    }
                })
            }

            signalQueue.shift()

        }

    }


    result = lowSignals * highSignals


    // console.log(JSON.stringify([...conjuctions.entries()]));
    return result
}

class FlipFlop {

    outputs: string[] = []
    on: boolean = false
    constructor(outputs: string[]) {
        this.outputs = structuredClone(outputs)
    }

    processInput(signal: { isHighPulse: boolean, origin: string, destination: string }): { isHighPulse: boolean, origin: string, destination: string }[] {
        let isOutputHigh = false
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
    turnedOffInputs = 0
    outputs: string[] = []
    constructor(outputs: string[]) {
        this.outputs = structuredClone(outputs)
    }

    addInputModule(module: string) {
        if (this.inputs.get(module) === undefined) {
            this.inputs.set(module, false)
            this.turnedOffInputs++
        }
    }

    processInput(signal: { isHighPulse: boolean, origin: string, destination: string }): { isHighPulse: boolean, origin: string, destination: string }[] {

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