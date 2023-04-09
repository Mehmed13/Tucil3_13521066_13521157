const open_list = require('./open_list.js').open_list;
const Route = require('./Route.js').Route;

/*
    Fungsi untuk set nilai heuristic untuk setiap node di dalam graph, sesuai goal
    masih temporary nunggu kalau bisa menggunakan koordinat
*/
function setGraphHeuristic(graph, goal) {
    // Set heuristic untuk setiap node
    for (let i = 0; i < graph.length; i++) {
        let heuristicValue = 0;
        if (graph[i].getName() != goal) {
            if (graph[i].isNeighbour(goal)) { // Jika node adalah tetangga goal
                heuristicValue = graph[i].getNeighbourDistancebyName(goal);
            } else { // Jika node bukan tetangga goal, ambil jarak ke tetangga terdekat
                heuristicValue = graph[i].getNeighbourDistance(0);
            }
        }
        graph[i].setHeuristic(heuristicValue);
    }
}



/*
    Fungsi untuk mengecek apakah pruning diperlukan
*/
function isNeedPruning(currentRoute, newNode, closed_list) {
    // Jika closed_list kosong, maka pruning tidak diperlukan
    if (closed_list.length == 0) {
        return false;
    }

    // Jika closed_list tidak kosong, maka cek apakah ada route yang memiliki cost lebih besar dari currentRoute
    let isPruningNeeded = false;
    for (let i = 0; i < closed_list.length; i++) {
        if (closed_list[i].getCurrentNode().getName() == newNode.getName()) {
            let currentCost = currentRoute.getCost() + newNode.getHeuristic() + currentRoute.getCurrentNode().getNeighbourDistancebyName(newNode.getName());
            if (currentCost > closed_list[i].getCost()) {
                isPruningNeeded = true;
            }
            break;
        }

    }
    return isPruningNeeded;
}






/*
    prekondisi: graph sudah memiliki nilai heuristic
    Fungsi untuk menghasilkan jalur dari start ke goal menggunakan algoritma A*
    fungsi mengembalikan Route object saat sampai ke goal

*/
function runAStarAlgorithm(startNode, goal) {
    // Inisialisasi open_list, closed_list dan Route
    let open_list = new PrioQueue();
    let closed_list = [];
    let route = new Route(startNode, [], 0);

    // Masukkan route ke dalam open_list
    open_list.enqueue(route, route.getCost());

    // Lakukan perulangan sampai open_list kosong atau sampai goal ditemukan
    while (!open_list.isEmpty()) {
        // Ambil route dengan cost terkecil
        let currentRoute = open_list.dequeue();
        closed_list.push(currentRoute);
        let currentNode = currentRoute.getCurrentNode();

        // Jika currentNode adalah goal, maka return currentRoute
        if (currentNode.getName() == goal) {
            return currentRoute;
        }

        // Jika currentNode bukan goal, maka expand currentNode
        let neighbours = currentNode.getNeighbours();
        for (let i = 0; i < neighbours.length; i++) {
            let neighbour = neighbours[i][0];
            let neighbourName = neighbour.getName();

            // Jika neighbour belum pernah dilewati
            if (!currentRoute.isPathExist(neighbourName)) {

                // Jika neighbour belum pernah dikunjungi atau pruning tidak diperlukan
                if (!isNeedPruning(currentRoute, neighbour, closed_list)) {
                    let newRoute = new Route(neighbour, currentRoute.getPath(), currentRoute.getCost());
                    newRoute.addPath(neighbourName);
                    newRoute.addCost(neighbour.getNeighbourDistancebyName(currentNode.getName()) + neighbour.getHeuristic());
                    open_list.enqueue(newRoute, newRoute.getCost());
                }
            }
        }
    }
}