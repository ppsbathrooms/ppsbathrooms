schoolRedirect = $('#school').html()
pageId = $('#pageID').html()

if(pageId != '404') {
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

    loadMap();

    getData();

    getDataForUpdate();

    setupButtons();

    window.history.pushState('page2', 'Title', '/' + fullSchoolName(school));
}

// if(pageId = 'schools') {
//     console.log(pageId)
//     $('#buttons').hide()
// } else {
// }

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