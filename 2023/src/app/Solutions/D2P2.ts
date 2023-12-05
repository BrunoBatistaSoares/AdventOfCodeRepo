export function D2P2(input: string) {
    let result = 0;
    let separateLines = input.split(/\r?\n/g);
    separateLines.forEach((line) => {
        console.log(line);
        line = line.slice(5)
        let id = parseInt(line.split(':')[0])
        line = line.split(': ')[1]
        console.log(line);
        let sets = line.split('; ')
        let minG = 0, minR = 0, minB = 0;
        sets.forEach((set) => {

            let separateSet = set.split(', ')
            separateSet.forEach((colorCount) => {
                let count = parseInt(colorCount.split(' ')[0])
                let color = colorCount.split(' ')[1]
                console.log(count);
                console.log(color);
                console.log(minR);

                if (color === 'red' && count > minR) {
                    console.log('!');
                    minR = count;
                }
                else if (color === 'green' && count > minG) {
                    console.log('!');
                    minG = count
                }
                else if (color === 'blue' && count > minB) {
                    console.log('!');
                    minB = count
                }
            })


        })
        result += minB * minG * minR
    })
    return result
}