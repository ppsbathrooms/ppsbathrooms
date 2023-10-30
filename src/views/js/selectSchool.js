schoolRedirect = $('#school').html()
console.log(schoolRedirect)
if(schoolRedirect.replace(/\s/g, '').length) {
    selectSchool(schoolRedirect.replace(/\s/g, ""))
} else {
    $('.schoolChoice').css('display', 'flex');
}

function selectSchool(school) {
    $(".schoolChoice").hide();

    $("#pageID").html(school);

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