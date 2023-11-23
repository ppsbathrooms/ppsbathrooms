schools = ['chs', 'fhs', 'ihs']
schools.forEach((school, index) => {
    fetch('html/maps/' + school + 'Map.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            $('#' + school + 'Map').html(data);
            getData(school);
            setupButtons(school);
        })
        .catch(error => {
            console.error('there was a problem fetching the document:', error);
            return null;
        });
});

function getData(school) {
    brData = $('#' + school + 'Data').html();
    brData = brData.toString().split(',');

    for (var i = 0; i < 34; i++) {
        setStatus(i, brData[i], school);
    }

    $("#svgBathrooms").show(100);
}

function setStatus(brNumber, status, school) {
    if (status == 1) {
        $('#' + school + 'Map' + ' #br' + brNumber.toString()).css({ fill: '#32A848' });
    } else if (status == 0) {
        $('#' + school + 'Map' + ' #br' + brNumber.toString()).css({ fill: '#CC2825' });
    } else {
        $('#' + school + 'Map' + ' #br' + brNumber.toString()).css({ fill: '#75B9FA' });
    }
}

function setupButtons(school) {
    for (let i = 0; i < 36 + 1; i++) {
        $("#" + school + "Map" + " #button" + i).click(function () { buttonPressed(i - 1, school); });
        $("#" + school + "Map" + " #square" + i).click(function () { buttonPressed(i - 1, school); });
    }

    $("#" + school + "Open").click(function () { updateAll(true, school); });
    $("#" + school + "Close").click(function () { updateAll(false, school); });
    $("#" + school + "Pass").click(function () { togglePass(school); });

    $("#" + school + "PasswordUpdate").click(function () { updatePass(school); });

    $("#" + school + "ChangePassword").keydown(function (e) { if (e.keyCode == 13) { updatePass(school) } });
    $('#' + school + 'ChangePassword').hide();
}

function updateAll(open, school) {
    brData = $('#' + school + 'Data').html();
    brData = brData.toString().split(',');

    brStatus = open ? 1 : 0;

    for (let i = 0; i < 36 + 1; i++) {
        setStatus(i, brStatus, school)
        if (brData[i]) {
            brData[i] = brStatus;
        }
    }
    newBrData = brData.join(',').replace(/\s/g, "");
    sendData(newBrData, school)
}

function togglePass(school) {
    targetOpacity = $('#' + school + 'ChangePassword').css('opacity') < 1 ? 1 : 0;

    $('#' + school + 'ChangePassword').animate({
        opacity: targetOpacity
    }, { duration: 200, queue: false });

    $('#' + school + 'ChangePassword').slideToggle(200);
}


function updatePass(school) {
    var currentPassword = $('#' + school + 'OldPassword').val()
    var newPassword = $('#' + school + 'NewPassword').val()


    if ((currentPassword != '') && (newPassword != '')) {
        var formData = { currentPass: currentPassword, newPass: newPassword, school: school };

        $.post("/updatePassword", {
            school: school,
            newPass: newPassword,
            currentPass: currentPassword
        }, function (data, status) {
            if (data.isCorrect) {
                $('#' + school + 'PasswordUpdate').addClass('correctPass')
                setTimeout(function () {
                    $('#' + school + 'PasswordUpdate').removeClass('correctPass');
                }, 1500);
            } else {
                $('#' + school + 'PasswordUpdate').addClass('wrongPass')
                setTimeout(function () {
                    $('#' + school + 'PasswordUpdate').removeClass('wrongPass');
                }, 500);
            }
        });
    }
    $('#' + school + 'OldPassword').val('')
    $('#' + school + 'NewPassword').val('')
    $('#' + school + 'OldPassword').focus()
}


function buttonPressed(brNumber, school) {
    brData = $('#' + school + 'Data').html();
    brData = brData.toString().split(',');

    brData[brNumber] = 1 - brData[brNumber];

    newBrData = brData.join(',').replace(/\s/g, "");
    $('#' + school + 'Data').html(newBrData)
    sendData(newBrData, school);
    setStatus(brNumber, brData[brNumber], school);
}

function sendData(values, school) {
    $.post("/bathroomUpdate", {
        values: values.replace(/\s/g, ""),
        school: school,
        confirmation: 'c2fRCdYotZ'
    });
}