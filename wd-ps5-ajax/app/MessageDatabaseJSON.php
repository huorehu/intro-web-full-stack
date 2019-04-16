<?php

namespace App;

use App\Contracts\MessageDatabaseInterface;

class MessageDatabaseJSON implements MessageDatabaseInterface
{

    private $filePath;

    public function __construct($filePath)
    {
        $this->filePath = $filePath;
    }

    public function addMessage(Message $message)
    {
        // TODO: Implement addMessage() method.
    }

    public function getAll()
    {
        // TODO: Implement getAll() method.
    }
}
