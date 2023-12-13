let errors = [];
const errorText = $('#errorText');
const errorMessages = {
    usernameSpaces: 'username can\'t have spaces',
    usernameLength: 'username is too short',
    emailFormat: 'enter a valid email address',
    passwordLength: 'password is too short',
    passwordMismatch: 'passwords do not match',
    allInputs: 'all input fields must be filled'
};
$(document).ready(function () {

    errors = [];

    $('#username, #password, #passwordConfirm, #email').keyup(function () {
        const username = $('#username').val()?.trim() || '';
        const password = $('#password').val()?.trim() || '';
        const confirmPassword = $('#passwordConfirm').val()?.trim() || '';
        const email = $('#email').val()?.trim() || '';

        errors = [];

        usernameHasText = (username != '') 
        passwordHasText = (password != '') 

        if (usernameHasText && username.includes(' ')) {
            errors.push(errorMessages.usernameSpaces);
        }
        
        if (usernameHasText && username.replace(/\s/g, '').length < 5) {
            errors.push(errorMessages.usernameLength);
        }
        
        if (email != '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                errors.push(errorMessages.emailFormat);
            }
        }

        if (passwordHasText && (password.length < 6)) {
            errors.push(errorMessages.passwordLength);
        }

        if (password !== confirmPassword) {
            errors.push(errorMessages.passwordMismatch);
        }

        if (errors.length > 0) {
            showError(errors[0]);
        } else {
            hideError();
        }
    });
});

function showError(message) {
    errorText.text(message).css('opacity', 1);
}

function hideError() {
    errorText.css('opacity', 0);
}

function checkInputs() {
  let allInputs = $('input[type="text"], input[type="password"]');
  let allHaveText = allInputs.toArray().every(input => $(input).val().trim() !== '');
  return allHaveText;
}

$(document).on('keypress',function(e) {
    if(e.which == 13) {
        $('#createAccountButton').click();
    }
});

$('#createAccountButton').click(e => {
    if(checkInputs() && errors.length == 0) {
        $.ajax({
            type: 'POST',
            url: '/createAccount',
            data: {
                username: $('#username').val()?.trim(),
                email: $('#email').val()?.trim(),
                password: $('#password').val()?.trim(),
            },
            success: function (response) {
                switch (response.status) {
                    case 0: 
                        showError(response.error); 
                        break;
                    case 1:
                        $('#createAccount').hide();
                        $('#verifyEmail').fadeIn();
                        break;
                }
            },
            error: function (xhr, status, error) {
                console.error('AJAX request error:', status, error);
            }
        });
    }
    else {
        createAccountError();
    }
});

function createAccountError() {
    const button = $('#createAccountButton')
    if(!checkInputs()) {
        errors.push(errorMessages.allInputs);
        showError(errors[0]);
    }
    if (button.hasClass('redBorder')) {
        button.removeClass('redBorder');
        button.addClass('redBorder');
    }

    button.addClass('redBorder');
    setTimeout(function () {
        button.removeClass('redBorder');
    }, 500);
}