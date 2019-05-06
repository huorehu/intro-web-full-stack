<?php

use App\MessageDatabaseSQL;
use App\Services\{Logger, Messenger, Validator};

if (!isset($_SESSION['auth'])) {
    echo json_encode([
        'auth' => false
    ], JSON_PRETTY_PRINT);
    exit();
}

$action = isset($_POST['action']) ? htmlspecialchars($_POST['action']) : null;
$messageDatabase = new MessageDatabaseSQL();
$messenger = new Messenger($messageDatabase);
$logger = new Logger($config['logFilePath']);

$response = [];

switch ($action) {
    case 'update':
        $response['messages'] = $messenger->getMessages($config['lastHour']);
        break;
    case 'send-message':
        $validator = new Validator();
        $validateResult = $validator->validateMessage($_POST['message']);

        if ($validateResult === '') {
            $response['success'] = $messenger->send($_SESSION['auth'], $_POST['message']);
        } else {
            $response['error'] = $validateResult;
        }

        $response['userID'] = $_SESSION['userID'];
        $response['ip'] = $_SESSION['ip'];
        $logger->logging('sending message', isset($response['success']) ? 'success' : 'fail', '-', $_SESSION['userID'], $_SESSION['ip']);
}

header('Content-type:Application/json');
echo json_encode($response, JSON_PRETTY_PRINT);
