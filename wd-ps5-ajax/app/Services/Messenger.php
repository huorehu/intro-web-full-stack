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

    public function getNewMessages($alreadyShown) {
        $allMessages = $this->messageDatabase->getAll();
        $messageIDs = array_keys($allMessages);
        $newMessages = [];

        for ($i = $alreadyShown; $i < count($messageIDs); $i++) {
            $newMessages[$messageIDs[$i]] = $allMessages[$messageIDs[$i]];
        }

        return json_encode($newMessages, JSON_PRETTY_PRINT);
    }
}
