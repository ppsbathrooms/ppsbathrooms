pageId = $('#pageID').html();

//append navbar
$('#navbar').html(
  '<img src="../style/icons/noWifi.svg" id="noWifi"></img>' +
  '<button id="navbarButton"><img id="icon24" src="../style/icons/bars.svg"></button>' + 
  '<div id="navbarBackground">' +
    '<div id="schoolButtons">' +
      '<img id="chsNavbar" src="../style/images/logos/clevelandLogo.png"></img>' +
      '<img id="fhsNavbar" src="../style/images/logos/franklinLogo.png"></img>' + 
      '<img id="ihsNavbar" src="../style/images/logos/idaLogo.png"></img>' +
      '<img id="helpButton" src="../style/icons/help.svg" style="width: 25px; height: 25px;"></img>' +
    '</div>' +
    '<div id="navButtonsBottom">' +
        '<a href="/privacy">privacy</a>' +
        '<a href="/terms">terms</a>' +
    '</div>'
);

//append bottom buttons
$('#buttons').html(
  '<div>' +
    '<div class="bottomButtonHolder">' +
      '<div id="bottomButtonNavbarShift"></div>' + 
      '<button id="feedbackButton" title="give feedback"><img id="icon16" src="/style/icons/feedback.svg"></img></button>' +
      '<button id="highlightRoomButton" title="highlight a room"><img id="icon16" src="/style/icons/find.svg"></img></button>' +
    '</div>' +
    '<div class="bottomSubmit">' +
      '<button id="submitButton" title="submit bathroom changes"><img id="icon16" src="/style/icons/check.svg"></img>' +
        '<p> (0)</p>' +
      '</button>' +
    '</div>' +
  '</div>'
);


//footer
$('#footer').html(
  '<p id="footerText">© sid collective 2023</p>' +
  '<div id="footerRight">' +
  '<a href="/contact">contact</a>' +
  '<a href="/help">help</a>'+
  '</div>'
  );

//different footer when not displaying map
$(document).ready(function() {
  schoolDisplayFooter();
});

function schoolDisplayFooter() {
  $('#footer').css('display', 'flex');
  if($('#pageID').html() == 'schools' || $('#pageID').html() == 'contact') {
    $('#footer').css('position', 'absolute');
  }
}

//navbar functions
$("#navbarButton").click(function(){
  $("#navbarBackground").animate({width: 'toggle'}, 100);
  $("#bottomButtonNavbarShift").animate({width: 'toggle'}, 100);
});

//no wifi icon
if (!navigator.onLine) {
  $('#noWifi').show();
}

isSchoolPage = (pageId != '404') && (pageId != 'help')

//navbar school click event
$("#chsNavbar").click(function(){
  if(isSchoolPage) {
    selectSchool('chs', true)
  }
  else {
    fourNavbar('chs');
  }
});

$("#fhsNavbar").click(function(){
  if(isSchoolPage) {
    selectSchool('fhs', true)
  }
  else {
    fourNavbar('fhs');
  }
});

$("#ihsNavbar").click(function(){
  if(isSchoolPage) {
    selectSchool('ihs', true)
  }
  else {
    fourNavbar('ihs');
  }
});

//change navbar functionality for 404 page, redirect instead of replacing map
function fourNavbar(school) {
  window.location.replace("/" + schoolNameConvert(school, false));
  currentPage = window.location.href.toString().split(window.location.host)[1]
}

//footer help redirect
$("#helpButton").click(function(){
  window.location.href = "/help";
  currentPage = window.location.href.toString().split(window.location.host)[1]
});