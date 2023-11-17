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

$("#highlight").hide();
$("#triHighlight").hide();

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
        createPopup('feedback', 'submit feedback');
    });

    $(document).on('click','#highlightRoomButton',function(e) {
        if (notHighlighted) {
            createPopup('highlight', 'enter room number');
        }
        else {
            notHighlighted = true;
            document.getElementById("highlightRoomButton").innerHTML = "<img id='icon16' src='style/icons/find.svg'>";
            $("#cancelHighlightButton").fadeOut(100);
            $("#highlight").fadeOut(250);
            $("#triHighlight").fadeOut(250);
            toggleBathrooms(true);
        }
    });

    $(document).on('click','#submitButton',function(e) {
        createPopup('brData', 'enter password', '#passwordInfo', '#submitButton');
    });
}

function createPopup(id, title, helpDestination, buttonsToHide) {
    $("#navbarBackground").animate({right: '-200px'}, 100);
    $("#bottomButtonNavbarShift").animate({width: 'hide'}, 100);

    $('#popupTitle').html(title);
    $('#popupId').html(id);
    $('#popupButtons').html(buttonsToHide);
    helpDestination = helpDestination ? helpDestination : '';
    $('#popupHelp').attr('href', '/help' + helpDestination)
    $('#pInput').val('')
    $("#popupError").html('');

    if(id == 'highlight') {
        $('#pInput').attr('oninput', "this.value = this.value.replace(/[^0-9]/g, '')");
        $('#pInput').attr('type', "text");
    }
    else if (id == 'brData') {
        $('#pInput').attr('type', "password");
        $('#pInput').attr('oninput', '');
    }
    else {
        $('#pInput').attr('oninput', '');
        $('#pInput').attr('type', "text");
    }

    $("#popup").css('display', 'flex');
    $(buttonsToHide).fadeOut(50);
    $("#pBackdrop").fadeIn(100);
    $('#pInput').focus();
}

$('#px').click(function (e) {
    $('#pInput').val('')
    $("#popup").fadeOut(100)
    $("#pBackdrop").fadeOut(100);
    fadeButtons = $('#popupButtons').html()
    if(fadeButtons != '') {
        $('#popupButtons').html('')
        $(fadeButtons).fadeIn(100);
    }
});

numWrong = 0;
var notHighlighted = true;

$('#popupSubmit').click(function (e) {
    const userInput = $('#pInput').val();
    if (userInput !== '') {
        switch ($('#popupId').html()) {
            case 'brData':
                $(this).attr("disabled", "disabled");

                $.post("/bathroomUpdate", {
                    values: brData,
                    school: pageID,
                    confirmation: userInput
                }, function (data, status) { // server response
                    if (data.isCorrect) {
                        $('#ppInput').val('');

                        numDiff = 0;
                        originalData = [...brData];

                        numWrong = 0;

                        $("#popup").fadeOut(100);
                        $("#pBackdrop").fadeOut(100);
                        $("#popupError").html('');
                        $("#popupError").fadeOut(100);
                    } else {
                        if(!(numWrong > 4)) {
                            $('#pInput').val('');
                            $("#popupError").html('incorrect password');
                            $("#popupError").fadeIn(100);
                            numWrong ++
                        }
                        else {
                            $("#pInputBg").hide();
                            numWrong = 0;
                        }
                    }
                });
                $(this).removeAttr("disabled");
                break;
            
            case 'feedback': 
                $(this).attr("disabled", "disabled");
                $(document).ready(function () {
                    $.post("/sendfeedback",
                        {
                            feedback: userInput,
                        },
                        function (data, status) {
                        });
                });
                $("#popup").fadeOut(100);
                $("#pBackdrop").fadeOut(100);
                $(this).removeAttr("disabled");
            break;

            case 'highlight':
                let result = /^\d+$/.test(userInput);
                console.log(result)
                if (!result) { 
                    $("#popupError").html('enter a number');
                    $("#popupError").fadeIn(100);
                }
                else if (userInput == null) { alert("no room entered"); }
                else if (!highlightRoom(userInput)) {
                    $("#popupError").html('cound not find room ' + userInput);
                    $("#popupError").fadeIn(100);
                    return;
                }
                else {
                    $("#popupError").fadeOut(100);
                    $("#popup").fadeOut(100);
                    $("#pBackdrop").fadeOut(100);
                    notHighlighted = false;
                    removeHighlight = document.getElementById("highlightRoomButton");
                    removeHighlight.innerHTML = "<img id='icon16' src='style/icons/x.svg'>";
                    toggleBathrooms(false);
                }
                break;
        }
    }
});

$('#pInput').on('keypress', function (e) {
    if(e.which === 13){
        $('#popupSubmit').click();
    }
});

$("#pInput").on("input", function() {
    if($(this).val() != '') {
        $('#popupSubmit').animate({opacity:1},25);
        $('#popupSubmit').css('cursor', 'pointer')
    }
    else {
        $('#popupSubmit').animate({opacity:0},50);
        $('#popupSubmit').css('cursor', 'default');
    }
});


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


$(document).ready(function() {
  $('#navLoginForm').submit(function(event) {
    event.preventDefault();

    var formData = $(this).serialize();

    $.ajax({
      type: 'POST',
      url: '/admin',
      data: formData,
      success: function(response) {
        if(response.accessDenied) {
            $('#navLoginForm')[0].reset();
            $('#username').focus();

            $('#navbarLoginButton').addClass('redBorder');

            setTimeout(function() {
                $('#navbarLoginButton').removeClass('redBorder');
            }, 500);
        } else {
            location.href = '/admin'
        }
        console.log(response.accessDenied);
      },
      error: function(xhr, status, error) {
        console.error('AJAX request error:', status, error);
      }
    });
  });
});