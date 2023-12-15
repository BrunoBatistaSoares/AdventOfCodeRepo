export function D11P2(input: string) {
    let totalDistance = 0;
    let separateLines = input.split(/\r?\n/g);
    let expandingLines: boolean[] = Array(separateLines.length).fill(true)
    let expandingColumns: boolean[] = Array(separateLines[0].length).fill(true)
    let galaxies: { x: number, y: number }[] = []


    for (let line = 0; line < separateLines.length; line++) {
        for (let index = 0; index < separateLines[line].length; index++) {
            if (separateLines[line][index] === '#') {
                galaxies.push({ x: index, y: line })
                expandingColumns[index] = false
                expandingLines[line] = false
            }
        }
    }

    for (let galaxy = 0; galaxy < galaxies.length; galaxy++) {
        for (let otherGalaxie = galaxy + 1; otherGalaxie < galaxies.length; otherGalaxie++) {

            let voidExpansions = 0
            let verticalDistance = Math.abs(galaxies[galaxy].y - galaxies[otherGalaxie].y)
            let smallestY = 0;
            (galaxies[galaxy].y <= galaxies[otherGalaxie].y) ? smallestY = galaxies[galaxy].y : smallestY = galaxies[otherGalaxie].y;
            for (let index = smallestY + 1; index <= verticalDistance + smallestY; index++) {
                if (expandingLines[index]) {
                    voidExpansions++
                    console.log('expanded');
                }
            }

            let horizontalDistance = Math.abs(galaxies[galaxy].x - galaxies[otherGalaxie].x)
            let smallestX = 0;
            if (galaxies[galaxy].x <= galaxies[otherGalaxie].x) {
                smallestX = galaxies[galaxy].x
            } else {
                smallestX = galaxies[otherGalaxie].x;
            }
            for (let index = smallestX + 1; index <= horizontalDistance + smallestX; index++) {
                if (expandingColumns[index]) {
                    voidExpansions++
                    console.log('expanded');
                }
            }
            let galaxiesDistance = (999999 * voidExpansions) + verticalDistance + horizontalDistance
            console.log(JSON.stringify(galaxies[galaxy]));
            console.log(JSON.stringify(galaxies[otherGalaxie]));
            console.log(galaxiesDistance);


            totalDistance += galaxiesDistance

        }
    }



    return totalDistance
}