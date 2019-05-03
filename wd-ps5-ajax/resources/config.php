<?php

return [
    'projectPath' => dirname(__DIR__) . DIRECTORY_SEPARATOR,
    'userDatabasePath' => dirname(__DIR__) . DIRECTORY_SEPARATOR . 'database' . DIRECTORY_SEPARATOR . 'users.json',
    'messageDatabasePath' => dirname(__DIR__) . DIRECTORY_SEPARATOR . 'database' . DIRECTORY_SEPARATOR . 'messages.json',
    'chatTemplate' => dirname(__DIR__) . DIRECTORY_SEPARATOR . 'resources' . DIRECTORY_SEPARATOR . 'templates' . DIRECTORY_SEPARATOR . 'chat.php',
    'authTemplate' => dirname(__DIR__) . DIRECTORY_SEPARATOR . 'resources' . DIRECTORY_SEPARATOR . 'templates' . DIRECTORY_SEPARATOR . 'auth.php',
    'lastHour' => 60 * 60 /* In seconds */
];
