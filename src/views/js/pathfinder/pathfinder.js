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
    console.error("failed to find node: " + id);
}

// #endregion

// #region Setup

function setupPathfinder() {
    // yoink node locations from svg
    var textElements = $("#svgNodes text");
    //if ()
    //var globalTransform = spliceTransform($("#svgNodes").attr('transform'));

    textElements.each(function () {
        var element = $(this);
        var id = element.text();

        //var localTransform = spliceTransform(element.attr('transform'));

        var xPos = parseFloat(element.attr('x'))/*  + globalTransform[0] + localTransform[0] */;
        var yPos = parseFloat(element.attr('y'))/*  + globalTransform[1] + localTransform[1] */;

        // console.log("Created Node " + id);
        // console.log("Pos " + element.attr('x') + " " + element.attr('y'));
        // console.log("Global " + globalTransform[0].toString() + " " + globalTransform[1].toString());
        // console.log("Local " + localTransform[0].toString() + " " + localTransform[1].toString());
        
        //console.log(id + " " + xPos + " " + yPos);
        new PathNode(xPos, yPos, id.toString());
    });

    //var path = pathfindToNearestBathroom("109", ["br-b", "br-g"]);

    //drawPath(path);
    //drawAllConnections();
    
    //drawLine(200,100,200,200);
    //chsConnections();
    //fhsConnections();
    drawAllConnections();
}

function fhsConnections() {
    // top map left
    new Connection("BN7", "S028");
    new Connection("S028", "CS01");  
    new Connection("S027", "CS01");  
    new Connection("S027", "S026");  
    new Connection("S022", "S026");  
    new Connection("S022", "S023");  
    new Connection("S021", "S023");  
    new Connection("S021", "S020");  
    new Connection("BG4", "S020");  
    new Connection("BG4", "BB4");  
    new Connection("S017", "BB4");  
    new Connection("S017", "S016");  
    new Connection("S017", "S016");  
    new Connection("S016", "CS02");  
    new Connection("CS02", "T001");  

    // top map right
    new Connection("SS019", "SS017");
    new Connection("SS016", "SS017");
    new Connection("SS016", "SS014");
    new Connection("SS015", "SS014");
    new Connection("SS015", "SS013");
    new Connection("SS012", "SS013");
    new Connection("SS012", "SS011");
    new Connection("SS009", "SS011");
    new Connection("SS009", "SS010");
    new Connection("SS013", "SS010");
    new Connection("SS013", "SS012");
    new Connection("SS011", "SS012");
    new Connection("SS011", "SS009");
    new Connection("SS010", "SS009");
    new Connection("SS010", "T013");
    new Connection("SS008", "T013");
    new Connection("SS008", "BN6");
    new Connection("BB3", "BN6");
    new Connection("SS001", "BB3");
    new Connection("BG3", "BB3");

    // floor 1 
    new Connection("T100", "S159");
    new Connection("CS10", "S159");
    new Connection("CS10", "S157");
    new Connection("S158", "S157");
    new Connection("S158", "S155");
    new Connection("BT0", "S155");
    new Connection("BT0", "S154");
    new Connection("S153", "S154");
    new Connection("S153", "S152");
    new Connection("S151", "S152");
    new Connection("S151", "S150");
    new Connection("S149", "S150");
    new Connection("S149", "CS11");
    new Connection("T101", "CS11");
    new Connection("CS11", "CS12");
    new Connection("E10", "CS12");
    new Connection("E10", "BB0");
    new Connection("BG0", "BB0");
    new Connection("BG0", "M116");
    new Connection("M117", "M116");
    new Connection("M117", "M118");
    new Connection("CM11", "M118");
    new Connection("CM11", "M119");
    new Connection("CM11", "T112");
    new Connection("CM11", "M124");
    new Connection("CM12", "M124");
    new Connection("CM12", "CM15");
    new Connection("BT1", "CM15");
    new Connection("CM12", "BN3");
    new Connection("T108", "BN3");
    new Connection("T108", "E12");
    new Connection("CSS11", "E12");
    new Connection("CSS11", "T107");
    new Connection("CSS11", "BG1");
    new Connection("BG1", "SS110");
    new Connection("BB1", "SS110");
    new Connection("BB1", "SS104");
    new Connection("CSS11", "SS113");
    new Connection("CSS12", "SS113");
    new Connection("CSS12", "SS115");
    new Connection("SS114", "SS115");
    new Connection("CSS12", "CSS13");
    new Connection("T110", "CSS13");
    new Connection("CSS12", "SS116");
    new Connection("SS104", "CSS14");
    new Connection("T106", "CSS14");
    new Connection("SS102", "CSS14");
    new Connection("SS102", "CSS15");
    new Connection("SS101", "CSS15");
    new Connection("E13", "CSS15");
    new Connection("CM12", "M126");
    new Connection("M130", "M126");
    new Connection("M130", "M131");
    new Connection("M132", "M131");
    new Connection("M132", "M113");
    new Connection("M134", "M113");
    new Connection("M134", "BN2");
    new Connection("M153", "BN2");
    new Connection("M153", "M139");
    new Connection("M13", "M139");
    new Connection("M13", "T105");
    new Connection("BN20", "T105");
    new Connection("BN20", "M136");
    new Connection("M137", "M136");
    new Connection("M106", "M116");
    new Connection("M106", "T104");
    new Connection("CM14", "T104");
    new Connection("CM14", "M102");
    new Connection("M105", "M102");
    new Connection("CM14", "M101");
    new Connection("CS12", "S145A");
    new Connection("S142", "S145A");
    new Connection("S142", "S140");
    new Connection("S138", "S140");
    new Connection("S138", "BN5");
    new Connection("CS14", "BN5");
    new Connection("CS14", "T102");
    new Connection("S137", "T102");
    new Connection("S137", "CS15");
    new Connection("BN0", "CS15");
    new Connection("BN0", "S122");
    new Connection("S121", "S122");
    new Connection("CS15", "S135");
    new Connection("S134", "S135");
    new Connection("S134", "S133");
    new Connection("S132", "S133");
    new Connection("S132", "S131");
    new Connection("CS16", "S131");
    new Connection("CS16", "S131A");
    new Connection("CS17", "S131A");
    new Connection("CS17", "S131B");
    new Connection("S130", "S131B");
    new Connection("S130", "S128");
    new Connection("S129", "S128");
    new Connection("BN4", "S128");
    new Connection("BN4", "S122A");
    new Connection("S120", "S122A");
    new Connection("CS17", "CS18");
    new Connection("CS19", "CS18");
    new Connection("CS19", "S108");
    new Connection("S109", "S108");
    new Connection("S109", "S110");
    new Connection("E14", "CS19");
    new Connection("E14", "S103");
    new Connection("BB2", "S103");
    new Connection("BB2", "BG2");
    new Connection("T103", "BG2");
    new Connection("T103", "S105");
    new Connection("S112A", "S105");
}

