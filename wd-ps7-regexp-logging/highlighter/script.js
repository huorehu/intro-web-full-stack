const $highlighter = $('#highlighter');

$highlighter.on('submit', (e) => {
    e.preventDefault();
    $('#highlighter').siblings('p').remove();

    let highlightedText;
    let errorClass = '';

    try {
        const $egExp = new RegExp($('#regexp').val(), $('#flags').val());

        highlightedText = highlightText($('#text').val(), $egExp);
    } catch (e) {
        highlightedText = 'Invalid regular expression';
        errorClass = 'error';
    }

    $highlighter.after(`<p class=${errorClass}>${highlightedText}</p>`);
});

function highlightText($text, $pattern) {
    return $text.replace($pattern, '<mark>$&</mark>');
}
