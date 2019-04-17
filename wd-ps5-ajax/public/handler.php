<?php
session_start();

require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'Entities' . DIRECTORY_SEPARATOR . 'User.php';
require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'Entities' . DIRECTORY_SEPARATOR . 'Message.php';
require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'Services' . DIRECTORY_SEPARATOR . 'Register.php';
require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'Services' . DIRECTORY_SEPARATOR . 'Messenger.php';
require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'Contracts' . DIRECTORY_SEPARATOR . 'UserDatabaseInterface.php';
require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'Contracts' . DIRECTORY_SEPARATOR . 'MessageDatabaseInterface.php';
require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'UserDatabaseJSON.php';
require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'MessageDatabaseJSON.php';

use App\Services\{
    Register,
    Messenger
};
use App\{
    UserDatabaseJSON,
    MessageDatabaseJSON
};

define('USER_DATA_BASE_PATH', dirname(__DIR__) . DIRECTORY_SEPARATOR . 'database' . DIRECTORY_SEPARATOR . 'users.json');
define('MESSAGE_DATA_BASE_PATH', dirname(__DIR__) . DIRECTORY_SEPARATOR . 'database' . DIRECTORY_SEPARATOR . 'messages.json');

$userDatabase = new UserDatabaseJSON(USER_DATA_BASE_PATH);
$messageDatabase = new MessageDatabaseJSON(MESSAGE_DATA_BASE_PATH);

$register = new Register($userDatabase);
$messenger = new Messenger($messageDatabase);

switch ($_POST['action']) {
    case 'auth':
        $auth = 'fail';

        if ($register->authUser($_POST['username'], $_POST['password'])) {
            $auth = 'success';
            $_SESSION['auth'] = $_POST['username'];
        }

        echo $auth;
        break;
    case 'message':
        $isSentMsg = 'fail';

        if ($messenger->send($_SESSION['auth'], $_POST['message'])) {
            $isSentMsg = 'success';
            $_SESSION['message-err'] = true;
        }

        echo $isSentMsg;
        break;
    default:
        echo 'error';
}