function chsConnections() {
    // floor 1
    new Connection("T12", "119");
    new Connection("C10", "119");
    new Connection("C10", "125");
    new Connection("HC", "125");
    new Connection("HC", "127");
    new Connection("129", "127");
    new Connection("129", "123");
    new Connection("C11", "123");
    new Connection("C11", "T13");
    new Connection("135", "C11");
    new Connection("BB3", "C11");
    new Connection("BB3", "LR");
    new Connection("163", "LR");
    new Connection("163", "KA");
    new Connection("CF", "KA");
    new Connection("CF", "C12");
    new Connection("132", "C12");
    new Connection("132", "130");
    new Connection("116", "130");
    new Connection("C10", "117");
    new Connection("BG2", "117");
    new Connection("BG2", "115");
    new Connection("113", "115");
    new Connection("113", "109");
    new Connection("K", "109");
    new Connection("K", "106");
    new Connection("110", "106");
    new Connection("110", "CFB");
    new Connection("116", "CFB");
    new Connection("116", "120");
    new Connection("T11", "120");
    new Connection("T10", "C12");
    new Connection("T10", "CFA");

    // floor 2
    new Connection("T22", "219");
    new Connection("C20", "219");
    new Connection("C20", "225");
    new Connection("227", "225");
    new Connection("227", "233");
    new Connection("C21", "233");
    new Connection("C21", "T23");
    new Connection("C21", "235");
    new Connection("C21", "BB0");
    new Connection("263", "BB0");
    new Connection("263", "255");
    new Connection("265", "255");
    new Connection("265", "L");
    new Connection("A0", "L");
    new Connection("A0", "277");
    new Connection("266A", "277");
    new Connection("266A", "BB2");
    new Connection("C22", "BB2");
    new Connection("C22", "T20");
    new Connection("C22", "C28");
    new Connection("266", "C28");
    new Connection("266", "C27");
    new Connection("C23", "C27");
    new Connection("C23", "220");
    new Connection("T21", "220");
    new Connection("C23", "BN0");
    new Connection("218", "BN0");
    new Connection("218", "216");
    new Connection("212", "216");
    new Connection("212", "210");
    new Connection("208", "210");
    new Connection("208", "200");
    new Connection("A1", "200");
    new Connection("A1", "207");
    new Connection("209", "207");
    new Connection("209", "211");
    new Connection("213", "211");
    new Connection("213", "215");
    new Connection("BG0", "215");
    new Connection("BG0", "217");
    new Connection("C20", "217");
    new Connection("C22", "232");
    new Connection("268", "232");
    new Connection("268", "270");
    new Connection("C25", "270");
    new Connection("C25", "236");
    new Connection("C25", "234");
    new Connection("C25", "252");
    new Connection("250", "252");
    new Connection("250", "248");
    new Connection("280", "279");
    new Connection("C26", "279");
    new Connection("T24", "C26");
    new Connection("C26", "BB1");
    new Connection("BG1", "BB1");
    new Connection("BG1", "282");
    new Connection("281", "282");
    new Connection("281", "283");
    new Connection("284", "283");
    new Connection("284", "285");
    new Connection("286", "285");
    new Connection("286", "287");

    // floor 3
    new Connection("388", "387");
    new Connection("388", "387");
    new Connection("386", "387");
    new Connection("386", "385");
    new Connection("384", "385");
    new Connection("384", "383");
    new Connection("382", "383");
    new Connection("382", "381");
    new Connection("380", "381");
    new Connection("380", "BG3");
    new Connection("BB4", "BG3");
    new Connection("BB4", "378");
    new Connection("372", "378");
    new Connection("372", "356");
    new Connection("C36", "356");
    new Connection("C36", "367");
    new Connection("365", "367");
    new Connection("365", "361");
    new Connection("357", "361");
    new Connection("357", "355");
    new Connection("363", "355");
    new Connection("363", "355");
    new Connection("363", "C35");
    new Connection("337", "C35");
    new Connection("C35", "335");
    new Connection("T33", "335");
    new Connection("C35", "333");
    new Connection("BB5", "333");
    new Connection("BB5", "331");
    new Connection("329", "331");
    new Connection("329", "327");
    new Connection("BG4", "327");
    new Connection("BG4", "325");
    new Connection("C34", "325");
    new Connection("C34", "319");
    new Connection("C34", "319");
    new Connection("C34", "317");
    new Connection("315", "317");
    new Connection("315", "313");
    new Connection("311", "313");
    new Connection("311", "309");
    new Connection("307", "309");
    new Connection("307", "B");
    new Connection("300", "B");
    new Connection("300", "308");
    new Connection("306", "308");
    new Connection("306", "310");
    new Connection("312", "310");
    new Connection("312", "314");
    new Connection("320", "314");
    new Connection("320", "C33");
    new Connection("T31", "C33");
    new Connection("326", "C33");
    new Connection("326", "C30");
    new Connection("330", "C30");
    new Connection("330", "328");
    new Connection("332", "328");
    new Connection("332", "C31");
    new Connection("C32", "C31");
    new Connection("C32", "336");
    new Connection("T30", "336");
    new Connection("C32", "344");
    new Connection("368", "344");
    new Connection("368", "366");
    new Connection("370", "366");
    new Connection("370", "C36");

}

