export function D14P1(input: string) {
    let result = 0;
    let separateInputs = input.split(/\n/g);
    let map: string[][] = []
    separateInputs.forEach((line) => {
        map.push(Array.from(line))
    })

    console.log(map);

    for (let x = 0; x < map[0].length; x++) {
        let base = 0
        let rollingBoulders = 0
        for (let y = 0; y < map.length; y++) {
            if (map[y][x] === 'O') {
                rollingBoulders++
            }
            if (map[y][x] === '#' || y === map.length - 1) {
                for (let height = map.length - base; height > map.length - rollingBoulders - base; height--) {
                    result += height
                    console.log(x + ' ' + y + ' ' + height);

                }
                base = y + 1
                rollingBoulders = 0
            }

        }

    }


    return result
}