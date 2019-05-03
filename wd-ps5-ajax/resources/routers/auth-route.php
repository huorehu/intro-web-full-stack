<?php

use App\Services\{
    Register,
    Validator
};
use App\UserDatabaseJSON;

$username = htmlspecialchars($_POST['username']);
$password = htmlspecialchars($_POST['password']);

$userDatabase = new UserDatabaseJSON($config['userDatabasePath']);
$register = new Register($userDatabase);
$validator = new Validator();

$result = $validator->validateAuth($username, $password);

$response = [];

if ($result['username']['length'] && $result['username']['chars'] &&
    $result['password']['length'] && $result['password']['chars']) {
        $response['success'] = $register->authUser($username, $password);
        $_SESSION['auth'] = $username;
        $_SESSION['greet'] = true;
} else {
    $response = $result;
    $response['success'] = false;
}

header("Content-type:application/json");
echo json_encode($response, JSON_PRETTY_PRINT);
