//navbar
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

$('#buttons').html(
  '<div>' +
    '<div class="bottomButtonHolder">' +
      '<div id="bottomButtonNavbarShift"></div>' + 
      '<button id="feedbackButton"><img id="icon16" src="/style/icons/feedback.svg"></img></button>' +
      '<button id="highlightRoomButton"><img id="icon16" src="/style/icons/find.svg"></img></button>' +
    '</div>' +
    '<div class="bottomSubmit">' +
      '<button id="submitButton"><img id="icon16" src="/style/icons/check.svg"></img>' +
        '<p> (0)</p>' +
      '</button>' +
    '</div>' +
  '</div>'
);


//footer
$('#footer').html(
  '<p id="footerText">© sid collective 2023</p>' +
  '<a id="footerHelp" href="/help">help</a>'
  );


//navbar functions
$("#navbarButton").click(function(){
  $("#navbarBackground").animate({width: 'toggle'}, 100);
  $("#bottomButtonNavbarShift").animate({width: 'toggle'}, 100);
});

if (!navigator.onLine) {
  $('#noWifi').show();
}

pageId = $('#pageID').html();

isSchoolPage = (pageId != '404') && (pageId != 'help')

$("#chsNavbar").click(function(){
  if(isSchoolPage) {
    selectSchool('chs')
  }
  else {
    fourNavbar('chs');
  }
});

$("#fhsNavbar").click(function(){
  if(isSchoolPage) {
    selectSchool('fhs')
  }
  else {
    fourNavbar('fhs');
  }
});

$("#ihsNavbar").click(function(){
  if(isSchoolPage) {
    selectSchool('ihs')
  }
  else {
    fourNavbar('ihs');
  }
});

function fourNavbar(school) {
  window.location.replace("/" + fullSchoolName(school));
}

$("#helpButton").click(function(){
  window.location.replace("/help");
});