<?php

use App\Services\Logger;

$logger = new Logger($config['logFilePath']);
$logger->logging('logout', 'success', 'user left chat', $_SESSION['userID'], $_SESSION['ip']);

$response = [
    'userID' => $_SESSION['userID'],
    'ip' => $_SESSION['ip']
];
header('Content-type:Application/json');
echo json_encode($response, JSON_PRETTY_PRINT);
session_destroy();
