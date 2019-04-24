<?php

namespace App;

use App\{
    Contracts\UserDatabaseInterface,
    Services\DatabaseConnection,
    Entities\User
};
use PDO;

class UserDatabaseSQL implements UserDatabaseInterface
{
    /* @var PDO $dbConnection */
    private $dbConnection;

    public function __construct()
    {
        $this->dbConnection = DatabaseConnection::getConnection();
    }

    public function createUser(User $user)
    {
        $sqlUser = 'INSERT INTO users (name, password) VALUES (:username, :pass)';
        $stmt = $this->dbConnection->prepare($sqlUser);
        return $result = $stmt->execute([
                    'username' => $user->getName(),
                    'pass' => $user->getPassword()
               ]);
}

    public function getUser($username): ?User
    {
        $sqlUser = 'SELECT name, password FROM users WHERE name=:username';
        $stmt = $this->dbConnection->prepare($sqlUser);
        $stmt->execute(['username' => $username]);
        $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);

        if ($result) {
            return count($responseDB = $stmt->fetchAll()) !== 0 ?
                new User($responseDB[0]['name'], $responseDB[0]['password'], false) :
                null;
        }

        return null;
    }

    public function getUserID($username): int
    {
        $sqlUser = 'SELECT id FROM users WHERE name=:username';
        $stmt = $this->dbConnection->prepare($sqlUser);
        $stmt->execute(['username' => $username]);
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        return count($responseDB = $stmt->fetch()) !== 0 ? $responseDB['id'] : -1;
    }
}
