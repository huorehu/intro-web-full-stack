<?php

use App\MessageDatabaseJSON;
use App\Services\Messenger;
use App\Services\Validator;

if (!isset($_SESSION['auth'])) {
    echo json_encode([
        'auth' => false
    ], JSON_PRETTY_PRINT);
    exit();
}

$action = isset($_POST['action']) ? htmlspecialchars($_POST['action']) : null;
$messageDatabase = new MessageDatabaseJSON($config['messageDatabasePath']);
$messenger = new Messenger($messageDatabase);

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
}

header('Content-type:Application/json');
echo json_encode($response, JSON_PRETTY_PRINT);
