userData = JSON.parse($('#userData').val());
userData.forEach((user) => {
    $('#editPerms' + user._id).hide();
    $('#togglePerms' + user._id).click(function () { editPerms(user._id); });
    $('#changePass' + user._id + ' button').click(function () { changeUserPassword(user._id); });
    $("#access" + user._id).change(function () { updateUser(user._id, this.value, 'access') });
})

let currentUserData;

let warnings = {
  0:'you are blocking your account, if you continue you will no longer be able to log in',
  1:'you are giving yourself owner access', 
  2:'you are changing your access to admin, if you continue you will no longer have owner access', 
  3:'you are changing your access to student, if you continue you will lose all administrative access',
}

function updateUser(userId, val, valName) {
  currentId = $('#currentId').html();
  currentUserData = {userId: userId, val: val, valName: valName}

  if(userId == currentId) {
    warnUser(warnings[Number(val) + 1])
  } else {
    sendUpdate(userId, valName, val)
  }
}

function changeUserPassword(id) {
    newPass = $('#changePass' + id + ' .textInputContainer input')
    // console.log(newPass.val())
}

function editPerms(id) {
    targetOpacity = $('#editPerms' + id).css('opacity') < 1 ? 1 : 0;

    $('#editPerms' + id).animate({
        opacity: targetOpacity
    }, { duration: 200, queue: false });

    $('#editPerms' + id).slideToggle(200);
}

function warnUser(warning) {
  $('#warningText').html(warning)
  $('#userWarn')
    .css("display", "flex")
    .hide()
    .fadeIn(200);
}

$('#warnCancel').click(e => {
  $('#userWarn').fadeOut(200);
  $('#access' + currentUserData.userId).val(0)
})

$('#warnContinue').click(e => {
  d = currentUserData;
  $('#userWarn').fadeOut(200);
  sendUpdate(d.userId, d.valName, d.val);
  setTimeout(function() {
      location.reload();
  }, 1500);
})

function sendUpdate(userId, valName, val) {
  $.post("/updateUser", {
      id: userId,
      valueName: valName,
      newValue: val,
    }, function (data, status) {

    });
}