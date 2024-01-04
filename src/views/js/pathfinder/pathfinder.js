const distanceToTimeConversion = 1.0;

// technically not needed, but nice to store these somewhere in case they need to be accessed for something else
var bathroomNodes = [];

var cornerNodes = [];
var roomNodes = [];

var allNodes = [];
var allConnections = [];

// #region Structs

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

        if (id.startsWith("br-")) {
            bathroomNodes.push(this);
        }
        else if (id.startsWith("c-")){
            cornerNodes.push(this);
        }
        else {
            roomNodes.push(this);
        }
    }

    addConnection(connection) {
        this.connections.push(connection);
    }

    fCost() {
        return this.gCost + this.hCost;
    }
}

class Connection {
    nodeA;
    nodeB;
    walkTime;

    // if no custom walk time it added, it used the distance between nodes
    constructor(nodeIdA, nodeIdB, walkTime) {
        this.nodeA = findNode(nodeIdA);
        this.nodeB = findNode(nodeIdB);

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

class Path {
    constructor(nodes, walkTime) {
        this.nodes = nodes;
        this.walkTime = walkTime;
    }
}

function findNode(id) {
    for (var i = 0; i < allNodes.length; i++) {
        if (allNodes[i].id === id) {
            return allNodes[i];
        }
    }
    console.log("failed to find node");
}

// #endregion

// #region Setup

function setupPathfinder() {
    // yoink node locations from svg
    var textElements = $("#svgNodes text");
    var globalTransform = spliceTransform($("#svgNodes").attr('transform'));

    textElements.each(function () {
        var element = $(this);
        var id = element.text();

        var localTransform = spliceTransform(element.attr('transform'));

        var xPos = parseFloat(element.attr('x')) + globalTransform[0] + localTransform[0];
        var yPos = parseFloat(element.attr('y')) + globalTransform[1] + localTransform[1];
        
        //console.log(id + " " + xPos + " " + yPos);
        new PathNode(xPos, yPos, id.toString());
    });

    // connections (TODO: store in json file somewhere)
    new Connection("109", "115");
    new Connection("115", "117");
    new Connection("117", "c-0");
    new Connection("c-0", "br-g");
    new Connection("br-g", "127");
    new Connection("127", "br-b");
    new Connection("br-b", "c-1");


    var path = pathfindToNearestBathroom("109", ["br-b", "br-g"]);

    drawPath(path);
    //drawAllConnections();
}

function spliceTransform(transform) {
    const matches = transform.match(/-?\d+/g);
    return matches ? matches.map(Number) : [];
}

// #endregion

// #region Pathfinder

function pathfindToNearestBathroom(roomId, brPrefs) {
    var paths = [];
    bathroomNodes.forEach((brNode) => {
        if (brPrefs != undefined && !brPrefs.includes(brNode.id))
            return;

        var p = findPath(roomId, brNode.id); 
        paths.push(p);
    })

    return selectShortestPath(paths);
}

// returns the shortest path from a list of paths
function selectShortestPath(paths) {
    var shortestTime = Infinity + 1;
    var shortestPath;

    paths.forEach(p => {
        if (p.walkTime < shortestTime) {
            shortestTime = p.walkTime;
            shortestPath = p;
        }
    });

    return shortestPath;
}

// based off thing i made a long time ago in cs https://github.com/LucaHaverty/hexgrid-game/blob/main/Assets/Scrips/Static/Pathfinding.cs
function findPath(startNodeId, endNodeId) {
    console.log("finding path between " + startNodeId + " and " + endNodeId);

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
            return new Path(retracePath(startNode, endNode), endNode.gCost);
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

// #endregion

// #region Path Visuals & Debugging

// draws all the connections on the map for debugging
function drawAllConnections() {
    allConnections.forEach(c => {
        drawConnection(c);
    });
} 

function drawPath(path) {
    console.log("Path between " + path.nodes[0].id + " and " + path.nodes[path.nodes.length-1].id + ":");

    for (var i = 0; i < path.nodes.length; i++) {
        console.log(path.nodes[i].id);
        
        if (i == 0) 
            continue;

        drawLineBetweenNodes(path.nodes[i-1], path.nodes[i]);
    }
    path.nodes.forEach(node => {
        
    })

    // TODO: draw path

    // for (var i = 0; i < path.length; i++) {
    //     console.log(path[i].id);
    //     if (i == 0)
    //     continue;

    //     //drawLine(path[i].xPos, -path[i].yPos, path[i-1].xPos, -path[i-1].yPos);
    // }
}

// draws a connection for debugging
function drawConnection(connection) {
    drawLineBetweenNodes(connection.nodeA, connection.nodeB);
}

// draws a line connecting two nodes
function drawLineBetweenNodes(nodeA, nodeB) {
    drawLine(nodeA.xPos, nodeA.yPos, nodeB.xPos, nodeB.yPos);
}

// draws a line on the map connecting two points
function drawLine(x1, y1, x2, y2) {
    const svgNS = "http://www.w3.org/2000/svg";
    
    // Calculate the SVG dimensions based on line coordinates
    const minX = Math.min(x1, x2);
    const minY = Math.min(y1, y2);
    const maxX = Math.max(x1, x2);
    const maxY = Math.max(y1, y2);
    
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", maxX - minX + 10); // Add some padding for visibility
    svg.setAttribute("height", maxY - minY + 10);
  
    const line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", (x1 - minX + 5).toString()); // Offset x coordinates
    line.setAttribute("y1", (y1 - minY + 5).toString()); // Offset y coordinates
    line.setAttribute("x2", (x2 - minX + 5).toString()); // Offset x coordinates
    line.setAttribute("y2", (y2 - minY + 5).toString()); // Offset y coordinates
    line.setAttribute("stroke", "red");
    line.setAttribute("stroke-width", "5");
  
    svg.appendChild(line);
  
    const lineHolder = document.getElementById("lineHolder");
    lineHolder.appendChild(svg);
}

// #endregion
