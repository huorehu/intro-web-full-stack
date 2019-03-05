<?php
require dirname(__DIR__) . DIRECTORY_SEPARATOR . "app" . DIRECTORY_SEPARATOR . "functions.php";

session_start();

$_SESSION['task'] = $_POST['task'];

switch ($_SESSION['task']) {
    case 'sum-numbers':
        $_SESSION['task-1'] = getSumNumbers();
        break;
    case 'sum-numbers237':
        $_SESSION['task-2'] = getSumNumbersDiv237();
        break;
    case 'load-file':
        $_SESSION['task-3'] = loadFile($_FILES);
        break;
    case 'print-files':
        $_SESSION['files-list'] = getFilesList();
        break;
    case 'draw-chessboard':
        $_SESSION['task-4'] = getChessboard($_POST['width'], $_POST['height']);
        break;
    case 'sum-digits':
        $_SESSION['task-5'] = getDigitsSum($_POST['number']);
        break;
    case 'random-numbers':
        $_SESSION['task-6'] = getRandomResult();
        break;
    case 'count-visitors':
        $_SESSION['task-7'] = getAmountVisitors($_SESSION);
        break;
    case 'analyze-text':
        $_SESSION['task-8'] = getTextInfo($_POST['text']);

}

header('location: index.php');