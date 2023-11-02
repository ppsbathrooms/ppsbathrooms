schoolRedirect = $('#school').html()
pageId = $('#pageID').html()

isSchoolPage = (pageId != '404') && (pageId != 'help')

//redirect school pages
if(isSchoolPage) {
    if(schoolRedirect.replace(/\s/g, '').length) {
        selectSchool(schoolRedirect.replace(/\s/g, ""), true)
        $('#buttons').show(100)
    } else {
        $('.schoolChoice').css('display', 'flex');
    }
}

//go to school page
function selectSchool(school, redirect) {
    document.title = "ppsbathrooms | " + schoolNameConvert(school, false) 
    $(".schoolChoice").hide();

    $("#pageID").html(school);

    $('#buttons').show(100)

    if(school == 'chs') {
        $('#highlightRoomButton').show();
    }
    else {
        $('#highlightRoomButton').hide();
    }

    $('#footer').css('position', 'static');

    loadMap();

    getData();

    getDataForUpdate();

    setupButtons();

    if(redirect) {
        window.history.pushState('page2', 'Title', '/' + schoolNameConvert(school, false));
    }
    
    currentSchool = window.location.href.toString().split(window.location.host)[1]
}

//current webpage
var currentSchool = window.location.href.toString().split(window.location.host)[1]

//on forward/backward button check if new webpage is different and if it is change displayed map / hide it
window.onpopstate=function()
{
    newSchool = window.location.href.toString().split(window.location.host)[1];
    isSchoolPickPage = (newSchool == '/') ? true: false;
    if(isSchoolPickPage) {
        $("#pageID").html('school');
        $('.map').html('');
        $('.schoolChoice').css('display', 'flex');
        $('#footer').css('position', 'absolute');
        $('#buttons').hide(100)
        currentSchool = '/';
    }
    else if(newSchool != currentSchool) {
            justSchool = window.location.href.toString().split(window.location.host)[1].replace(/\//g,'')
            selectSchool(schoolNameConvert(justSchool, true), false)
    }
}

//convert school name
    //true -> to abbreviated
    //false -> to full
function schoolNameConvert(school, abbreviated) {
    var url;
    if(abbreviated) {
        switch(school) {
            case 'cleveland':
                url = 'chs'
                break;
            case 'franklin':
                url = 'fhs'
                break;
            case 'ida':
                url = 'ihs'
                break;
        }
    }
    else {
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
    }

    return url;
}