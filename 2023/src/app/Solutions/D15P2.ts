export function D15P2(input: string) {
    let result = 0;
    let separateInputs = input.split(/\,/g);
    let biggestLabel = 0

    let boxes = new Map<number, { seed: string, focalLenght: number }[]>;

    // });
    separateInputs.forEach(instruction => {
        let seed = instruction.split((/[-=]/))[0]
        let boxLabel = calcHASH(seed)
        let lastDigit = instruction[instruction.length - 1]
        let focalLenght = parseInt(lastDigit)
        let box = boxes.get(boxLabel)
        if (lastDigit === '-') {
            if (box !== undefined) {
                let foundIT = false
                for (let lens = 0; lens < box.length && !foundIT; lens++) {
                    if (box[lens].seed === seed) {
                        box.splice(lens, 1)
                        foundIT = true
                    }
                }
            }
        }
        else {

            if (box !== undefined) {

                let foundIT = false
                for (let lens = 0; lens < box.length && !foundIT; lens++) {

                    if (box[lens].seed === seed) {

                        box[lens].focalLenght = focalLenght
                        foundIT = true
                    }
                }
                if (!foundIT) {
                    box.push({ seed: seed, focalLenght: focalLenght })
                }
            }
            else {
                boxes.set(boxLabel, [{ seed: seed, focalLenght: focalLenght }])
                if (boxLabel > biggestLabel) {
                    biggestLabel = boxLabel
                }
            }

        }

    });
    for (let boxLabel = 0; boxLabel <= biggestLabel; boxLabel++) {
        let box = boxes.get(boxLabel)
        if (box !== undefined) {
            if (box.length > 0) {
                box.forEach((lens, index) => {
                    let focusingPower = 1 + boxLabel
                    focusingPower *= (index + 1)
                    focusingPower *= lens.focalLenght
                    result += focusingPower
                })

            }
        }

    }

    return result
}

function calcHASH(seed: string) {
    let translation = 0
    for (let index = 0; index < seed.length; index++) {
        translation += seed.charCodeAt(index)
        translation *= 17
        translation = translation % 256
    }
    return translation
}