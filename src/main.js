// Import class yang akan digunakan
const Node = require('./Node.js').Node;
const Route = require('./Route.js').Route;

let node1 = new Node('A', 2);
let node2 = new Node('B', 3);
let node3 = new Node('C', 4);
let route = new Route(node2, ['A', 'B'], 5);

console.log(route.getCurrentNode().getName());
console.log(route.getPath());
console.log(route.getCost());