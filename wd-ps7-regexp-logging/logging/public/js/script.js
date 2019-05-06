const $username = $('#username');
const $password = $('#password');
const ERROR_MSG = {
    username: {
        length: 'Username length must be from 3 to 50 characters',
        chars: 'Username must contains only A-Z, a-z, digits, _',
    },
    password: {
        length: 'Password must be more than 2 characters',
        chars: 'Password must contains only A-Z, a-z, digits, _'
    }
};

let usernameFirstFocusOutDone = false;
let passwordFirstFocusOutDone = false;
let isUsernameCorrect = false;
let isPasswordCorrect = false;
let messageSent = false;

updateMessagesBlock();
/* User greeting */
let $userGreeter = $('#greet-user');

if ($userGreeter) {
    $userGreeter.css('display', 'inline-block');
    setTimeout(() => $userGreeter.fadeOut(1000), 2000);
}

/* Authorization */
$('#register').on('submit', (e) => {
    e.preventDefault();
    removeError($username);
    removeError($password);

    if (!isUsernameCorrect) {
        usernameFirstFocusOutDone = true;
        showError($username, ERROR_MSG['username']['length']);
    }

    if (!isPasswordCorrect) {
        passwordFirstFocusOutDone = true;
        showError($password, ERROR_MSG['password']['length']);
    }

    if (isUsernameCorrect && isPasswordCorrect) {
        $.ajax({
            method: 'POST',
            url: 'handler.php',
            data: {
                route: 'auth',
                username: $username.val(),
                password: $password.val()
            }
        }).done(data => {
            if (data['success']) {
                location.reload();
            } else {
                showAuthErrors(
                    data['username']['length'], data['username']['chars'],
                    data['password']['length'], data['password']['chars']
                );
            }

            logging('authorization', data['success'] ? 'success' : 'fail', '-', data['userID'], data['ip']);
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

$username.on('focusout', e => {
    e.preventDefault();
    removeError($username);
    usernameFirstFocusOutDone = true;

    if (!isUsernameCorrect) {
        showError($username, 'Username length must be from 3 to 50 characters');
    }
});

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

$('#chat').on('submit', (e) => {
    e.preventDefault();
    const $inputField = $('.chat__input');

    if ($inputField.val() === '') {
        showInputMessageError($inputField, 'Enter your message');
        logging('sending message', 'error', 'empty message', '-', '-');

        return;
    }

    if ($inputField.val().length > 255) {
        showInputMessageError($inputField, 'Your message must contain no more than 255 characters');
        logging('sending message', 'error', 'message length more than 255 characters', '-', '-');

        return;
    }

    $.ajax({
        method: 'POST',
        url: 'handler.php',
        data: {
            route: 'message',
            action: 'send-message',
            message: $inputField.val()
        },
    }).done(data => {
        if (data['success']) {
            $inputField.val('');
            messageSent = true;
            updateMessagesBlock();
            logging('sending message', 'success', '-', data['userID'], data['ip']);
        } else {
            showInputMessageError($inputField, data['error']);
        }
    });
});

$('#logout').on('submit', (e) => {
    e.preventDefault();

    $.ajax({
        method: 'POST',
        url: 'handler.php',
        data: {
            route: 'logout'
        }
    }).done(data => {
        logging('logout', 'success', 'user left chat', data['userID'], data['ip']);
        location.reload();
    });
});

/* Requests every second new messages */
setInterval(() => {
    updateMessagesBlock();
}, 1000);

function showAuthErrors(usernameLength, usernameChars, passwordLength, passwordChars) {
    removeError($username);
    removeError($password);

    if (usernameChars && passwordChars) {
        showError($password, 'Wrong password');
    }

    if (!usernameChars) {
        showError($username, ERROR_MSG['username']['chars']);
    } else if (!usernameLength) {
        showError($username, ERROR_MSG['username']['length']);
    }

    if (!passwordChars) {
        showError($password, ERROR_MSG['password']['chars']);
    } else if (!passwordLength) {
        showError($password, ERROR_MSG['password']['length']);
    }
}

function showError(block, message) {
    block.addClass('error');
    block.after(`<div class='error-msg'>${message}</div>`);
}

function removeError(block) {
    block.removeClass('error');
    block.next().remove();
}

function isCorrectLength(str) {
    return str.length >= 3 && str.length <= 50;
}

function showInputMessageError(block, errorMsg) {
    const $currentMessage = block.val();
    const $sendBtn = $('#send-msg');

    block.val(errorMsg);
    block.attr('disabled', true);
    $sendBtn.attr('disabled', true);
    block.addClass('error-msg error');
    setTimeout(() => {
        block.val($currentMessage);
        block.removeClass('error-msg error');
        block.attr('disabled', false);
        $sendBtn.attr('disabled', false);
    }, 2000);
}

function formatTimeForMessage(timestamp) {
    const date = new Date(timestamp * 1000);

    return `${fillTimeValue(date.getHours())}:${fillTimeValue(date.getMinutes())}:${fillTimeValue(date.getSeconds())}`;
}

function fillTimeValue(time) {
    return (time + '').padStart(2, '0');
}

function updateMessagesBlock() {
    $.ajax({
        method: 'POST',
        url: 'handler.php',
        data: {
            route: 'message',
            action: 'update'
        }
    }).done(data => {
        if (data['messages']) {
            showMessages(JSON.parse(data['messages']));
        }
    });
}

function showMessages(messageArr) {
    let message;
    const $messageBlock = $('#message-block');

    $messageBlock.empty();
    messageArr = replaceEmoji(messageArr);
    message = '';

    for (let messageID in messageArr) {
        let currentMsg = messageArr[messageID];
        message += `<p class="message__user">[<span class="time-font">${formatTimeForMessage(messageID)}</span>]` +
            ` <span class="chat-username">${currentMsg['username']}</span>: ${currentMsg['message']}</p>`;
    }

    $messageBlock.append(message);

    if (messageSent) {
        $('#message-block').scrollTop(document.getElementById('message-block').scrollHeight);
        messageSent = false;
    }
}

function replaceEmoji(messageArr) {
    const smile = '<img class="emoji" align="top" src="/img/smile.png">';
    const sad = '<img class="emoji" align="top" src="/img/sad.png">';

    for (let messageID in messageArr) {
        messageArr[messageID]['message'] = messageArr[messageID]['message'].replace(/:\)/g, smile);
        messageArr[messageID]['message'] = messageArr[messageID]['message'] .replace(/:\(/g, sad);
    }

    return messageArr;
}

function logging(service, level, message, userID, ip) {
    const log = {
        time: new Date().toLocaleString('en-GB'),
        service: service,
        level: level,
        message: message,
        userID: userID,
        ip: ip
    };

    console.log(log);
}
