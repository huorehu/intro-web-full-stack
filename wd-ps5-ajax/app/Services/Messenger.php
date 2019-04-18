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

    public function getMessages($timeForShowMessages) {
        $timeForShowMessages = time() - $timeForShowMessages;
        $allMessages = $this->messageDatabase->getAll();
        $messageIDs = array_keys($allMessages);
        $messages = [];

        for ($i = 0; $i < count($messageIDs); $i++) {
            if ($messageIDs[$i] >= $timeForShowMessages) {
                $messages[$messageIDs[$i]] = $allMessages[$messageIDs[$i]];
            }
        }

        return json_encode($messages, JSON_PRETTY_PRINT);
    }
}
