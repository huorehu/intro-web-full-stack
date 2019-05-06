<?php

use App\Services\{Logger, Register, Validator};
use App\UserDatabaseSQL;

$username = htmlspecialchars($_POST['username']);
$password = htmlspecialchars($_POST['password']);

$userDatabase = new UserDatabaseSQL();
$register = new Register($userDatabase);
$validator = new Validator();
$logger = new Logger($config['logFilePath']);

$result = $validator->validateAuth($username, $password);
$response = [];
$authResult = 'fail';

if ($result['username']['length'] && $result['username']['chars'] &&
    $result['password']['length'] && $result['password']['chars']) {
        $response['success'] = $register->authUser($username, $password);
        $_SESSION['auth'] = $username;
        $response['userID'] = $userDatabase->getUserID($username);
        $_SESSION['greet'] = true;
        $authResult = 'success';
} else {
    $response = $result;
    $response['success'] = false;
    $response['userID'] = '-';
}

$_SESSION['userID'] = $response['userID'];
$_SESSION['ip'] = $_SERVER['REMOTE_ADDR'];
$response['ip'] = $_SESSION['ip'];
$logger->logging('authorization', $authResult, '-', $_SESSION['userID'], $_SESSION['ip']);

header("Content-type:application/json");
echo json_encode($response, JSON_PRETTY_PRINT);
