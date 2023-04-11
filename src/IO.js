const fs = require('fs');
const Node = require('./Node.js').Node;
const Coordinate = require('./Coordinate.js').Coordinate;
/*
    FORMAT FILE INPUT

    Terdapat dummy elemen baris 0 kolom 0 yang berisi string bernama "Simpul"
    Nama simpul terletak di kolom pertama dan baris pertama
    Nilai jarak antar simpul terletak di kolom ke-i dan baris ke-j, i != 0 dan j != 0
    setiap elemen matriks dalam satu baris dipisahkan dengan koma
    setiap baris dipisahkan oleh newline (\r\n)
    baris terakhir berisi koordinat dari setiap simpul
    format koordinat adalah (x,y) dengan x dan y merupakan bilangan bulat, setiap koordinat simpul dipisahkan dengan ;
    urutan koordinat sesuai urutan nama simpul

    Edge yang tidak ada ditandai dengan nilai 0

    Contoh:
    Simpul, Padang, Jakarta, Bandung, Surabaya, Medan
    Padang, 0, 1000, 2000, 3000, 4000
    Jakarta, 1000, 0, 1000, 2000, 3000
    Bandung, 2000, 1000, 0, 1000, 2000
    Surabaya, 3000, 2000, 1000, 0, 1000
    Medan, 4000, 3000, 2000, 1000, 0
    (0,0);(1000,0);(2000,0);(3000,0);(4000,0)


*/

// Fungsi untuk membaca file txt input yang berbentuk matriks ketetanggan dan mengembalikan matrix of string
function readInputFile(fileName) {
    let matrix = [];
    let text = fs.readFileSync('../test/' + fileName, { encoding: 'utf-8', flag: 'r' });

    // Ubah text menjadi array of lines
    let lines = text.split("\r\n");

    // Ubah array of lines menjadi matrix of string
    for (let i = 0; i < (lines.length - 1); i++) {
        let arrElemen = lines[i].split(",");
        arrElemen = arrElemen.map(elemen => { return elemen.trim() });
        matrix.push(arrElemen);
    }
    if (lines.length > 0) {
        matrix.push(lines[lines.length - 1].split(";"));
    }

    return matrix;
}


/* 
 Fungsi untuk membaca matrice of string dan mengembalikan informasi dari map berupa matrices of float, array of coordinates, dan array of string
 Fungsi ini juga akan mengecek apakah matriks yang dibaca adalah matriks yang valid
 Jika matriks tidak valid, maka akan melakukan throw error
 Jika matriks valid, maka akan mengembalikan matrices of float dan array of string
 Array of Coordinate merupakan array yang berisi koordinat dari setiap simpul
 Array of string merupakan array yang berisi nama dari setiap simpul
 Matrices of float merupakan matriks yang berisi nilai jarak dari setiap simpul ke setiap simpul lainnya, index sesuai index nama simpul
*/
function generateMapInfo(matrix) {
    if (matrix.length == 0) {
        throw "Matrix is empty";
    } else if (matrix.length != (matrix[0].length + 1)) {
        throw "Matrix doesn't have valid dimension";
    } else {
        // Inisialisasi variabel
        let mapInfo = [];
        let nodeNames = [];
        let adjacencyMatrix = [];
        let coordinates = [];

        // Membaca nama simpul dari matriks
        for (let i = 1; i < matrix[0].length; i++) {
            nodeNames.push(matrix[i][0]);
        }

        // Membaca matriks ketetanggan berbobot
        for (let i = 1; i < (matrix.length - 1); i++) {
            let row = [];
            for (let j = 1; j < matrix[i].length; j++) {
                row.push(parseFloat(matrix[i][j]));
            }
            adjacencyMatrix.push(row);
        }

        // Membaca koordinat dari setiap simpul
        let lastRow = matrix[matrix.length - 1];
        for (let i = 0; i < lastRow.length; i++) {
            let coordinate = lastRow[i].split(",");
            let x = parseInt(coordinate[0].substring(1));
            let y = parseInt(coordinate[1].substring(0, coordinate[1].length - 1));
            coordinates.push(new Coordinate(x, y));
        }
        // Memasukkan nama simpul dan matriks ketetanggan ke dalam mapInfo
        mapInfo.push(nodeNames);
        mapInfo.push(adjacencyMatrix);
        mapInfo.push(coordinates);

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
    let coordinates = mapInfo[2];

    // Membuat node untuk setiap simpul
    for (let i = 0; i < nodeNames.length; i++) {
        let node = new Node(nodeNames[i], 0);

        // Menambahkan tetangga ke node
        for (let j = 0; j < adjacencyMatrix[i].length; j++) {
            if (adjacencyMatrix[i][j] != 0) {
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

    // Menambahkan koordinat ke setiap node
    for (let i = 0; i < graph.length; i++) {
        graph[i].setPosition(coordinates[i].getX(), coordinates[i].getY());
    }

    return graph;
}

module.exports = { readInputFile, generateMapInfo, generateGraph, positionInGraph };