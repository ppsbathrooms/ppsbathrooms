userData = JSON.parse($('#userData').val());
userData.forEach((user) => {
    $('#editPerms' + user._id).hide();
    $('#togglePerms' + user._id).click(function () { editPerms(user._id); });
    $('#changePass' + user._id + ' button').click(function () { changeUserPassword(user._id); });
    $("#access" + user._id).change(function () { updateUser(user._id, this.value, 'access') });
})

function updateUser(userId, val, valName) {
    $.post("/updateUser", {
        id: userId,
        valueName: valName,
        newValue: val
    }, function (data, status) {
    });
}

function changeUserPassword(id) {
    newPass = $('#changePass' + id + ' .textInputContainer input')
    console.log(newPass.val())
}

function editPerms(id) {
    targetOpacity = $('#editPerms' + id).css('opacity') < 1 ? 1 : 0;

    $('#editPerms' + id).animate({
        opacity: targetOpacity
    }, { duration: 200, queue: false });

    $('#editPerms' + id).slideToggle(200);
}