// Description: Class Route
// Attribute:
// - currentNode: node yang sedang ditempati
// - path: array yang berisi node yang sudah dilewati
// - cost: nilai cost dari rute yang sudah dilewati


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
}


module.exports = { Route };