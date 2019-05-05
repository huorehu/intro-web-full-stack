<?php

return [
    'username' => 'shpp-user',
    'password' => '1111',
    'servername' => 'localhost',
    'dbname' => 'chatdb',
    'projectPath' => dirname(__DIR__) . DIRECTORY_SEPARATOR,
    'chatTemplate' => dirname(__DIR__) . DIRECTORY_SEPARATOR . 'resources' . DIRECTORY_SEPARATOR .
        'templates' . DIRECTORY_SEPARATOR . 'chat.php',
    'authTemplate' => dirname(__DIR__) . DIRECTORY_SEPARATOR . 'resources' . DIRECTORY_SEPARATOR .
        'templates' . DIRECTORY_SEPARATOR . 'auth.php',
    'lastHour' => 60 * 60 /* In seconds */
];