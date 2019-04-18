const $main = $('#main');

let usernameFirstFocusOutDone = false;
let passwordFirstFocusOutDone = false;
let isUsernameCorrect = false;
let isPasswordCorrect = false;

function loadMainBlock() {
    $main.load(
        'handler.php',
        {
            action: 'refresh'
        },
        () => {
            addListeners();
            $.ajax({
                method: 'POST',
                url: 'handler.php',
                data: {
                    action: 'is-auth'
                }
            }).done(data => {
                if (data === 'auth') {
                    /* User greeting */
                    let $userGreeter = $('#greet-user');

                    $userGreeter.css('display', 'inline-block');
                    setTimeout(() => $userGreeter.fadeOut(1000), 2000);
                    /* Requests every second new messages */
                    setInterval(() => {
                        updateMessagesBlock();
                    }, 1000);
                }
            });
        });
}

/* Loads authorization form or chat-block */
loadMainBlock();

function addListeners() {
    const $username = $('#username');
    const $password = $('#password');

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
                    case 'fail':
                        removeError($password);
                        showError($password, 'Invalid password');
                        break;
                    default:
                        loadMainBlock();
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

            return;
        }

        if ($inputField.val().length > 255) {
            showInputMessageError($inputField, 'Your message must contain no more than 255 characters');

            return;
        }

        $.ajax({
            method: 'POST',
            url: 'handler.php',
            data: {
                action: 'message',
                message: $inputField.val()
            }
        }).done(data => {
            switch (data) {
                case 'success':
                    updateMessagesBlock();
                    $inputField.val('');
                    break;
                case 'fail':
                    showInputMessageError($inputField, 'Something went wrong!');
            }
        });
    });
}

function updateMessagesBlock() {
    $.ajax({
        method: 'POST',
        url: 'handler.php',
        data: {
            action: 'update',
        }
    }).done(data => {
        if (data !== 'fail') {
            showMessages(JSON.parse(data));
        }
    });
}

function showMessages(messageArr) {
    let message;
    const $messageBlock = $('#message-block');

    $messageBlock.empty();
    messageArr = replaceEmoji(messageArr);

    for (let messageID in messageArr) {
        let currentMsg = messageArr[messageID];
        message = `[<span class="time-font">${formatTimeForMessage(messageID)}</span>]` +
            ` <span class="chat-username">${currentMsg['username']}</span>: ${currentMsg['message']}`;
        $messageBlock.append(`<p class="message__user">${message}</p>`);
    }

    $messageBlock.scrollTop(document.getElementById('message-block').scrollHeight);
}

function replaceEmoji(messageArr) {
    const smile = '<img class="emoji" align="top" src="../img/smile.png">';
    const sad = '<img class="emoji" align="top" src="../img/sad.png">';

    for (let messageID in messageArr) {
        messageArr[messageID]['message'] = messageArr[messageID]['message'].replace(/:\)/g, smile);
        messageArr[messageID]['message'] = messageArr[messageID]['message'] .replace(/:\(/g, sad);
    }

    return messageArr;
}

function showInputMessageError(block, errorMsg) {
    const $currentMessage = block.val();

    block.val(errorMsg);
    block.addClass('error-msg error');
    setTimeout(() => {
        block.val($currentMessage);
        block.removeClass('error-msg error');
    }, 2000);
}

function formatTimeForMessage(timestamp) {
    const date = new Date(timestamp * 1000);

    return `${fillTimeValue(date.getHours())}:${fillTimeValue(date.getMinutes())}:${fillTimeValue(date.getSeconds())}`;
}

function fillTimeValue(time) {
    return (time + '').padStart(2, '0');
}

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
