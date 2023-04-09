const fs = require('fs');
const Node = require('./Node.js').Node;
/*
    FORMAT FILE INPUT

    Terdapat dummy elemen baris 0 kolom 0 yang berisi string bernama "Simpul"
    Nama simpul terletak di kolom pertama dan baris pertama
    Nilai jarak antar simpul terletak di kolom ke-i dan baris ke-j, i != 0 dan j != 0
    setiap elemen matriks dalam satu baris dipisahkan dengan koma
    setiap baris dipisahkan oleh newline (\r\n)

    Edge yang tidak ada ditandai dengan nilai 999999

    Contoh:
    Simpul, Padang, Jakarta, Bandung, Surabaya, Medan
    Padang, 0, 1000, 2000, 3000, 4000
    Jakarta, 1000, 0, 1000, 2000, 3000
    Bandung, 2000, 1000, 0, 1000, 2000
    Surabaya, 3000, 2000, 1000, 0, 1000
    Medan, 4000, 3000, 2000, 1000, 0



*/

// Fungsi untuk membaca file txt input yang berbentuk matriks ketetanggan dan mengembalikan matrix of string
function readInputFile(fileName) {
    let matrix = [];
    let text = fs.readFileSync('../test/' + fileName, { encoding: 'utf-8', flag: 'r' });

    // Ubah text menjadi array of lines
    let lines = text.split("\r\n");

    // Ubah array of lines menjadi matrix of string
    for (let i = 0; i < lines.length; i++) {
        let arrElemen = lines[i].split(",");
        arrElemen = arrElemen.map(elemen => { return elemen.trim() });
        matrix.push(arrElemen);
    }


    // console.log(matrix);
    return matrix;
}


/* 
 Fungsi untuk membaca matrice of string dan mengembalikan informasi dari map berupa matrices of float dan array of string
 Fungsi ini juga akan mengecek apakah matriks yang dibaca adalah matriks yang valid
 Jika matriks tidak valid, maka akan melakukan throw error
 Jika matriks valid, maka akan mengembalikan matrices of float dan array of string
 Array of string merupakan array yang berisi nama dari setiap simpul
 Matrices of float merupakan matriks yang berisi nilai jarak dari setiap simpul ke setiap simpul lainnya, index sesuai index nama simpul
*/
function generateMapInfo(matrix) {
    console.log(typeof matrix)
    if (matrix.length == 0) {
        throw "Matrix is empty";
    } else if (matrix.length != matrix[0].length) {
        throw "Matrix is not square";
    } else {
        // Inisialisasi variabel
        let mapInfo = [];
        let nodeNames = [];
        let adjacencyMatrix = [];

        // Membaca nama simpul dari matriks
        for (let i = 1; i < matrix.length; i++) {
            nodeNames.push(matrix[i][0]);
        }

        // Membaca matriks ketetanggan
        for (let i = 1; i < matrix.length; i++) {
            let row = [];
            for (let j = 1; j < matrix[i].length; j++) {
                row.push(parseFloat(matrix[i][j]));
            }
            adjacencyMatrix.push(row);
        }

        // Memasukkan nama simpul dan matriks ketetanggan ke dalam mapInfo
        mapInfo.push(nodeNames);
        mapInfo.push(adjacencyMatrix);

        return mapInfo;
    }
}

/*
    Fungsi untuk mengecek apakah node dengan nama nodeName sudah ada di dalam graph
*/

function positionInGraph(graph, nodeName) {
    for (let i = 0; i < graph.length; i++) {
        if (graph[i].getName() == nodeName) {
            return i;
        }
    }
    return -1;
}


/*
    Fungsi untuk menghasilkan graf dari mapInfo
    graf yang dihasilkan berupa list of node dengan nilai heuristic 0 => general bisa digunakan untuk semua algoritma
*/

function generateGraph(mapInfo) {
    let graph = [];
    let nodeNames = mapInfo[0];
    let adjacencyMatrix = mapInfo[1];

    // Membuat node untuk setiap simpul
    for (let i = 0; i < nodeNames.length; i++) {
        let node = new Node(nodeNames[i], 0);

        // Menambahkan tetangga ke node
        for (let j = 0; j < adjacencyMatrix[i].length; j++) {
            if (adjacencyMatrix[i][j] != 999999) {
                // Jika node dengan nama nodeNames[j] sudah ada di dalam graph, maka tambahkan nodeNames[j] sebagai tetangga node nodenames[i] 
                let position = positionInGraph(graph, nodeNames[j]);
                if (position != -1) {
                    node.addNeighbour(graph[position], adjacencyMatrix[i][j]);
                    // Jika node i belum menjadi tetangga nodeNames[j], maka tambahkan nodeNames[i] sebagai tetangga
                    if (!graph[position].isNeighbour(nodeNames[i])) {
                        graph[position].addNeighbour(node, adjacencyMatrix[i][j]);
                    }
                }
            }
        }
        graph.push(node);
    }
    return graph;
}

/* TESTING */
// readInputFile : passed
// generateMapInfo : passed
// generateGraph : passed

// matrix = readInputFile("test1.txt");
// mapInfo = generateMapInfo(matrix);

// graph = generateGraph(mapInfo);
// // console.log(graph);
// for (let i = 0; i < graph.length; i++) {
//     console.log(graph[i].getName());
//     console.log(graph[i].getNeighbours());
// }



module.exports = { readInputFile, generateMapInfo, generateGraph, positionInGraph };