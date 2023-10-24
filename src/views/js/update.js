pageId = $('#pageID').html();
brData = $('#brData').html();
brData = brData.toString().split(',');
numDiff = 0;
originalData = [...brData];


function buttonPressed(brNumber) {
    brData[brNumber] = 1 - brData[brNumber];
    originalData[brNumber] = Number(originalData[brNumber]);

    setStatus(brNumber, brData[brNumber]);
    
    if (brData[brNumber] !== originalData[brNumber]) {
        numDiff += 1;
    } else {
        numDiff -= 1;
    }

    if ((numDiff > 0) && !$('#submitButton').is(":visible")) {
        $("#submitButton")
            .css("display", "flex")
            .fadeIn(100);

        } else if (numDiff === 0) {
        $("#submitButton").fadeOut(100);
    }

    document.getElementById("submitButton").innerHTML = '<img id="icon16" src="/style/icons/check.svg"></img> <p> ('+numDiff+')</p>';
}

function submitData() {
    // Get password
    $("#submitButton").fadeOut(100);
    var pass = prompt("ENTER PASSWORD", "")

    // Send data to server
    $(document).ready(function () {
        $.post("/bathroomReportCHS",
            {
                values: newData,
                confirmation: pass
            },
            function (data, status) {
            });
    });

    // numDiff = 0;
}

$("#highlight").fadeOut(0);
$("#triHighlight").fadeOut(0);
// Room highlighting
function highlightRoom(roomNum) {
    var roomData = roomNumToIndex(roomNum);
    if (roomData === -1)
        return false;

    // {...} makes roomData value type not reference
    var roomData = { ...roomData };

    // Apply transform
    if (roomData.r - 199 < 0) // floor 1
    {
        roomData.x = roomData.x * 3.69 - 35.42;
        roomData.y = roomData.y * 4.676 - 70.56;
    }
    else if (roomData.r - 299 < 0) // floor 2
    {
        roomData.x = roomData.x * 4.027 - 385;
        roomData.y = roomData.y * 4.06 + 65;
    }
    else if (roomData.r - 399 < 0) // floor 3
    {
        roomData.x = roomData.x * 4.08 - 385;
        roomData.y = roomData.y * 4 - 20;
    }
    roomData.w = roomData.w * 4;
    roomData.h = roomData.h * 4;
    $("#highlight").css(
        { x: roomData.x, y: roomData.y, width: roomData.w, height: roomData.h }
    );

    if (roomData.hasOwnProperty("x1")) {
        console.log("TRIGANGLE");

        document.getElementById("triHighlight")
            .setAttribute("points",
                roomData.x1.toString() + "," + roomData.y1.toString() + "," + roomData.x2.toString() + "," + roomData.y2.toString() + "," + roomData.x3.toString() + "," + roomData.y3.toString());

        $("#highlight").fadeOut(250);
        $("#triHighlight").fadeIn(250);
    }
    else {
        $("#highlight").fadeIn(250);
        $("#triHighlight").fadeOut(250);
    }
    return true;
}

function toggleBathrooms(shown) {
    if (shown) { $('#svgBathrooms, #svgButtons').fadeIn(250); }
    else { $('#svgBathrooms, #svgButtons').fadeOut(250); }
}

var notHighlighted = true;
function promptRoomHighlight() {
    if (notHighlighted) {
        var num = prompt("enter room number", "");
        let result = /^\d+$/.test(num);
        if (!result) { alert("thats not a number..."); }
        else if (num == null) { alert("no room entered"); }
        else if (!highlightRoom(num)) {
            alert("cound not find room " + num);
            return;
        }
        else {
            notHighlighted = false;
            removeHighlight = document.getElementById("highlightRoomButton");
            removeHighlight.innerHTML = "<img id='icon16' src='style/icons/x.svg'>";
            toggleBathrooms(false);
        }
    }
    else {
        notHighlighted = true;
        document.getElementById("highlightRoomButton").innerHTML = "<img id='icon16' src='style/icons/find.svg'>";
        $("#cancelHighlightButton").fadeOut(100);
        $("#highlight").fadeOut(250);
        $("#triHighlight").fadeOut(250);
        toggleBathrooms(true);
    }
}

function submitFeedback() {
    var feedback = prompt("enter feedback", "");
    if (feedback === "")
        return;

    // Send data to server
    $(document).ready(function () {
        $.post("/sendfeedback",
            {
                feedback: feedback,
            },
            function (data, status) {
            });
    });
    alert("Thank you for helping us improve ppsbathrooms!")
}

    switch(pageId) {
        case 'chs':
            numBathrooms = 14;
            break;
        case 'fhs':
            numBathrooms = 35;
            break;
        case 'ihs':
            numBathrooms = 5;
            break;
    }

//buttons
for (let i = 0; i < numBathrooms + 1; i++) {
    $("#button" + i).click(function() {buttonPressed(i-1);});
    $("#square" + i).click(function() {buttonPressed(i-1);});
}


$("#feedbackButton").click(function() {
    submitFeedback();
});

$("#highlightRoomButton").click(function() {
    promptRoomHighlight();
});

$("#submitButton").click(function() {
    submitData();
});