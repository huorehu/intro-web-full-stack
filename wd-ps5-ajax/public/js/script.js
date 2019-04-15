/* User greeting */
$('#welcome-message').append($('<span id="greet-user">Hello, Vasya!</span>'));
$('#greet-user').css('display', 'inline-block');
setTimeout(() => $('#greet-user').fadeOut(1000), 2000);

const $username = $('#username');
const $password = $('#password');
let isUsernameCorrect = false;
let isPasswordCorrect = false;

/* Authorization */
$('#register').on('submit', (e) => {
    e.preventDefault();
    removeError($username);
    removeError($password);

    if (!isUsernameCorrect) {
        usernameFirstFocusOutDone = true;
        showError($username, 'Username length must be from 3 to 50 characters');
    }

    if (!isPasswordCorrect) {
        passwordFirstFocusOutDone = true;
        showError($password, 'Password must be more than 2 characters');
    }

    if (isUsernameCorrect && isPasswordCorrect) {
        $.ajax({
            method: 'POST',
            url: 'handler.php',
            data: {
                action: 'auth',
                username: $username.val(),
                password: $password.val()
            }
        }).done(data => {
            switch (data) {
                case 'success':
                    location.reload();
                    break;
                case 'fail':
                    showError($password, 'Invalid password');
            }
        });
    }
});

/* Username correctness listener */
$username.on('input', e => {
    e.preventDefault();
    removeError($username);

    if (!isCorrectLength($username.val()) && usernameFirstFocusOutDone) {
        showError($username, 'Username length must be from 3 to 50 characters');
        isUsernameCorrect = false;
    } else if (isCorrectLength($username.val())) {
        isUsernameCorrect = true;
    }
});

let usernameFirstFocusOutDone = false;

$username.on('focusout', e => {
    e.preventDefault();
    removeError($username);
    usernameFirstFocusOutDone = true;

    if (!isUsernameCorrect) {
        showError($username, 'Username length must be from 3 to 50 characters');
    }
});

let passwordFirstFocusOutDone = false;

/* Password correctness listener */
$password.on('input', e => {
   e.preventDefault();
   removeError($password);

   if ($password.val().length < 3 && passwordFirstFocusOutDone) {
       showError($password, 'Password must be more than 2 characters');
       isPasswordCorrect = false;
   } else if ($password.val().length >= 3) {
       isPasswordCorrect = true;
   }
});

$password.on('focusout', e => {
   e.preventDefault();
   removeError($password);

   if (!isPasswordCorrect) {
       showError($password, 'Password must be more than 2 characters');
   }

   passwordFirstFocusOutDone = true;
});

function isCorrectLength(str) {
    return str.length >= 3 && str.length <= 50;
}

function showError(block, message) {
    block.addClass('error');
    block.after(`<div class='error-msg'>${message}</div>`);
}

function removeError(block) {
    block.removeClass('error');
    block.next().remove();
}