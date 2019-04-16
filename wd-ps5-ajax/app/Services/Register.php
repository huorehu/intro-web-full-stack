<?php

namespace App\Services;

use App\Entities\User;
use App\Contracts\UserDatabaseInterface;

class Register
{

    private $userDatabase;

    public function __construct(UserDatabaseInterface $userDatabase)
    {
        $this->userDatabase = $userDatabase;
    }

    public function authUser($username, $password)
    {
        /* @var User $user */
        $user = $this->userDatabase->getUser($username);

        return isset($user) ?
            $user->checkPassword($password) :
            $this->userDatabase->createUser(new User($username, $password));
    }
}
