// Import class yang akan digunakan
const Node = require('./Node.js').Node;
const Route = require('./Route.js').Route;
const IO = require('./IO.js');
const AStar = require('./AStar.js');

// Inisialisasi Graph dari input
let matrices = IO.readInputFile('test2.txt');
let mapInfo = IO.generateMapInfo(matrices);
let graph = IO.generateGraph(mapInfo);

// for (let i = 0; i < graph.length; i++) {
//     console.log(graph[i].getName());
//     console.log(graph[i].getNeighbours());
// }
// Inisialisasi startNode dan goalNode
let startNode = graph[0];
let goalNode = graph[graph.length - 1];

// Set heuristic value untuk setiap node
AStar.setGraphHeuristic(graph, goalNode);


// console.log("AFTER SETTING HEURISTIC");
// for (let i = 0; i < graph.length; i++) {
//     console.log(graph[i].getName());
//     console.log(graph[i].getHeuristic());
//     console.log("===============");
//     // console.log(graph[i].getNeighbours());
// }

// Jalankan A*
let route = AStar.runAStarAlgorithm(startNode, goalNode.getName());

// Print hasil
console.log(route);