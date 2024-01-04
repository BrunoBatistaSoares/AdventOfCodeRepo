export function D18P2(input: string) {
    let result = 0;
    let separateInputs = input.split(/\n/g);

    let coordinates: { dir: string, length: number }[] = []
    separateInputs.forEach(element => {
        let aux = element.split(/\ /g)
        aux[2] = aux[2].replace(/[\(\)]/g, '')
        aux[2] = aux[2].replace('#', '')

        let dir = ''
        switch (parseInt(aux[2][aux[2].length - 1])) {
            case 0: dir = 'R'; break;
            case 1: dir = 'D'; break;
            case 2: dir = 'L'; break;
            case 3: dir = 'U'; break;
        }

        let length = parseInt(aux[2].slice(0, 5), 16)
        coordinates.push({ dir: dir, length: length })

    });

    let edges: { x: number, y: number }[] = []

    coordinates.forEach((coordinate, index) => {
        let previousDir, nextDir, currentDir
        currentDir = coordinate.dir
        index === 0 ? previousDir = coordinates[coordinates.length - 1].dir : previousDir = coordinates[index - 1].dir
        index === coordinates.length - 1 ? nextDir = coordinates[0].dir : nextDir = coordinates[index + 1].dir

        let modifier = -1
        if (isClockWise(previousDir, currentDir)) { modifier++ }
        if (isClockWise(currentDir, nextDir)) { modifier++ }

        if (index === 0) {
            edges.push({ x: 0, y: 0 })
        }

        if (index < coordinates.length - 1) {
            let lastEdge = edges[index]

            switch (currentDir) {
                case 'R': edges.push({ x: lastEdge.x + coordinate.length + modifier, y: lastEdge.y }); break;
                case 'L': edges.push({ x: lastEdge.x - coordinate.length - modifier, y: lastEdge.y }); break;
                case 'D': edges.push({ x: lastEdge.x, y: lastEdge.y + coordinate.length + modifier }); break;
                case 'U': edges.push({ x: lastEdge.x, y: lastEdge.y - coordinate.length - modifier }); break;
            }
        }
    })

    edges.forEach((edge, index) => {
        let previousEdge
        if (index === 0) { previousEdge = edges.length - 1 }
        else { previousEdge = index - 1 }
        //shoelace formula
        result += (edges[previousEdge].x * edge.y) - (edge.x * edges[previousEdge].y)
    })

    result = Math.abs(result)
    result = result * 0.5

    return result
}

function isClockWise(dir1: string, dir2: string) {
    switch (dir1) {
        case 'R': if (dir2 === 'D') { return true } else return false
        case 'L': if (dir2 === 'U') { return true } else return false
        case 'U': if (dir2 === 'R') { return true } else return false
        case 'D': if (dir2 === 'L') { return true } else return false
    }

    return null
}