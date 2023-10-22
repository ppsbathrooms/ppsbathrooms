function buttonPressed(brNumber) {
    newData = getBrData();
    console.log(newData)
    newDataSingle = getBrData(brNumber);
    console.log(newDataSingle)
    switch(newDataSingle) {
        case true:
            newDataSingle = 1;
            break;
        case false:
            newDataSingle = 0;
            break;
    }

    // console.log(newDataSingle)

    newData[brNumber] = (!newDataSingle);


    // console.log(newDataSingle)


    var numDiff = 0;
    for (var i = 0; i < 14; i++) {
        if ((newData[i] != newDataSingle)) {
            numDiff++;
        }
    }
    setStatus(brNumber, newDataSingle);

    console.log(numDiff)

    var fadeSpeed = 100;
    if (numDiff > 0 && $("#submitButton").is(":hidden")) {
        $("#submitButton").fadeIn(fadeSpeed);
    } else if (numDiff == 0) {
        $("#submitButton").fadeOut(fadeSpeed);
    }
    document.getElementById("submitButton").innerHTML = "submit (" + numDiff + ")";
}

function submitData() {
    // Get password
    $("#submitButton").fadeOut(100);
    var pass = prompt("ENTER PASSWORD", "")

    // Send data to server
    $(document).ready(function () {
        $.post("/bathroomReportPostMultipleCHS",
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
            removeHighlight.innerHTML = "<img src='/icons/x.svg'>";
            toggleBathrooms(false);
        }
    }
    else {
        notHighlighted = true;
        document.getElementById("highlightRoomButton").innerHTML = "<img src='/icons/find.svg'>";
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


// $("#button1, #square1").click(function() {buttonPressed(0);});
// $("#button2, #square2").click(function() {buttonPressed(1);});
// $("#button3, #square3").click(function() {buttonPressed(2);});
// $("#button4, #square4").click(function() {buttonPressed(3);});
// $("#button5, #square5").click(function() {buttonPressed(4);});
// $("#button6, #square6").click(function() {buttonPressed(5);});
// $("#button7, #square7").click(function() {buttonPressed(6);});
// $("#button8, #square8").click(function() {buttonPressed(7);});
// $("#button9, #square9").click(function() {buttonPressed(8);});
// $("#button10, #square10").click(function() {buttonPressed(9);});
// $("#button11, #square11").click(function() {buttonPressed(10);});
// $("#button12, #square12").click(function() {buttonPressed(11);});
// $("#button13, #square13").click(function() {buttonPressed(12);});
// $("#button14, #square14").click(function() {buttonPressed(13);});


// $("#feedbackButton").click(function() {
//     submitFeedback();
// });

// $("#highlightRoomButton").click(function() {
//     promptRoomHighlight();
// });

// $("#submitButton").click(function() {
//     submitData();
// });