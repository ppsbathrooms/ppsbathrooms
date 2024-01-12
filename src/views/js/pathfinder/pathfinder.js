const distanceToTimeConversion = 1.0;

var bathroomNodes = [];

var cornerNodes = [];
var roomNodes = [];

var allNodes = [];
var allConnections = [];

var lineWidth = 3;

var drawSpeed;
const loopTimeMS = 5;
var intervalId = setInterval(function() {
    drawPathPeriodic();
}, loopTimeMS);

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

        if (id.startsWith("B")) {
            bathroomNodes.push(this);
        }
        else if (id.startsWith("c-") || id.startsWith("C")){
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

async function setupPathfinder() {
    // yoink node locations from svg
    var textElements = $("#svgNodes text");

    textElements.each(function () {
        var element = $(this);
        var id = element.text();

        var xPos = parseFloat(element.attr('x'));
        var yPos = parseFloat(element.attr('y'));

        new PathNode(xPos, yPos, id.toString());
    });


    // create correct connections
    if (schoolRedirect == "fhs") {
        lineWidth = 2;
        drawSpeed = 0.4;
        fhsConnections();
    }
    else if (schoolRedirect == "chs") {
        chsConnections();
        drawSpeed = 1.9;
        lineWidth = 8;
    }
    else {
        idaConnections();
        drawSpeed = 1.9;
        lineWidth = 8;
    }

    // pathfind to closest bathroom to current class
    accountData = $('#accountData').html()
    var currentClass = JSON.parse(accountData).currentClass;
    var currentClass = currentClass.toString().replace(/-/g, "").toUpperCase();
    console.log("Current Class: " + currentClass);

    if (currentClass != -1) {
        var path = pathfindToNearestBathroom(currentClass.toString());
        drawPathAnimated(path);
    }
}

function idaConnections() { }

function fhsConnections() {
    // S basement
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
    new Connection("S012", "CS02");  
    new Connection("S012", "T001");


    // SS basement
    new Connection("SS019", "SS017");
    new Connection("CSS1", "SS017");
    new Connection("CSS1", "SS016");
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
    new Connection("BB3", "CSS0");
    new Connection("SS001", "CSS0");
    new Connection("BG3", "BB3");
    new Connection("SS019", "CSS2");
    new Connection("CSS2", "CSS3");
    new Connection("CSS3", "CSS6");
    new Connection("CSS6", "T014");
    new Connection("CSS6", "SS025");
    new Connection("SS025", "SS024");
    new Connection("BB3", "BN6");
    new Connection("CSS1", "CSS4");
    new Connection("CSS4", "CSS5");
    new Connection("CSS5", "SS024");
    new Connection("CSS5", "T015");

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
    new Connection("CS12", "S145");
    new Connection("S142", "S145");
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
    new Connection("CS16", "S131");
    new Connection("CS17", "S131");
    new Connection("CS17", "S130");
    new Connection("S130", "S128");
    new Connection("S129", "S128");
    new Connection("BN4", "S128");
    new Connection("BN4", "S122");
    new Connection("S120", "S122");
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
    new Connection("S112", "S105");

    //floor 2
    new Connection("T200","S245");
    new Connection("S245","S244");
    new Connection("S244","CS201");
    new Connection("CS201","S243");
    new Connection("S243","S242");
    new Connection("S242","S241");
    new Connection("S240","BT3");
    new Connection("BT3","S239");
    new Connection("S239","S238");
    new Connection("S238","S237");
    new Connection("S237","S236");
    new Connection("S236","S235");
    new Connection("S235","S234");
    new Connection("S234","CS206");
    new Connection("CS206","T201");
    new Connection("CS206","CS200");
    new Connection("CS200","S230");
    new Connection("S230","S226");
    new Connection("S226","CS202");
    new Connection("CS202","S226");
    new Connection("S226","CS203");
    new Connection("CS203","S224");
    new Connection("CS203","S222");
    new Connection("S222","S221");
    new Connection("S221","S220");
    new Connection("S220","S219");
    new Connection("S219","CS204");
    new Connection("CS204","S218");
    new Connection("S218","S217");
    new Connection("S217","BN8");
    new Connection("BN8","CS205");
    new Connection("CS205","S215");
    new Connection("S215","S214");
    new Connection("CS204","S213");
    new Connection("S213","T202");
    new Connection("CS200","BG5");
    new Connection("BG5","BB5");
    new Connection("BB5","M218");
    new Connection("M218","CM20");
    new Connection("CM20","M210");
    new Connection("M210","M209");
    new Connection("M209","M208");
    new Connection("M208","M207");
    new Connection("M207","M206");
    new Connection("M206","M204");
    new Connection("M204","CM21");
    new Connection("CM21","T204");
    new Connection("CM20","M219");
    new Connection("M219","T211");
    new Connection("T211","M221");
    new Connection("M221","M222");
    new Connection("M222","T212");
    new Connection("T212","M223");
    new Connection("M223","CM22");
    new Connection("CM22","M233");
    new Connection("M233","M232");
    new Connection("M232","M234");
    new Connection("M234","M235");
    new Connection("M235","M236");
    new Connection("M236","M237");
    new Connection("M237","M238");
    new Connection("M238","CM23");
    new Connection("CM23","M239");
    new Connection("M239","T205");
    new Connection("CM22","M224");
    new Connection("M224","BB6");
    new Connection("BB6","BG6");
    new Connection("BG6","SS221");
    new Connection("SS221","CSS20");
    new Connection("CSS20","SS220");
    new Connection("SS220","T207");
    new Connection("CSS20","T210");

    //counseling center
    new Connection("T206","SS219");
    new Connection("SS219","CSS21");
    new Connection("CSS21","SS218");
    new Connection("CSS21","SS216");
    new Connection("SS216","CSS22");
    new Connection("CSS22","SS212");
    new Connection("SS212","CSS23");
    new Connection("CSS23","SS202");
    new Connection("CSS23","SS203");
    new Connection("SS203","SS204");
    new Connection("SS204","SS205");
    new Connection("SS205","SS206");
    new Connection("SS206","CSS24");
    new Connection("CSS24","SS207");
    new Connection("SS207","SS208");
    new Connection("SS208","CSS25");
    new Connection("SS209","CSS25");
    new Connection("SS209","SS210");
    new Connection("CSS25","SS211");
    new Connection("SS211","CSS22");

    //gym ground floor    
    new Connection("TG2","G002");
    new Connection("G002","EG1");
    new Connection("EG1","G003");
    new Connection("G003","G009");
    new Connection("G009","G004");
    new Connection("G004","CG00");
    new Connection("CG00","G005");
    new Connection("CG00","CG01");
    new Connection("CG01","BN10");
    new Connection("G006","BN10");
    new Connection("G006","G008");
    new Connection("CG01","G010");
    new Connection("G010","BB8");
    new Connection("BB8","G012");
    new Connection("G012","G013");
    new Connection("G013","BG8");
    new Connection("BB9","BG8");
    new Connection("BB9","G015");
    new Connection("G015","TG3");
    new Connection("TG3","G016");
    new Connection("G016","BB9");
    new Connection("BB9","G015");
    new Connection("G015","G017");
    new Connection("G017","G018");
    new Connection("G018","G019");
    new Connection("G019","G020");
    new Connection("G020","BG9");
    new Connection("G021","BG9");
    new Connection("G021","BG9");
    new Connection("BG9","G023");

    //gym 1st floor
    new Connection("CG11","BN9");
    new Connection("BN9","G114");
    new Connection("G113","G114");
    new Connection("G113","G111");
    new Connection("G111","CG12");
    new Connection("CG12","CG13");
    new Connection("TG1","G106");
    new Connection("G106","CG13");
    new Connection("CG13","BG7");
    new Connection("BG7","BB7");
    new Connection("CG10","BB7");
    new Connection("CG10","EG0");
    new Connection("EG0","CG11");
    new Connection("CG11","TG0");

    //gym 2nd floor
    new Connection("G203","EG2");
    new Connection("EG2","TG4");
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
    new Connection("307", "Y");
    new Connection("300", "Y");
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

        if (p == undefined)
            return;

        paths.push(p);
    });

    return selectShortestPath(paths);
}

