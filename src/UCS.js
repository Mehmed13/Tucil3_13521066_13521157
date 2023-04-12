// const open_list = require('./open_list.js').open_list;
const Route = require('./Route.js').Route;


// Not Checked Yet
function runUCSAlgorithm(startNode, goal) {
    let open_list = new PrioQueue();
    let closed_list = [];
    let route = new Route(startNode, [], 0);

    open_list.enqueue(route, route.getCost());
    while (!open_list.isEmpty()) {
        let currentRoute = open_list.dequeue();
        closed_list.push(currentRoute);
        let currentNode = currentRoute.getCurrentNode();

        if (currentNode.getName() == goal) {
            return currentRoute;
        }

        let neighbours = currentNode.getNeighbours();
        for (let i = 0; i < neighbours.length; i++) {
            let neighbour = neighbours[i][0];
            let neighbourName = neighbour.getName();

            if (!currentRoute.isPathExist(neighbourName)) {
                let newRoute = new Route(neighbour, currentRoute.getPath(), currentRoute.getCost());
                newRoute.addPath(neighbourName);
                newRoute.addCost(neighbour.getNeighbourDistancebyName(currentNode.getName()));
                open_list.enqueue(newRoute, newRoute.getCost());
            }
        }
    }
}