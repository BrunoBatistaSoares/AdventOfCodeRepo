export function D6P1(input: string) {
    let result = 1;
    let separateLines = input.split(/\r?\n/g);
    console.log(separateLines);
    let processedLines: string[][] = []
    separateLines.forEach((a, index) => {
        processedLines[index] = a.split(/\ +/g)
    })
    processedLines[0].shift()
    processedLines[1].shift()

    processedLines[0].forEach((maximunTime, index) => {
        result *= solve(-1, parseInt(maximunTime), -parseInt(processedLines[1][index]))
    });
    return result
}

function solve(a: number, b: number, c: number) {
    console.log(a + " " + b + " " + c);

    let result = (-1 * b + Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);
    let result2 = (-1 * b - Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);
    console.log(result);
    console.log(result2);


    let finalResult: number[] = []
    if (result > 0) {
        finalResult.push(Math.floor(result) + 1)
    }
    if (result2 > 0) {
        finalResult.push(Math.ceil(result2))
    }
    let aux = finalResult[1] - finalResult[0]
    console.log(aux);

    return aux
}