// returns the shortest path from a list of paths
function selectShortestPath(paths) {
    var shortestTime = Infinity + 1;
    var shortestPath;

    paths.forEach(p => {
        if (p == undefined)
            return;

            if (p.walkTime < shortestTime) {
            shortestTime = p.walkTime;
            shortestPath = p;
        }
    });

    return shortestPath;
}

// based off thing i made a long time ago in cs https://github.com/LucaHaverty/hexgrid-game/blob/main/Assets/Scrips/Static/Pathfinding.cs
function findPath(startNodeId, endNodeId) {
    startNode = findNode(startNodeId);
    endNode = findNode(endNodeId);

    if (startNode == undefined || endNode == undefined)
        return;

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
            if (openSet[i].hCost + openSet[i].gCost < currentNode.hCost + currentNode.gCost || openSet[i].hCost + openSet[i].gCost == currentNode.hCost + currentNode.gCost && openSet[i].hCost < currentNode.hCost) {
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

    // reaches here if no path found
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

var pathToDraw;
var currentPathIndex;
var currentLinePercent;
var currentLineLength;

var currentNodeA;
var currentNodeB;

var currentLineID;

function drawPathPeriodic() {
    if (pathToDraw == null)
        return;

    currentLinePercent += (drawSpeed / currentLineLength) * loopTimeMS;
    currentLinePercent = Math.min(currentLinePercent, 1);

    modifyLine(currentLineID, currentNodeA.xPos, currentNodeA.yPos, 
            lerp(currentNodeA.xPos, currentNodeB.xPos, currentLinePercent),
            lerp(currentNodeA.yPos, currentNodeB.yPos, currentLinePercent));
    
    if (currentLinePercent >= 1) {
        currentPathIndex++;

        if (currentPathIndex >= pathToDraw.nodes.length) {
            bathroom = pathToDraw.nodes[pathToDraw.nodes.length - 1];
            drawCircle(bathroom.xPos, bathroom.yPos)
            pathToDraw = null;
            return;
        }

        currentLinePercent = 0;

        currentNodeA = pathToDraw.nodes[currentPathIndex-1];
        currentNodeB = pathToDraw.nodes[currentPathIndex];
        currentLineLength = getDirectDistance(currentNodeA, currentNodeB);

        currentLineID = drawLine(0,0,0,0, );
    }
}

function drawPathAnimated(path) {
    console.log("Path between " + path.nodes[0].id + " and " + path.nodes[path.nodes.length-1].id + ":");

    pathToDraw = path;

    currentPathIndex = 1;
    currentLinePercent = 0;

    currentNodeA = path.nodes[0];
    currentNodeB = path.nodes[1];
    currentLineLength = getDirectDistance(currentNodeA, currentNodeB);

    currentLineID = drawLine(0,0,0,0);
}

function drawPath(path) {
    bathroom = path.nodes[path.nodes.length - 1];
    drawCircle(bathroom.xPos, bathroom.yPos)

    console.log("CONSIDER USING drawPathAnimated() INSTEAD");
    console.log("Path between " + path.nodes[0].id + " and " + path.nodes[path.nodes.length-1].id + ":");

    for (var i = 0; i < path.nodes.length; i++) {        
        if (i == 0) 
            continue;

            drawLine(currentNodeA.xPos, currentNodeA.yPos, currentNodeA.xPos, currentNodeA.yPos);
            drawLineBetweenNodes(nodeA, nodeB);
    }
}

// draws a line connecting two nodes
function drawLineBetweenNodes(nodeA, nodeB) {
    drawLine(nodeA.xPos, nodeA.yPos, nodeB.xPos, nodeB.yPos);
}

// draws a line on the map connecting two points
function drawLine(x1, y1, x2, y2) {
    const lineID = uuidv4();

    const svgNS = "http://www.w3.org/2000/svg";
    const lineHolder = document.getElementById("lineHolder");
    
    const newLine = document.createElementNS(svgNS, "svg");
    newLine.setAttribute("width", 10000); // Add some padding for visibility
    newLine.setAttribute("height", 10000);
    
    // extend line by half of line width
    const extensionAmount = lineWidth / 2
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy) + 0.0001; // add small to avoid div by zero
    const extendedX = x2 + (dx / length) * extensionAmount;
    const extendedY = y2 + (dy / length) * extensionAmount;

    const line = document.createElementNS(svgNS, "line");

    line.setAttribute("id", lineID);
    line.setAttribute("x1", x1.toString());
    line.setAttribute("y1", y1.toString());
    line.setAttribute("x2", extendedX.toString());
    line.setAttribute("y2", extendedY.toString());
    line.setAttribute("stroke", "red");
    line.setAttribute("stroke-width", lineWidth.toString());
    
    newLine.appendChild(line);
    lineHolder.appendChild(newLine);

    return lineID;
}

function modifyLine(lineID, x1, y1, x2, y2) {
    const line = document.getElementById(lineID);

    const extensionAmount = lineWidth / 2
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy) + 0.0001; // add small to avoid div by zero
    const extendedX = x2 + (dx / length) * extensionAmount;
    const extendedY = y2 + (dy / length) * extensionAmount;

    line.setAttribute("x1", x1.toString());
    line.setAttribute("y1", y1.toString());
    line.setAttribute("x2", extendedX.toString());
    line.setAttribute("y2", extendedY.toString());
}


function drawCircle(x, y) {
    const svgNS = "http://www.w3.org/2000/svg";
    const lineHolder = document.getElementById("lineHolder");

    var circle = document.createElementNS(svgNS, 'circle');
    circle.setAttributeNS(null, 'cx', x);
    circle.setAttributeNS(null, 'cy', y);
    circle.setAttributeNS(null, 'r', lineWidth*1.2);
    circle.setAttributeNS(null, 'style', 'fill: red; stroke: none; stroke-width: 2px;' );
    lineHolder.appendChild(circle);
}

function lerp(start, end, amt){
    return (1-amt)*start+amt*end
}

  function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

// #endregion
