// Import class yang akan digunakan
// const Node = require('./Node.js').Node;
import { Node } from './Node.js';
// const Route = require('./Route.js').Route;
import { Route } from './Route.js';
// const IO = require('./IO.js');
import { readInputFile, generateMapInfo, generateGraph, positionInGraph } from './IO.js';
// const AStar = require('./AStar.js');
import { runAStarAlgorithm, setGraphHeuristic } from './AStar.js'

// Inisialisasi Graph dari input
let matrices = readInputFile('test2.txt');
console.log("Matrix");
console.log(matrices);
let mapInfo = generateMapInfo(matrices);
console.log("Mapinfo");
console.log(mapInfo);
let graph = generateGraph(mapInfo);
console.log(graph)

// for (let i = 0; i < graph.length; i++) {
//     console.log(graph[i].getName());
//     console.log(graph[i].getNeighbours());
// }
// Inisialisasi startNode dan goalNode
let startNode = graph[0];
let goalNode = graph[graph.length - 1];

// Set heuristic value untuk setiap node
setGraphHeuristic(graph, goalNode);


// console.log("AFTER SETTING HEURISTIC");
// for (let i = 0; i < graph.length; i++) {
//     console.log(graph[i].getName());
//     console.log(graph[i].getHeuristic());
//     console.log("===============");
//     // console.log(graph[i].getNeighbours());
// }

// Jalankan A*
let route = runAStarAlgorithm(startNode, goalNode.getName());

// Print hasil
console.log(route);