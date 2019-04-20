<?php
session_start();

require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'Entities' . DIRECTORY_SEPARATOR . 'User.php';
require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'Entities' . DIRECTORY_SEPARATOR . 'Message.php';
require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'Services' . DIRECTORY_SEPARATOR . 'DatabaseConnecion.php';
require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'Services' . DIRECTORY_SEPARATOR . 'Register.php';
require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'Services' . DIRECTORY_SEPARATOR . 'Messenger.php';
require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'Services' . DIRECTORY_SEPARATOR . 'Validator.php';
require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'Contracts' . DIRECTORY_SEPARATOR . 'UserDatabaseInterface.php';
require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'Contracts' . DIRECTORY_SEPARATOR . 'MessageDatabaseInterface.php';

require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'UserDatabaseSQL.php';
require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'MessageDatabaseSQL.php';

/* In seconds */
define('LAST_HOUR', (60 * 60));

use App\Services\{
    Register,
    Messenger,
    Validator
};
use App\{
    UserDatabaseSQL,
    MessageDatabaseSQL
};

define('USER_DATA_BASE_PATH', dirname(__DIR__) . DIRECTORY_SEPARATOR . 'database' . DIRECTORY_SEPARATOR . 'users.json');
define('MESSAGE_DATA_BASE_PATH', dirname(__DIR__) . DIRECTORY_SEPARATOR . 'database' . DIRECTORY_SEPARATOR . 'messages.json');

$userDatabase = new UserDatabaseSQL();
$messageDatabase = new MessageDatabaseSQL();

$register = new Register($userDatabase);
$messenger = new Messenger($messageDatabase);
$validator = new Validator();

$action = isset($_POST['action']) ? htmlspecialchars($_POST['action']) : null;

switch ($action) {
    case 'refresh':
        isset($_SESSION['auth']) ?
            require dirname(__DIR__) . DIRECTORY_SEPARATOR . 'resources' . DIRECTORY_SEPARATOR . 'templates' . DIRECTORY_SEPARATOR . 'chat.php' :
            require dirname(__DIR__) . DIRECTORY_SEPARATOR . 'resources' . DIRECTORY_SEPARATOR . 'templates' . DIRECTORY_SEPARATOR . 'auth.php';
        break;
    case 'auth':
        $username = htmlspecialchars($_POST['username']);
        $password = htmlspecialchars($_POST['password']);

        $validator->validateAuth($username, $password);

        if (!$validator->isAllCorrect()) {
            echo 'wrong-all';
        } else if (!$validator->isCorrectUsername()) {
            echo 'wrong-name';
        } else if (!$validator->isCorrectPassword()) {
            echo 'wrong-pass';
        } else if ($register->authUser($username, $password)) {
            require dirname(__DIR__) . DIRECTORY_SEPARATOR . 'resources' . DIRECTORY_SEPARATOR . 'templates' . DIRECTORY_SEPARATOR . 'chat.php';
            $_SESSION['auth'] = $username;
        } else {
            echo 'fail';
        }

        break;
    case 'message':
        $isSentMsg = 'fail';

        $message = htmlspecialchars($_POST['message']);

        if (isset($_SESSION['auth']) && $validator->validateMessage($message) && $messenger->send($_SESSION['auth'], $message)) {
            $isSentMsg = 'success';
        } else if ($validator->getErrorMessage() !== '') {
            $isSentMsg = $validator->getErrorMessage();
        }

        echo $isSentMsg;
        break;
    case 'update':
        echo $messenger->getMessages(LAST_HOUR);
        break;
    case 'is-auth':
        echo isset($_SESSION['auth']) ? 'auth' : 'fail';
        break;
    case 'logout':
        if (isset($_SESSION['auth'])) {
            session_destroy();
        }

        break;
    default:
        echo 'error';
}
