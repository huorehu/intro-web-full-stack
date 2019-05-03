<?php

namespace App;

use App\{
    Entities\Message,
    Contracts\MessageDatabaseInterface
};

class MessageDatabaseJSON implements MessageDatabaseInterface
{

    private $filePath;

    public function __construct($filePath)
    {
        $this->filePath = $filePath;
    }

    public function addMessage(?Message $message)
    {
        if (!isset($message)) {
            return false;
        }

        $messageJSON = [
            $message->getTime() => [
                'username' => $message->getUsername(),
                'message' => $message->getMessage()
            ]
        ];
        $messages = json_decode(file_get_contents($this->filePath), true);
        $messageID = key($messageJSON);
        $messages[$messageID] = $messageJSON[$messageID];

        return file_put_contents($this->filePath, json_encode($messages, JSON_PRETTY_PRINT));
    }

    public function getAll(): array
    {
        return json_decode(file_get_contents($this->filePath), true);
    }
}
