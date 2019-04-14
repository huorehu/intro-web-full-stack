<?php

class User
{
    private $name;
    private $password;

    public function __construct(String $name, String $password)
    {
        $this->name = $name;
        $this->password = $password;
    }

    public function getName() {
        return $this->name;
    }

    public function checkPassword(String $password) {
        return $this->password === $password;
    }
}
