<?php
require dirname(__DIR__) . DIRECTORY_SEPARATOR . "app" . DIRECTORY_SEPARATOR . "functions.php";

session_start();

switch ($_POST['option']) {
    case 'option-1':
        increaseItem();
        break;
    case 'option-2':
        increaseItem();
        break;
    case 'option-3':
        increaseItem();
        break;
    case 'option-4':
        increaseItem();
        break;
    case 'option-5':
        increaseItem();
        break;
}

header('location: pie_chart.php');