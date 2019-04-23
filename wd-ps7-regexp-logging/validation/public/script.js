const regExp = {
    ip: /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
    email: /^\w{1,50}@\w{1,50}(\.[a-z]{2,4}){1,2}$/,
    url: /^https?:\/\/(w{3}\.)?\w+(\.[a-z]{2,10}){1,5}(\/\w*)*$/,
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

const firstFocusOutDone = {
    'ip': false,
    'email': false,
    'url': false,
    'date': false,
    'time': false
};

const wasValidInput = {
    'ip': false,
    'email': false,
    'url': false,
    'date': false,
    'time': false
};

for (let i = 0; i < validateFields.length; i++) {
    const currentInput = $(`#${validateFields[i]}`);
    const form = $(`#${validateFields[i]}-validate`);

    /* Front-end validation */
    currentInput.on('input', (e) => {
        e.preventDefault();
        removeHighlighting(currentInput, validateFields[i]);

        if (!regExp[validateFields[i]].test(e.currentTarget.value)) {
            if (firstFocusOutDone[$(e.currentTarget).attr('id')] ||
                wasValidInput[validateFields[i]]) {
                    showError(currentInput, validateFields[i], 'JS');
            }
        } else {
            showSuccess(currentInput, validateFields[i], 'JS');
            wasValidInput[validateFields[i]] = true;
        }
    });

    currentInput.on('focusout', (e) => {
        removeHighlighting(currentInput, validateFields[i]);

        if (!regExp[validateFields[i]].test(e.currentTarget.value)) {
            showError(currentInput, validateFields[i], 'JS');
        } else {
            showSuccess(currentInput, validateFields[i], 'JS');
        }

        firstFocusOutDone[$(e.currentTarget).attr('id')] = true;
    });

    /* Back-end validation */
    form.on('submit', (e) => {
        e.preventDefault();
        removeHighlighting(currentInput, validateFields[i]);

        if (!regExp[validateFields[i]].test(currentInput.val())) {
            showError(currentInput, validateFields[i], 'JS');

            return;
        }

        $.ajax({
            method: 'POST',
            url: 'handler.php',
            data: {
                route: $(e.currentTarget).attr('id'),
                input: currentInput.val()
            }
        }).done(data => {
            if (data === 'error') {
                showError(currentInput, validateFields[i], 'PHP');
            } else {
                showSuccess(currentInput, validateFields[i], 'PHP');
            }
        });
    });
}

function showSuccess(block, fieldName, sideName) {
    $(`#${fieldName}-input`).after(`<span class="input-text-valid highlight">Valid ${fieldName} (${sideName})</span>`);
    block.addClass('input-success');
}

function showError(block, fieldName, sideName) {
    $(`#${fieldName}-input`).after(`<span class="error highlight">Incorrect ${fieldName} (${sideName})</span>`);
    block.addClass('error-border');
}

function removeHighlighting(block, fieldName) {
    const removedElement = $(`#${fieldName}-input`).siblings('span');

    if (undefined !==removedElement) {
        removedElement.remove();
    }

    block.removeClass('input-success error-border');
}
