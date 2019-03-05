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

        if ($lastElement == 2 || $lastElement == 3 || $lastElement == 7) {
            $result += $i;
        }
    }

    return $result;
}

/* Task-3 */
function loadFile($files) {
    if (move_uploaded_file($files['selected-file']['tmp_name'], UPLOAD_DIR . $files['selected-file']['name'])) {
        return getFilesList();
    } else {
        return false;
    }
}

/* Returns list of files */
function getFilesList() {
    return scandir(UPLOAD_DIR);
}

/* Task-4: returns chessboard as array */
function getChessboard($width, $height) {
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
    return array_sum(str_split($number));
}

/* Task-6: random numbers */
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

/* Task-7 */
function getAmountVisitors(&$session) {
    $session['count'] = isset($session) ? $session['count'] + 1 : 1;
    return $session['count'];
}

/* Task-8 */
function getTextInfo($text) {
    return "text info";
}

function getRandomResult() {
    $result = 'array';

    return implode(', ', getRandomNumbers());
}

