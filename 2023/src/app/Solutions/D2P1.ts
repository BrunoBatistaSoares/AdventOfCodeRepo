export function D2P1(input: string) {
    let result = 0;
    let separateLines = input.split(/\r?\n/g);
    separateLines.forEach((line) => {
        console.log(line);
        line = line.slice(5)
        let id = parseInt(line.split(':')[0])
        line = line.split(': ')[1]
        console.log(line);

        let sets = line.split('; ')
        let doesItCount = true;
        sets.forEach((set) => {
            if (doesItCount) {
                let separateSet = set.split(', ')
                separateSet.forEach((colorCount) => {
                    if (doesItCount) {
                        console.log(colorCount);

                        let count = parseInt(colorCount.split(' ')[0])
                        let color = colorCount.split(' ')[1]
                        console.log(count);
                        console.log(color);


                        if (color === 'red' && count > 12) {
                            console.log('!');

                            doesItCount = false;
                        }
                        else if (color === 'green' && count > 13) {
                            console.log('!');
                            doesItCount = false;
                        }
                        else if (color === 'blue' && count > 14) {
                            console.log('!');
                            doesItCount = false;
                        }
                    }
                })
            }

        })
        if (doesItCount) {
            result += id
        }
    })
    return result
}