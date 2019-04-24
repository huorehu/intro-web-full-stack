<?php
session_start();

require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'Entities' . DIRECTORY_SEPARATOR . 'User.php';
require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'Entities' . DIRECTORY_SEPARATOR . 'Message.php';
require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'Services' . DIRECTORY_SEPARATOR . 'DatabaseConnection.php';
require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'Services' . DIRECTORY_SEPARATOR . 'Register.php';
require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'Services' . DIRECTORY_SEPARATOR . 'Messenger.php';
require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'Services' . DIRECTORY_SEPARATOR . 'Validator.php';
require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'Services' . DIRECTORY_SEPARATOR . 'Logger.php';
require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'Contracts' . DIRECTORY_SEPARATOR . 'UserDatabaseInterface.php';
require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'Contracts' . DIRECTORY_SEPARATOR . 'MessageDatabaseInterface.php';

require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'UserDatabaseSQL.php';
require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'MessageDatabaseSQL.php';

/* In seconds */
define('LAST_HOUR', (60 * 60));

use App\Services\{
    Register,
    Messenger,
    Validator,
    Logger
};
use App\{
    UserDatabaseSQL,
    MessageDatabaseSQL
};

define('LOG_FILE_PATH', dirname(__DIR__) . DIRECTORY_SEPARATOR . 'resources' . DIRECTORY_SEPARATOR . 'log.txt');

$userDatabase = new UserDatabaseSQL();
$messageDatabase = new MessageDatabaseSQL();

$register = new Register($userDatabase);
$messenger = new Messenger($messageDatabase);
$validator = new Validator();
$logger = new Logger(LOG_FILE_PATH);

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
        $actionResult = '';

        if ($validator->isAllIncorrect()) {
            $actionResult = 'wrong-all';
        } else if (!$validator->isCorrectUsername()) {
            $actionResult = 'wrong-name';
        } else if (!$validator->isCorrectPassword()) {
            $actionResult = 'wrong-pass';
        } else if ($register->authUser($username, $password)) {
            require dirname(__DIR__) . DIRECTORY_SEPARATOR . 'resources' . DIRECTORY_SEPARATOR . 'templates' . DIRECTORY_SEPARATOR . 'chat.php';
            $_SESSION['auth'] = $username;
            $_SESSION['userID'] = $userDatabase->getUserID($username);
            $actionResult = 'success';
        } else {
            $actionResult = 'fail';
        }

        $_SESSION['ip'] = $_SERVER['REMOTE_ADDR'];
        $userID = isset($_SESSION['userID']) ? $_SESSION['userID'] : '-';

        $logger->logging('authorization', $actionResult, '-', $_SESSION['ip'], $userID);

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
        $logger->logging('sending message', 'sent', '-', $_SESSION['ip'], $_SESSION['userID']);
        break;
    case 'update':
        echo $messenger->getMessages(LAST_HOUR);
        break;
    case 'is-auth':
        echo isset($_SESSION['auth']) ? 'auth' : 'fail';
        break;
    case 'logout':
        if (isset($_SESSION['auth'])) {
            $logger->logging('logout', 'success', 'user left chat', $_SESSION['ip'], $_SESSION['userID']);
            session_destroy();
        }

        break;
    case 'user-data':
        echo json_encode([
            'userID' => $_SESSION['userID'],
            'ip' => $_SESSION['ip']
        ], JSON_PRETTY_PRINT);
        header("Content-type:application/json");
        break;
    default:
        echo 'error';
}
