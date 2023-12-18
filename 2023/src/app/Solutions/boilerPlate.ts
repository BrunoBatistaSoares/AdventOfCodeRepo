export function DxPy(input: string) {
    let result = 0;
    let separateInputs = input.split(/\n\n/g);
    separateInputs.forEach(element => {
        console.log(element);

    });
    return result
}