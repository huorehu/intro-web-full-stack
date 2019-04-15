<?php
session_start();

require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'Register.php';

use \app\Register;

$register = new Register();

switch ($_POST['action']) {
    case 'auth':
        $auth = 'fail';

        if ($register->authUser($_POST['username'], $_POST['password'])) {
            $auth = 'success';
            $_SESSION['auth'] = true;
        }

        echo $auth;
        break;
    default:
        echo 'error';
}