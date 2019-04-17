<?php

namespace App\Services;

use App\{
    Contracts\MessageDatabaseInterface,
    Entities\Message
};

class Messenger
{

    private $messageDatabase;

    public function __construct(MessageDatabaseInterface $messageDatabase)
    {
        $this->messageDatabase = $messageDatabase;
    }

    public function send($username, $message)
    {
        return $this->messageDatabase->addMessage(new Message($username, $message));
    }
}
