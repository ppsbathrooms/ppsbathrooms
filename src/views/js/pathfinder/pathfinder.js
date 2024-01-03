const distanceToTimeConversion = 1.0;

class Connection {
    nodeA;
    nodeB;
    walkTime;

    // if no custom walk time it added, it used the distance between nodes
    constructor(nodeIdA, nodeIdB, walkTime) {
        this.nodeA = findNode(nodeIdA);
        this.nodeB = findNode(nodeIdB);

        console.log(this.nodeA);
        console.log(this.nodeB);

        if (walkTime) {
            this.walkTime = walkTime;
        }else {
            this.walkTime = getDirectDistance(this.nodeA, this.nodeB) * distanceToTimeConversion;
        }

        this.nodeA.addConnection(this);
        this.nodeB.addConnection(this);

        allConnections.push(this);
    }

}

class PathNode {
    xPos;
    yPos;
    id;
    connections;

    constructor(xPos, yPos, id) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.id = id;
        this.connections = [];

        this.gCost = 0;
        this.hCost = 0;
        this.fCost = 0;

        allNodes.push(this);
    }

    addConnection(connection) {
        this.connections.push(connection);
    }

    fCost() {
        return this.gCost + this.hCost;
    }
}

// technically not needed, but nice to store these somewhere in case they need to be accessed for something else
var allNodes = [];
var allConnections = [];

function findNode(id) {
    for (var i = 0; i < allNodes.length; i++) {
        if (allNodes[i].id === id) {
            return allNodes[i];
        }
    }
    console.log("failed to find node");
}

function setupPathfinder() {
    // var node1 = new PathNode(1, 0);
    // var node2 = new PathNode(2, 5);
    // var node3 = new PathNode(2, -10);
    // var node4 = new PathNode(3, -6);

    // new Connection(node1, node2);
    // new Connection(node1, node3);
    // new Connection(node4, node3);
    // new Connection(node2, node4);

    // var path = findPath(node1, node4);

    // console.log("printing path");
    // for (var i = 0; i < path.length; i++) {
    //     console.log(path[i].xPos + " " + path[i].yPos);
    // }



    //yoink node locations from svg
    var textElements = $("#svgNodes text");
    var globalTransform = spliceTransform($("#svgNodes").attr('transform'));

    textElements.each(function () {
        var element = $(this);
        var id = element.text();

        var localTransform = spliceTransform(element.attr('transform'));

        var xPos = parseFloat(element.attr('x')) + globalTransform[0] + localTransform[0];
        var yPos = parseFloat(element.attr('y')) + globalTransform[1] + localTransform[1];
        
        console.log(id + " " + xPos + " " + yPos);
        new PathNode(xPos, yPos, id.toString());
    });

    new Connection("109", "115");
    new Connection("115", "117");
    new Connection("117", "c-0");
    new Connection("c-0", "br-g");
    new Connection("br-g", "127");
    new Connection("127", "br-b");
    new Connection("br-b", "c-1");

    var path = findPath("109", "br-g");

    console.log("printing path");
    for (var i = 0; i < path.length; i++) {
        console.log(path[i].id);
    }

    // $(document).ready(function () {
    //     var textElements = $("#svgNodes text");
    
    //     textElements.each(function () {
    //         var element = $(this);
    //         console.log(element.attr('x'));
    //         console.log(element.attr('y'));
    //     });
    // });

}

function spliceTransform(transform) {
    const matches = transform.match(/-?\d+/g);
    return matches ? matches.map(Number) : [];
}

// based off thing i made a long time ago in cs https://github.com/LucaHaverty/hexgrid-game/blob/main/Assets/Scrips/Static/Pathfinding.cs
function findPath(startNodeId, endNodeId) {
    startNode = findNode(startNodeId);
    endNode = findNode(endNodeId);

    // final path 
    path = [];

    openSet = [];
    closedSet = [];

    openSet.push(startNode);

    var searchNum = 0;

    // repeat until there are no valid moves
    while (openSet.length > 0) {
        searchNum++;
        if (searchNum > 100)
            return;

        // select best node from open set to look at next
        currentNode = openSet[0];
        bestIndex = 0;

        for (var i = 1; i < openSet.length; i++) {
            if (openSet[i].hCost+openSet[i].gCost < currentNode.hCost+currentNode.gCost || openSet[i].hCost+openSet[i].gCost == currentNode.hCost+currentNode.gCost && openSet[i].hCost < currentNode.hCost) {
                currentNode = openSet[i];
                bestIndex = i;
            }
        }

        // move current tile to 
        openSet.splice(bestIndex, 1);
        closedSet.push(currentNode);

        // final node reached (yay!)
        if (currentNode == endNode) {
            return retracePath(startNode, endNode);
        }

        // look at all connected nodes
        for (var i = 0; i < currentNode.connections.length; i++) {
            var connection = currentNode.connections[i];

            // select the other node from the connection
            var connectedNode = connection.nodeA == currentNode ? connection.nodeB : connection.nodeA;
            var connectionWalkTime = connection.walkTime;

            /* 
                TODO: also continue if stairs and person needs elevator/ramp 
            */

            if (closedSet.includes(connectedNode)) {
                continue;
            }

            var totalWalkTime = currentNode.gCost + connectionWalkTime;
            
            if (!openSet.includes(connectedNode) || totalWalkTime < connectedNode.gCost) {
                connectedNode.gCost = totalWalkTime;
                connectedNode.hCost = getDirectDistance(currentNode, connectedNode);
                connectedNode.parentNode = currentNode;

                if (!openSet.includes(connectedNode))
                    openSet.push(connectedNode);
            }
        }
    }

    console.log("NO PATH FOUND BETWEEN " + startNode + " AND " + endNode);
}

// retrace the path backwards using parent nodes
function retracePath(startNode, endNode) {
    var path = [];
    var currentNode = endNode;

    while (currentNode != startNode) {
        path.push(currentNode);
        currentNode = currentNode.parentNode;
    }

    path.push(startNode);

    return path.reverse();
}

// distance from one node to the other ignoring walls
function getDirectDistance(nodeA, nodeB) {
    return  Math.sqrt(Math.pow(nodeB.xPos - nodeA.xPos, 2) + Math.pow(nodeB.yPos - nodeA.yPos, 2));
}
