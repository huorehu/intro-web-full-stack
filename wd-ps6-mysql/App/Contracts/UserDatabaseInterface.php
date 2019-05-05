<?php

namespace App\Contracts;

use App\Entities\User;

interface UserDatabaseInterface
{
    public function createUser(User $user);

    public function getUser($username);
}
