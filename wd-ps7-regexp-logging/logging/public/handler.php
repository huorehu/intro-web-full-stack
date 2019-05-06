<?php
session_start();

$config = require dirname(__DIR__) . DIRECTORY_SEPARATOR . 'resources' . DIRECTORY_SEPARATOR . 'config.php';

spl_autoload_register(function($className) {
    require dirname(__DIR__) . DIRECTORY_SEPARATOR . str_replace('\\', DIRECTORY_SEPARATOR, $className) . '.php';
});

$route = isset($_POST['route']) ? htmlspecialchars($_POST['route']) : null;

switch ($route) {
    case 'auth':
        require $config['routesPath'] . 'auth-route.php';
        break;
    case 'message':
        require $config['routesPath'] . 'message-route.php';
        break;
    case 'logout':
        require $config['routesPath'] . 'logout-route.php';
        break;
    default:
        http_response_code(404);
}
