<?php

namespace App\Entities;

class Message
{

    private $message;

    private $time;

    public function __construct($message, $time)
    {
        $this->message = $message;
        $this->time = $time;
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
