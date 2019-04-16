<?php
session_start();

require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'Entities' . DIRECTORY_SEPARATOR . 'User.php';
require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'Services' . DIRECTORY_SEPARATOR . 'Register.php';
require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'Contracts' . DIRECTORY_SEPARATOR . 'UserDatabaseInterface.php';
require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'UserDatabaseJSON.php';

use App\Services\Register;
use App\UserDatabaseJSON;

define('USER_DATA_BASE_PATH', dirname(__DIR__) . DIRECTORY_SEPARATOR . 'database' . DIRECTORY_SEPARATOR . 'users.json');
define('MESSAGE_DATA_BASE_PATH', dirname(__DIR__) . DIRECTORY_SEPARATOR . 'database' . DIRECTORY_SEPARATOR . 'messages.json');
$userDatabase = new UserDatabaseJSON(USER_DATA_BASE_PATH);

$register = new Register($userDatabase);

switch ($_POST['action']) {
    case 'auth':
        $auth = 'fail';

        if ($register->authUser($_POST['username'], $_POST['password'])) {
            $auth = 'success';
            $_SESSION['auth'] = $_POST['username'];
        }

        echo $auth;
        break;
    default:
        echo 'error';
}