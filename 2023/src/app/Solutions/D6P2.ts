export function D6P2(input: string) {
    let result = 1;
    let separateLines = input.replace(/[^\d\ \n]+/g, '');
    let time = separateLines.split(/\n/)[0]
    let distance = separateLines.split(/\n/)[1]
    time = time.replace(/\ /g, '')
    distance = distance.replace(/\ /g, '')
    return solve(-1, +time, -distance)
}

function solve(a: number, b: number, c: number) {
    console.log(a + " " + b + " " + c);
    let result = (-1 * b + Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);
    let result2 = (-1 * b - Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);
    let finalResult: number[] = []
    if (result > 0) {
        finalResult.push(Math.floor(result) + 1)
    }
    if (result2 > 0) {
        finalResult.push(Math.ceil(result2))
    }
    let aux = finalResult[1] - finalResult[0]
    return aux
}