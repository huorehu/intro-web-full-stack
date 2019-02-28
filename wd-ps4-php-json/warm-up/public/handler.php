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
        $_SESSION['task-3'] = $_FILES['fil']['name'];
        break;
    case 'draw-chessboard':
        $_SESSION['task-4'] = getChessboard($_POST['width'], $_POST['height']);
        break;

}

header('location: index.php');