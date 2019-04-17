<?php

namespace App\Entities;

class Message
{

    private $username;

    private $message;

    private $time;

    public function __construct($username, $message)
    {
        $this->username = $username;
        $this->message = $message;
        $this->time = time();
    }

    public function getUsername(): string
    {
        return $this->username;
    }

    public function getMessage(): string
    {
        return $this->message;
    }

    public function getTime(): int
    {
        return $this->time;
    }
}
