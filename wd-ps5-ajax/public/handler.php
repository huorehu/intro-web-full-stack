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

/* In seconds */
define('LAST_HOUR', (60 * 60));

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
    case 'refresh':
        echo isset($_SESSION['auth']) ?
            require dirname(__DIR__) . DIRECTORY_SEPARATOR . 'resources' . DIRECTORY_SEPARATOR . 'templates' . DIRECTORY_SEPARATOR . 'chat.php' :
            require dirname(__DIR__) . DIRECTORY_SEPARATOR . 'resources' . DIRECTORY_SEPARATOR . 'templates' . DIRECTORY_SEPARATOR . 'auth.php';
        break;
    case 'auth':
        $auth = 'fail';

        if ($register->authUser($_POST['username'], $_POST['password'])) {
            $auth = require dirname(__DIR__) . DIRECTORY_SEPARATOR . 'resources' . DIRECTORY_SEPARATOR . 'templates' . DIRECTORY_SEPARATOR . 'chat.php';
            $_SESSION['auth'] = $_POST['username'];
        }

        echo $auth;
        break;
    case 'message':
        $isSentMsg = 'fail';

        if ($messenger->send($_SESSION['auth'], $_POST['message'])) {
            $isSentMsg = 'success';
        }

        echo $isSentMsg;
        break;
    case 'update':
        echo $messenger->getMessages(LAST_HOUR);
        break;
    case 'is-auth':
        echo isset($_SESSION['auth']) ? 'auth' : 'fail';
        break;
    default:
        echo 'error';
}
