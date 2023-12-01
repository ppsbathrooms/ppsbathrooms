    $(document).ready(function () {
        const errorMessages = {
            usernameSpaces: 'username can\'t have spaces',
            usernameLength: 'username is too short',
            passwordLength: 'password is too short',
            passwordMismatch: 'passwords do not match',
            emailFormat: 'enter a valid email address'
        };

        const errorText = $('#errorText');
        let errors = [];

        $('#username, #password, #passwordConfirm, #email').keyup(function () {
            const username = $('#username').val()?.trim() || '';
            const password = $('#password').val()?.trim() || '';
            const confirmPassword = $('#passwordConfirm').val()?.trim() || '';
            const email = $('#email').val()?.trim() || '';

            errors = [];

            usernameHasText = (username != '') 
            passwordHasText = (username != '') 

            if (usernameHasText && username.includes(' ')) {
                errors.push(errorMessages.usernameSpaces);
            } 
            
            if (usernameHasText && username.replace(/\s/g, '').length < 5) {
                errors.push(errorMessages.usernameLength);
            }

            if ((username != '') && (password.length < 6)) {
                errors.push(errorMessages.passwordLength);
            }

            if (password !== confirmPassword) {
                errors.push(errorMessages.passwordMismatch);
            }

            if (email != '') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    errors.push(errorMessages.emailFormat);
                }
            }

            if (errors.length > 0) {
                showError(errors[0]);
            } else {
                hideError();
            }
        });

        function showError(message) {
            errorText.text(message).css('opacity', 1);
        }

        function hideError() {
            errorText.css('opacity', 0);
        }
    });