const schedule = $('#schedule').html().split(',');

var currentSchool = $('#schoolSelect').val();

$(document).ready(function () {
    for (var i = 0; i < schedule.length; i++) {
        $('#period' + (i + 1) + ' input').val(schedule[i]);
    }
});


$('.scheduleContainer input').keypress(function (event) {
    if (event.which === 13) {
        $('#updateSchedule').click();
    }
});

$('#updateSchedule').click(e => {
    $.getJSON('/data/rooms.json', function(data) {            
        switch(currentSchool) {
            case 'cleveland': 
                roomNums = data.cleveland;
                break;
            case 'franklin': 
                roomNums = data.franklin;
                break;
            case 'ibw': 
                roomNums = data.ibw;
                break;
        }

        const enteredRooms = [
            $('#period1 input'),
            $('#period2 input'),
            $('#period3 input'),
            $('#period4 input'),
            $('#period5 input'),
            $('#period6 input'),
            $('#period7 input'),
            $('#period8 input')
        ];

        var isValid = true;

        for (var i = 0; i < enteredRooms.length; i++) {
            if (roomNums.indexOf(enteredRooms[i].val()) === -1) {
                var inputBg = enteredRooms[i].closest('.inputBg');
                inputBg.addClass('redButton');

                setTimeout(function (element) {
                    element.removeClass('redButton');
                }, 1500, inputBg);

                isValid = false;
            } else {
                enteredRooms[i].closest('.inputBg').removeClass('redButton');
            }
        }

        if (isValid) {
            $('#scheduleError').css('opacity', '0');
            buttonHighlight('#updateSchedule', true);

            const schedule = {
                1: enteredRooms[0].val(),
                2: enteredRooms[1].val(),
                3: enteredRooms[2].val(),
                4: enteredRooms[3].val(),
                5: enteredRooms[4].val(),
                6: enteredRooms[5].val(),
                7: enteredRooms[6].val(),
                8: enteredRooms[7].val()
            };

            $.ajax({
                type: 'POST',
                url: '/updateSelf',
                data: { toUpdate: 'schedule', newValue: schedule },
                success: function (response) {
                    if (response.status < 1) {
                        failedAuth();
                    } else {
                        location.href = '/account';
                    }
                },
                error: function (xhr, status, error) {
                    console.error('AJAX request error:', status, error);
                }
            });
        } else {
            $('#scheduleError').css('opacity', '1');
            buttonHighlight('#updateSchedule', false);
        }
    });
});

function allBoxesFilled() {
    var allLengthThree = true;
  
    $('#scheduleHolder input').each(function () {
        let isnum = /^\d+$/.test($(this).val());
        var inputValue = $(this).val();
        if (inputValue.length !== 3 || isNaN(inputValue) || !isnum) {
            allLengthThree = false;
            return false;
        }
    });

    return allLengthThree;
}

function buttonHighlight(element, green) {
    $(element).removeClass('greenButton').removeClass('redButton')
    if (green) {
        $(element).addClass('greenButton')
        setTimeout(function () {
            $(element).removeClass('greenButton');
        }, 500);
    } else {
        $(element).addClass('redButton')
        setTimeout(function () {
            $(element).removeClass('redButton');
        }, 1500);
    }
}

$('#schoolSelect').on('input', function() {
    currentSchool = $(this).val();
    setupAutocomplete();
    $.ajax({
        type: 'POST',
        url: '/updateSelf',
        data: { toUpdate: 'school', newValue: $(this).val() },
        success: function (response) {},
        error: function (xhr, status, error) {
            console.error('AJAX request error:', status, error);
        }
    });
});

$('#br_prefs input').on('change', function () {
    const maleChecked = $('input[name="male"]').is(':checked');
    const femaleChecked = $('input[name="female"]').is(':checked');
    const allChecked = $('input[name="all"]').is(':checked');
    const brPrefs = {
        male: maleChecked,
        female: femaleChecked,
        all: allChecked
    };

    $.ajax({
        type: 'POST',
        url: '/updateSelf',
        data: { toUpdate: 'br_prefs', newValue: brPrefs },
        success: function (response) { },
        error: function (xhr, status, error) {
            console.error('AJAX request error:', status, error);
        }
    });
});
 
$(document).ready(function() {
    setupAutocomplete();
});

function setupAutocomplete() {
    $.getJSON('/data/rooms.json', function(data) {            
        switch(currentSchool) {
            case 'cleveland': 
                roomNums = data.cleveland;
                break;
            case 'franklin': 
                roomNums = data.franklin;
                break;
            case 'ibw': 
                roomNums = data.ibw;
                break;
        }
        $(".roomInput").autocomplete({
            source: roomNums,
            minLength: 0
        });
    });
}