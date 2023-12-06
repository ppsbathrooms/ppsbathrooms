schoolRedirect = $('#school').html()
pageId = $('#pageID').html()

schoolPages = ['chs', 'fhs', 'ihs', 'schools']

isSchoolPage = $.inArray( pageId, schoolPages );
isSchoolPage = isSchoolPage > 0 ? true : false;

//redirect school pages

if(isSchoolPage) {
    if(schoolRedirect.replace(/\s/g, '').length) {
        selectSchool(schoolRedirect.replace(/\s/g, ""), false)
        $('#buttons').show(100)
    } else {
        $('.schoolChoice').css('display', 'flex');
    }
}  


//go to school page

function selectSchool(school, redirect) {
    document.title = "ppsbathrooms | " + schoolNameConvert(school, false) 

    $('#px').click();

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

    fetch('html/maps/' + school + 'Map.html')
    .then(response => {
      if (!response.ok) {
        throw new Error('network response was not ok');
      }
      return response.text();
    })
    .then(data => {
        $('.map').html(data);
        getData();
        getDataForUpdate();
        setupButtons();
    })
    .catch(error => {
      console.error('there was a problem fetching the document:', error);
      return null;
    });

    if(redirect) {
        window.history.pushState('page2', 'Title', '/' + schoolNameConvert(school, false));
    }
    
    currentPage = window.location.href.toString().split(window.location.host)[1]
}

//current webpage
var currentPage = window.location.href.toString().split(window.location.host)[1]

//on forward/backward button check if new webpage is different and if it is change displayed map / hide it
window.onpopstate = function()
{
    newPage = window.location.href.toString().split(window.location.host)[1];
    $('#px').click();

    isSchoolPickPage = (newPage == '/') ? true: false;
    if(isSchoolPickPage) {
        document.title = "ppsbathrooms";
        $("#pageID").html('school');
        $('.map').html('');
        $('.schoolChoice').css('display', 'flex');
        $('#footer').css('position', 'absolute');
        $('#buttons').hide(100)
        currentPage = '/';
    }
    else if(newPage != currentPage) {
            justPage = window.location.href.toString().split(window.location.host)[1].replace(/\//g,'')
            selectSchool(schoolNameConvert(justPage, true), false)
        currentPage = newPage;
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