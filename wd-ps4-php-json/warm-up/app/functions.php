<?php

define(
    'UPLOAD_DIR',
    dirname(__DIR__) .
    DIRECTORY_SEPARATOR .
    'public' .
    DIRECTORY_SEPARATOR .
    'uploads'.
    DIRECTORY_SEPARATOR
);

/* Task-1: calculates the sum of numbers from -1000 to 1000 */
function getSumNumbers() {
    $result = 0;

    for ($i = -1000; $i <= 1000; $i++) {
        $result += $i;
    }

    return $result;
}

/* Task-2: calculates the sum of numbers from -1000 to 1000, adding only numbers that end with 2, 3 and 7 */
function getSumNumbersDiv237() {
    $result = 0;

    for ($i = -1000; $i <= 1000; $i++) {
        $lastElement = abs($i % 10);

        if ($lastElement === 2 || $lastElement === 3 || $lastElement === 7) {
            $result += $i;
        }
    }

    return $result;
}

/* Task-3: loads files on the server */
function loadFile($files) {
    return move_uploaded_file($files['selected-file']['tmp_name'], UPLOAD_DIR . $files['selected-file']['name']);
}

/* Task-4: returns chessboard as array */
function getChessboard($width, $height) {
    if (!validatePositiveIntValue($width) || !validatePositiveIntValue($height)) {
        throw new InvalidArgumentException('Input value must be between 1 to 50');
    }

    $chessboard = [];

    for ($row = 0; $row < $height; $row++) {
        for ($column = 0; $column < $width; $column++) {
            $chessboard[$row][$column] = ($row + $column) % 2 === 0 ? 'black' : 'white';
        }
    }

    return $chessboard;
}

/* Task-5: finds the sum of received number digits */
function getDigitsSum($number) {
    if (!is_numeric($number)) {
        throw new InvalidArgumentException('Input value must be a number');
    }

    return array_sum(str_split($number));
}

/* Task-6: random numbers */
function getRandomResult() {
    return implode(', ', getRandomNumbers());
}

/* Task-7 counts visitors */
function getAmountVisitors(&$session) {
    $session['count'] = isset($session) ? $session['count'] + 1 : 1;

    return $session['count'];
}

/* Task-8 analyzes received text line */
function getTextInfo($text) {
    $textLen = iconv_strlen($text);
    $lines = count(preg_split("/\n/", $text));
    $spaces = count(preg_split("/ /", $text)) - 1;

    return [
        'lines' => $lines,
        'letters' => $textLen - (($lines - 1) * 2) - $spaces,
        'spaces' => $spaces
    ];
}

/* Returns random numbers */
function getRandomNumbers() {
    $result = [];

    for ($i = 0; $i < 100; $i++) {
        $result[$i] = rand(1, 10);
    }

    $result = array_unique($result);
    asort($result);
    $result = array_reverse($result);
    $result = array_map(function ($a) {return $a * 2;}, $result);

    return $result;
}

/* Returns true if $value is positive integer */
function isPositiveInt($value) {
    return is_numeric($value) && $value > 0 && $value == round($value);
}

/* Returns true if $value is integer number between 1 to 50 inclusive */
function validatePositiveIntValue($value) {
    return isPositiveInt($value) && $value <= 50;
}

/* Returns list of files */
function getFilesList() {
    if (file_exists(UPLOAD_DIR)) {
        return array_values(array_diff(array_reverse(scandir(UPLOAD_DIR)), ['.', '..']));
    }

    mkdir(UPLOAD_DIR);

    return [];
}
