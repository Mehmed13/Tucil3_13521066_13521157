// Class yang mererpresentasikan node pada graph
// Attribute:
// - name: nama node
// - heuristic: nilai heuristik dari node
// - neighbour: array yang berisi node tetangga dan jaraknya

class Node {
    constructor(name, heuristic) {
        this.name = name;
        this.heuristic = heuristic;
        this.neighbour = [];
    }

    getName() { return this.name; }
    getHeuristic() { return this.heuristic; }
    addNeighbour(node, distance) {
        if (this.neighbour.length == 0) {
            this.neighbour.push([node, distance]);
        } else {
            // Lakukan insertion sort, terurut menaik berdasarkan (jarak + heuristik)
            let i = 0;
            let found = false;
            while ((i < this.neighbour.length) && (!found)) {
                if ((this.neighbour[i][1] + this.neighbour[i][0].getHeuristic()) > (distance + node.getHeuristic())) {
                    this.neighbour.splice(i, 0, [node, distance]);
                    found = true;
                } else {
                    i++;
                }
            }
            if (!found) {
                // insert di akhir
                this.neighbour.push([node, distance]);
            }
        }
    }

    getNeighbour(i) {
        return this.neighbour[i];
    }

    getNeighbourCount() {
        return this.neighbour.length;
    }
}


module.exports = { Node };