const PrioQueue = require('./PrioQueue.js').PrioQueue;
const Route = require('./Route.js').Route;


/*
    Fungsi untuk menghasilkan jalur dari start ke goal menggunakan algoritma UCS
    fungsi mengembalikan Route object saat sampai ke goal, 
    jika tidak ditemukan maka akan mengembalikan route dengan path kosong
*/
function runUCSAlgorithm(startNode, goal) {
    // Inisialisasi prioQueue dan Route
    let prioQueue = new PrioQueue();
    let route = new Route(startNode, [startNode.getName()], 0);
    // Masukkan route awal ke dalam prioQueue
    prioQueue.enqueue(route);

    // Lakukan perulangan sampai prioQueue kosong
    while (!prioQueue.isEmpty()) {
        // Ambil route dengan cost terkecil
        let currentRoute = prioQueue.dequeue();
        let currentNode = currentRoute.getCurrentNode();
        currentNode.setVisited();

        // Jika currentNode adalah goal, maka return currentRoute
        if (currentNode.getName() == goal) {
            return currentRoute;
        }

        // Jika currentNode bukan goal, maka masukkan semua neighbour yang belum dikunjungi ke dalam prioQueue
        let neighbours = currentNode.getNeighbours();
        for (let i = 0; i < neighbours.length; i++) {

            let neighbour = neighbours[i][0];
            let neighbourName = neighbour.getName();

            if (!neighbour.isVisited()) {
                let newPath = JSON.parse(JSON.stringify(currentRoute.getPath()));
                let newRoute = new Route(neighbour, newPath, currentRoute.getCost());
                newRoute.addPath(neighbourName);
                newRoute.addCost(neighbour.getNeighbourDistancebyName(currentNode.getName()));
                prioQueue.enqueue(newRoute, newRoute.getCost());
            }
        }
    }
    return route;
}

module.exports = { runUCSAlgorithm };