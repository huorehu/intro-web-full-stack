<?php
require dirname(__DIR__) . DIRECTORY_SEPARATOR . "app" . DIRECTORY_SEPARATOR . "JsonDataController.php";

session_start();

$config = require dirname(__DIR__) . DIRECTORY_SEPARATOR . 'config.php';

$_SESSION['json-data'] = (new JsonDataController($config['jsonFileName']))->vote($_POST['option']);

header('location: pie_chart.php');