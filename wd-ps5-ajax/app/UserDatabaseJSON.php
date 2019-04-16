<?php

namespace App;

use App\Entities\User;
use App\Contracts\UserDatabaseInterface;

class UserDatabaseJSON implements UserDatabaseInterface
{

    private $filePath;

    public function __construct($filePath)
    {
        $this->filePath = $filePath;
    }

    public function createUser(User $user)
    {
        $allUsersData = json_decode(file_get_contents($this->filePath), true);
        $userData = [
            $user->getName() => [
                'name' => $user->getName(),
                'password' => $user->getPassword()
            ]
        ];
        $allUsersData[$user->getName()] = $userData[$user->getName()];

        return file_put_contents($this->filePath, json_encode($allUsersData, JSON_PRETTY_PRINT));
    }

    public function getUser($username): ?User
    {
        $user = json_decode(file_get_contents($this->filePath), true)[$username];

        return isset($user) ? new User($user['name'], $user['password'], false) : null;
    }
}