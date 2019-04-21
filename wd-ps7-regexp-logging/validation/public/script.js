const regExp = {
    ip: /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
    email: /^\w{1,50}@\w{1,50}(\.[a-z]{2,4}){1,2}$/,
    url: /^https?:\/\/(w{3}\.)?\w+(\.[a-z]{2,4}){1,5}(\/\w*)*$/,
    date: /^([1-9]|(0[1-9])|1[0-2])\/([1-9]|(0[1-9])|([12]\d)|(3[01]))\/(?!0{4})\d{4}$/,
    time: /^([01]\d|2[0-3])(:([0-5]\d)){2}$/
};

const validateFields = [
    'ip',
    'email',
    'url',
    'date',
    'time'
];

for (let i = 0; i < validateFields.length; i++) {
    const currentInput = $(`#${validateFields[i]}`);
    const form = $(`#${validateFields[i]}-validate`);

    /* Front-end validation */
    currentInput.on('input', (e) => {
        e.preventDefault();
        removeHighlighting(currentInput);

        if (!regExp[validateFields[i]].test(e.currentTarget.value)) {
            showError(currentInput, validateFields[i]);
        } else {
            showSuccess(currentInput, validateFields);
        }
    });

    /* Back-end validation */
    form.on('submit', (e) => {
        e.preventDefault();
        removeHighlighting(currentInput);
        $.ajax({
            method: 'POST',
            url: 'handler.php',
            data: {
                route: $(e.currentTarget).attr('id'),
                input: currentInput.val()
            }
        }).done(data => {
            if (data === 'error') {
                showError();
            } else {
                showSuccess();
            }
        });
    });

}

function showSuccess(block, fieldName) {
    //TODO
}

function showError(block, fieldName) {
    //TODO
}

function removeHighlighting(block) {
    //TODO
}