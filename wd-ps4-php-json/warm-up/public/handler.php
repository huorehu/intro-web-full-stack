<?php
require dirname(__DIR__) . DIRECTORY_SEPARATOR . "app" . DIRECTORY_SEPARATOR . "functions.php";

session_start();

switch ($_POST['task']) {
    case 'task-1':
        $result = getSumNumbers();
        break;
    case 'task-2':
        $result = getSumNumbersDiv237();
        break;
    case 'task-3':
        loadFile($_FILES);
        $result = getFilesList();
        break;
    case 'task-4':
        try {
            $result = getChessboard($_POST['width'], $_POST['height']);
        } catch (InvalidArgumentException $e) {
            $error = $e->getMessage();
        }
        break;
    case 'task-5':
        try {
            $result = getDigitsSum($_POST['number']);
        } catch (InvalidArgumentException $e) {
            $error = $e->getMessage();
        }
        break;
    case 'task-6':
        $result = getRandomResult();
        break;
    case 'task-8':
        $result = getTextInfo($_POST['text']);
        break;
    case 'destroy-session':
        session_destroy();
        session_start();
        $_SESSION['session-counter'] = 1;
}

$_SESSION[$_POST['task']] = [
    'result' => $result,
    'error' => $error
];
header('location: index.php');