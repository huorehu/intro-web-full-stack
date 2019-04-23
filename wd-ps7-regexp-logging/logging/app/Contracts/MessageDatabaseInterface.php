<?php

namespace App\Contracts;

use App\Entities\Message;

interface MessageDatabaseInterface
{
    public function addMessage(Message $message);

    public function getAll();
}
