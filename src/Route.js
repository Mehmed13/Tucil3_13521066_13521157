// Description: Class Route
// Attribute:
// - currentNode: node yang sedang ditempati/ expandNode
// - path: array yang berisi nodeName yang sudah dilewati
// - cost: nilai cost dari rute yang sudah dilewati menuju currentNode


class Route {
    constructor(node, path, cost) {
        this.currentNode = node;
        this.path = path;
        this.cost = cost;
    }

    getCurrentNode() { return this.currentNode; }
    getPath() { return this.path; }
    getCost() { return this.cost; }
    addPath(nodeName) {
        this.path.push(nodeName);
    }
    addCost(cost) {
        this.cost += cost;
    }

    isPathExist(nodeName) {
        let i = 0;
        let found = false;
        while ((i < this.path.length) && (!found)) {
            if (this.path[i] == nodeName) {
                found = true;
            } else {
                i++;
            }
        }
        return found;
    }

}


// module.exports = { Route };
export { Route };