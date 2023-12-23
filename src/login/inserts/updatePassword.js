$('#updatePassword').click(e => {
    var currentPassword = $('#currentPass').val()
    var newPassword = $('#newPass').val()
    if ((currentPassword != '') && (newPassword != '')) {
        $.post("/updatePassword", {
            passwordType: 'self',
            newPass: newPassword,
            currentPass: currentPassword
        }, function (data, status) {
            if (data.isCorrect) {
                $('#currentPass, #newPass').val('');
                buttonHighlight('#updatePassword', true);
            } else {
                $('#currentPass, #newPass').val('');
                $('#currentPass').focus();
                buttonHighlight('#updatePassword', false)
            }
        });
    }
    else {
        buttonHighlight('#updatePassword', false)
    }
    $('#oldPass', '#newPass').val('')
})

$('#newPass, #currentPass').keypress(function (event) {
    if (event.which === 13) {
        $('#updatePassword').click();
    }
});