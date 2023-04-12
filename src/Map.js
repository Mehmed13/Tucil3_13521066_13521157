import { runAStarAlgorithm, setGraphHeuristic } from './AStar.js';
import { runUCSAlgorithm } from './UCS.js';
import { generateGraph, generateMapInfo } from './IO.js';
import { matrixData } from './IO.js';

export var map = L.map('map').setView([-6.89140361736227, 107.61032928111902], 17);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

export var markers = [];
export var paths = [];
export var pair = [];
export var algo = "UCS";
export var mode = "Add";
export var idMarker = 0;

export function toggleUCS(e) {
    algo = "UCS";
    console.log(algo);
}
export function toggleAStar(e) {
    algo = "A*";
    console.log(algo);
}
export function toggleAdd(e) {
    mode = "Add";
    pair.length = 0;
    console.log(mode);
}
export function togglePath(e) {
    mode = "Path";
    console.log(mode);
}
export function toggleDelete(e) {
    mode = "Delete";
    pair.length = 0;
    console.log(mode);
}
export function toggleSearch() {
    mode = "Search";
    pair.length = 0;
    console.log(mode);
}

export function addMarker(lat, lng, id = idMarker) {
    var marker = L.marker([lat, lng], {
        name: id.toString(),
        title: id.toString()
    })
    marker.addTo(map);
    marker.on('click', onMarkerClick);
    markers.push(marker);
    idMarker++;
}

export function removeMarker(target) {
    for (var i = 0; i < markers.length; i++) {
        if (target == markers[i]) {
            markers.splice(i, 1);
            map.removeLayer(target);
        }
    }
}


export function addPath(marker1, marker2) {
    var polyline = L.polyline([marker1.getLatLng(), marker2.getLatLng()], { color: 'yellow' }).addTo(map);
    polyline.on('click', onLineClick);
    var length = (marker1.getLatLng()).distanceTo(marker2.getLatLng());
    var center = polyline.getCenter();
    // Create a DivIcon with text content
    var textIcon = L.divIcon({
        className: 'text-icon',
        html: length.toFixed(2),
    });
    // Create a marker with the text icon and add it to the map at the polyline's center
    var lengthDisplay = L.marker(center, { icon: textIcon }).addTo(map);

    paths.push({ 'markers': [marker1, marker2], 'length': length.toFixed(2), 'line': polyline, 'lengthDisplay': lengthDisplay })
}

export function removePath(target) {
    for (var i = 0; i < paths.length; i++) {
        if (target == paths[i].line) {
            // console.log("deleted");
            map.removeLayer(target);
            map.removeLayer(paths[i].lengthDisplay);
            paths.splice(i, 1);
            break;
        }
    }
}

export function onMapClick(e) {
    if (mode == "Add") {
        addMarker(e.latlng.lat, e.latlng.lng, idMarker);
    }
}

export function onMarkerClick(e) {
    if (mode == "Path") {

        if (pair.length == 0) {
            pair.push(e.target);
        } else if (pair.length == 1) {
            if (e.target != pair[0]) {
                pair.push(e.target);
            }
        }

        if (pair.length == 2) {
            addPath(pair[0], pair[1]);
            pair.length = 0;
        }
    } else if (mode == "Delete") {
        removeMarker(e.target);
    } else if (mode == "Search") {
        if (pair.length == 0) {
            pair.push(e.target);
        } else if (pair.length == 1) {
            if (e.target != pair[0]) {
                pair.push(e.target);
                routeColoring();
                pair.length = 0;
            }
        }
    }
}

export function onLineClick(e) {
    if (mode == "Delete") {
        removePath(e.target);
    }
}

export function resetMapState() {
    markers.length = 0;
    paths.length = 0;
    pair.length = 0;
    idMarker = 0;
    map.eachLayer(function (layer) {
        if (!(layer instanceof L.TileLayer)) {
            map.removeLayer(layer);
        }
    });
}

