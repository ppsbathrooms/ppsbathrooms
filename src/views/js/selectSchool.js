schoolRedirect = $('#school').html()
pageId = $('#pageID').html()

isSchoolPage = (pageId != '404') && (pageId != 'help')

if(isSchoolPage) {
    if(schoolRedirect.replace(/\s/g, '').length) {
        selectSchool(schoolRedirect.replace(/\s/g, ""))
        $('#buttons').show(100)
    } else {
        $('.schoolChoice').css('display', 'flex');
    }
}

function selectSchool(school) {
    $(".schoolChoice").hide();

    $("#pageID").html(school);

    $('#buttons').show(100)

    if(school == 'chs') {
        $('#highlightRoomButton').show();
    }
    else {
        $('#highlightRoomButton').hide();
    }

    loadMap();

    getData();

    getDataForUpdate();

    setupButtons();

    window.history.pushState('page2', 'Title', '/' + fullSchoolName(school));
}

function fullSchoolName(school) {
    var url;
    switch(school) {
        case 'chs':
            url = 'cleveland'
            break;
        case 'fhs':
            url = 'franklin'
            break;
        case 'ihs':
            url = 'ida'
            break;
    }
    return url;
}