class Connection {
    nodeA;
    nodeB;
    distance;

    constructor(nodeA, nodeB) {
        this.nodeA = nodeA;
        this.nodeB = nodeB;

        this.distance = Math.sqrt(Math.pow(nodeB.xPos - nodeA.xPos) + Math.pow(nodeB.yPos - nodeA.yPos));
    }
}

class Node {
    xPos;
    yPos;
    connections;

    constructor(xPos, yPos) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.connections = [];
    }

    addConnection(connection) {

    }
}

var nodes = [];
var connections = [];

function testPathfinder() {
    console.log("Test");
}
