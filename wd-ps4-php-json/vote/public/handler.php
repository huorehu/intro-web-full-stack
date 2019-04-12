<?php
session_start();

require dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'JsonDataController.php';
$config = require dirname(__DIR__) . DIRECTORY_SEPARATOR . 'config.php';

try {
    $_SESSION['json-data'] = (new JsonDataController($config['jsonFileName']))->vote($_POST['option']);
    header('location: pie_chart.php');
} catch (InvalidArgumentException $e) {
    $_SESSION['error'] = $e->getMessage();
    header('location: index.php');
}