<?php

namespace App\Services;

use PDO;
use PDOException;

class DatabaseConnection
{

    private static $connection;

    public static function getConnection(): PDO
    {
        if (null === static::$connection) {
            $config = require dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'resources' . DIRECTORY_SEPARATOR . 'config.php';

            try {
                static::$connection = new PDO("mysql:host={$config['servername']};dbname={$config['dbname']}",
                    $config['username'],
                    $config['password'],
                    array(PDO::ATTR_PERSISTENT => true));
            } catch (PDOException $e) {
                echo "Connection failed: {$e->getMessage()}";
            }
        }

        return static::$connection;
    }

}
