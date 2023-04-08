// Import class yang akan digunakan
const Node = require('./Node.js').Node;
const Route = require('./Route.js').Route;

let node1 = new Node('A', 2);
let node2 = new Node('B', 3);
let node3 = new Node('C', 1);

node1.addNeighbour(node2, 5);
node1.addNeighbour(node3, 6);
let route = new Route(node2, ['A', 'B'], 5);

console.log(route.getCurrentNode().getName());
console.log(route.getPath());
console.log(route.getCost());

console.log(node3.getName());
console.log(node3.isVisited());

console.log(node1.getNeighbour(0)[0].getName());
console.log(node1.getNeighbour(0)[0].isVisited());

node1.getNeighbour(0)[0].setVisited()
console.log(node1.getNeighbour(0)[0].isVisited());

console.log(node3.getName());
console.log(node3.isVisited());