function spliceTransform(transform) {
    const matches = transform.match(/-?\d+(\.\d+)?/g);
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

    console.error("NO PATH FOUND BETWEEN " + startNode + " AND " + endNode);
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

// draws a connection for debugging
function drawConnection(connection) {
    drawLineBetweenNodes(connection.nodeA, connection.nodeB);
}

function drawPath(path) {
    console.log("Path between " + path.nodes[0].id + " and " + path.nodes[path.nodes.length-1].id + ":");

    for (var i = 0; i < path.nodes.length; i++) {
        // console.log(path.nodes[i].id);
        
        if (i == 0) 
            continue;

        drawLineBetweenNodes(path.nodes[i-1], path.nodes[i]);
    }
}

// draws a line connecting two nodes
function drawLineBetweenNodes(nodeA, nodeB) {
    drawLine(nodeA.xPos, nodeA.yPos, nodeB.xPos, nodeB.yPos);
}

// draws a line on the map connecting two points
function drawLine(x1, y1, x2, y2) {
    const svgNS = "http://www.w3.org/2000/svg";

    // offset to center
    x1 += 4;
    x2 += 4;
    y1 -= 1;
    y2 -= 1;
    
    // Calculate the SVG dimensions based on line coordinates
    const minX = Math.min(x1, x2);
    const minY = Math.min(y1, y2);
    const maxX = Math.max(x1, x2);
    const maxY = Math.max(y1, y2);
    
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", 10000); // Add some padding for visibility
    svg.setAttribute("height", 10000);
  
    const line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", x1.toString()); // Offset x coordinates
    line.setAttribute("y1", y1.toString()); // Offset y coordinates
    line.setAttribute("x2", x2.toString()); // Offset x coordinates
    line.setAttribute("y2", y2.toString()); // Offset y coordinates
    line.setAttribute("stroke", "red");
    line.setAttribute("stroke-width", "1");
  
    svg.appendChild(line);
  
    const lineHolder = document.getElementById("lineHolder");
    lineHolder.appendChild(svg);
}

// #endregion
