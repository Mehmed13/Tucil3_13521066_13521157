// Class yang mererpresentasikan node pada graph
// Attribute:
// - name: nama node
// - heuristic: nilai heuristik dari node
// - neighbour: array yang berisi node tetangga dan jaraknya
// - visited: boolean yang menandakan apakah node sudah dikunjungi atau belum

class Node {
    constructor(name, heuristic) {
        this.name = name;
        this.heuristic = heuristic;
        this.neighbour = [];
        this.visited = false;
    }

    getName() { return this.name; }
    getHeuristic() { return this.heuristic; }
    isVisited() { return this.visited; }
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

    getNeighbours() {
        return this.neighbour;
    }

    getNeighbourNode(i) {
        return this.neighbour[i][0];
    }

    getNeighbourNodebyName(nodeName) {
        let i = 0;
        let found = false;
        while ((i < this.neighbour.length) && (!found)) {
            if (this.neighbour[i][0].getName() == nodeName) {
                found = true;
            } else {
                i++;
            }
        }
        if (found) {
            return this.neighbour[i][0];
        } else {
            return null;
        }
    }

    getNeighbourDistance(i) {
        return this.neighbour[i][1];
    }

    getNeighbourDistancebyName(nodeName) {
        let i = 0;
        let found = false;
        while ((i < this.neighbour.length) && (!found)) {
            if (this.neighbour[i][0].getName() == nodeName) {
                found = true;
            } else {
                i++;
            }
        }
        if (found) {
            return this.neighbour[i][1];
        } else {
            return null;
        }
    }

    getNeighbourCount() {
        return this.neighbour.length;
    }

    setVisited() {
        this.visited = true;
    }

    setHeuristic(heuristic) {
        this.heuristic = heuristic;
    }

    resetVisited() {
        this.visited = false;
    }

    // Method untuk mengecek apakah node memiliki tetangga dengan nama tertentu
    isNeighbour(nodeNames) {
        if (this.neighbour.length == 0) {
            return false;
        } else {
            let i = 0;
            let found = false;
            while ((i < this.neighbour.length) && (!found)) {
                if (this.neighbour[i][0].getName() == nodeNames) {
                    found = true;
                } else {
                    i++;
                }
            }
            return found;
        }
    }
}


module.exports = { Node };