const $highlighter = $('#highlighter');

$highlighter.on('submit', (e) => {
    e.preventDefault();
    $('#highlighter').siblings('p').remove();
    const text = htmlSpecialChars($('#text').val());

    let highlightedText;
    let errorClass = '';

    try {
        const $regExp = new RegExp($('#regexp').val(), $('#flags').val());

        highlightedText = highlightText(text, $regExp);
    } catch (e) {
        highlightedText = 'Invalid regular expression';
        errorClass = 'error';
    }

    $highlighter.after(`<p class=${errorClass}>${highlightedText}</p>`);
});

function highlightText($text, $pattern) {
    return $text.replace($pattern, '<mark>$&</mark>');
}

function htmlSpecialChars(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        .replace(/\n/g, '<br>');
}
