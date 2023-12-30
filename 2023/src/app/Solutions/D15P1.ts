export function D15P1(input: string) {
    // input = 'rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7'
    let result = 0;
    let separateInputs = input.split(/\,/g);
    separateInputs.forEach(instruction => {
        let translation = 0
        for (let index = 0; index < instruction.length; index++) {
            translation += instruction.charCodeAt(index)
            translation *= 17
            translation = translation % 256
        }
        result += translation

    });
    return result
}