<?php

namespace App\Entities;

class User
{

    private $name;

    private $password;

    public function __construct(string $name, string $password, bool $doHash = true)
    {
        $this->name = $name;
        $this->password = $doHash ?
            password_hash($password, PASSWORD_BCRYPT) :
            $password;
    }

    public function getName() {
        return $this->name;
    }

    public function getPassword() {
        return $this->password;
    }

    public function checkPassword(string $password) {
        return password_verify($password, $this->password);
    }
}
