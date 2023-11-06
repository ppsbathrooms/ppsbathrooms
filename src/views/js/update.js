//get bathroom data
function getDataForUpdate() {
    pageID = $('#pageID').html();

    brData = $('#' + pageID + 'Data').html();
    brData = brData.toString().split(',');
    numDiff = 0;
    originalData = [...brData];
}

//bathroom update button pressed
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

//send new br status to server & reset cached data
function submitData() {
    // Get password
    $("#submitButton").fadeOut(100);
    var pass = prompt("ENTER PASSWORD", "")

    // Send data to server
    $(document).ready(function () {
        $.post("/bathroomUpdate",
            {
                values: brData,
                school: pageID,
                confirmation: pass
            },
            function (data, status) {
            });
    });

    numDiff = 0;
    originalData = [...brData];
}

$("#highlight").fadeOut();
$("#triHighlight").fadeOut();

// highlight specific room
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

    //if the room is a triangle
    if (roomData.hasOwnProperty("x1")) {
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

//toggle visibility of bathrooms
function toggleBathrooms(shown) {
    if (shown) { $('#svgBathrooms, #svgButtons').fadeIn(250); }
    else { $('#svgBathrooms, #svgButtons').fadeOut(250); }
}

//highlight rooms event
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

//submit feedback event
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

//shows bathroom update buttons
function setupButtons() {
    pageID = $('#pageID').html();

    switch(pageID) {
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

    //detect bathroom button click event
    for (let i = 0; i < numBathrooms + 1; i++) {
        $("#button" + i).click(function() {buttonPressed(i-1);});
        $("#square" + i).click(function() {buttonPressed(i-1);});
    }


    //detect bottom button click event, different detection for appended elements
    $(document).on('click','#feedbackButton',function(e) {
        submitFeedback();
    });

    $(document).on('click','#highlightRoomButton',function(e) {
        promptRoomHighlight();
    });

    $(document).on('click','#submitButton',function(e) {
        submitData();
    });
}


//menu animation stuffs

$(window).ready(function() {
    $('#mainTitle').animate({top:'0px'}, {duration: 500, easing: 'swing', queue: false});

    setTimeout(function() {
        $('#mainTitle').animate({opacity:'1'}, {duration: 750, easing: 'swing', queue: false});
    }, 50);

    setTimeout(function() {
        $('#menuSchoolButtons').animate({top:'30%'}, {duration: 650, easing: 'swing', queue: false});
    }, 150);

    setTimeout(function() {
        $('#menuSchoolButtons').animate({opacity:'1'}, {duration: 500, easing: 'swing', queue: false});
        $('#menuLabels').animate({top:'30%'}, {duration: 650, easing: 'swing', queue: false});
    }, 200);

    setTimeout(function() {
        $('#menuLabels').animate({opacity:'1'}, {duration: 750, easing: 'swing', queue: false});
    }, 250);
});