export function generateMapMatrix() {
    var matrix = []
    var names = []
    const hashmapIdx = new Map();
    // console.log("Start mapping")
    for (var i = 0; i <= markers.length; i++) {
        if (i == 0) {
            names.push("Simpul");
        } else {
            names.push(markers[i - 1].options.name);
            hashmapIdx.set(markers[i - 1].options.name, i);
        }
    }
    // console.log(names);
    // console.log(markers);
    // console.log(paths);
    // console.log(matrix);

    // Initialize matrix
    for (var i = 0; i < names.length; i++) {
        matrix.push(names.slice());
        if (i != 0) {
            for (var j = 0; j < names.length; j++) {
                if (j == 0) {
                    matrix[i][0] = matrix[0][i];
                } else {
                    matrix[i][j] = '0';
                }
            }
        }
    }
    // console.log(matrix);

    for (var i = 0; i < paths.length; i++) {
        var idxMarker1 = hashmapIdx.get(paths[i].markers[0].options.name);
        var idxMarker2 = hashmapIdx.get(paths[i].markers[1].options.name);
        console.log(idxMarker1, idxMarker2);
        matrix[idxMarker1][idxMarker2] = paths[i].length.toString();
        matrix[idxMarker2][idxMarker1] = paths[i].length.toString();
    }

    // console.log(matrix);
    var coordinates = []
    for (var i = 0; i < markers.length; i++) {
        coordinates.push(`(${markers[i].getLatLng().lat},${markers[i].getLatLng().lng})`)
    }
    matrix.push(coordinates.slice());
    // console.log(matrix);
    return matrix;
}

export function saveFileMap() {
    var matrix = generateMapMatrix();
    var text = "";
    for (var i = 0; i < matrix.length; i++) {
        var first = true;
        for (var el of matrix[i]) {
            if (first) {
                first = false;
            } else if (i != matrix.length - 1) {
                text += ", ";
            } else {
                text += ";";
            }
            text += el;
        }
        if (i != matrix.length - 1) {
            text += "\r\n";
        }
    }
    var filename = "mapfile.txt";
    var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    var url = window.URL.createObjectURL(blob);
    var element = document.createElement('a');
    element.setAttribute('href', url);
    element.setAttribute('download', filename);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    window.URL.revokeObjectURL(url);
}

export function plotToMap() {
    // console.log(matrixData);
    resetMapState();
    var mapInfo = generateMapInfo(matrixData);
    var nodeNames = mapInfo[0];
    var adjacencyMatrix = mapInfo[1];
    var coordinates = mapInfo[2];
    for (var i = 0; i < nodeNames.length; i++) {
        addMarker(coordinates[i].getX(), coordinates[i].getY(), nodeNames[i]);
    }
    console.log(nodeNames);
    console.log(adjacencyMatrix);
    for (var i = 0; i < nodeNames.length; i++) {
        for (var j = i + 1; j < nodeNames.length; j++) {
            if (adjacencyMatrix[i][j] != 0) {
                for (var el of markers) {
                    if (el.options.name == nodeNames[i] || el.options.name == nodeNames[j]) {
                        pair.push(el);
                    }
                }
                addPath(pair[0], pair[1]);
                pair.length = 0;
            }
        }
    }

}

export function routeColoring() {
    resetColoring();
    var matrixMap = generateMapMatrix();
    var mapInfo = generateMapInfo(matrixMap);
    var graph = generateGraph(mapInfo);
    console.log(mapInfo);
    for (var i = 0; i < graph.length; i++) {
        if (pair[0].options.name == graph[i].getName()) {
            var startNode = graph[i];
        }
    }
    for (var i = 0; i < graph.length; i++) {
        if (pair[1].options.name == graph[i].getName()) {
            var goalNode = graph[i];
        }
    }

    if (algo == "A*") {
        setGraphHeuristic(graph, goalNode);
        var route = runAStarAlgorithm(startNode, goalNode.getName());
    } else if (algo == "UCS") {
        var route = runUCSAlgorithm(startNode, goalNode.getName());
    }

    if (route.path.length <= 1) {
        alert("No path found.");
    } else {
        console.log(route);
        console.log(paths);
        for (var i = 0; i < route.path.length - 1; i++) {
            for (var p of paths) {
                if ((route.path[i] == p.markers[0].options.name && route.path[i + 1] == p.markers[1].options.name) ||
                    (route.path[i] == p.markers[1].options.name && route.path[i + 1] == p.markers[0].options.name)) {
                    p.line.setStyle({ color: 'red' });
                }
            }
        }
        var popup = L.popup()
            .setLatLng(pair[1].getLatLng())
            .setContent(`Distance from node ${startNode.getName()} to node ${goalNode.getName()} = ${route.cost} meters.`)
            .openOn(map);
    }

}

export function resetColoring() {
    for (var p of paths) {
        p.line.setStyle({ color: 'yellow' });
    }
}

map.on('click', onMapClick);

// export { toggleUCS, toggleAStar, toggleAdd, togglePath, toggleDelete, toggleSearch, addMarker, removeMarker, addPath, removePath, onMapClick, onMarkerClick, onLineClick, resetMapState, generateMapMatrix, saveFileMap, plotStringToMap, routeColoring }
