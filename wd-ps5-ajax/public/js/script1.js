// const $main = $('#main').addClass();
//
// let usernameFirstFocusOutDone = false;
// let passwordFirstFocusOutDone = false;
// let isUsernameCorrect = false;
// let isPasswordCorrect = false;

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



                }
            });
        });
}

/* Loads authorization form or chat-block */
loadMainBlock();

function addListeners() {
    d








}



