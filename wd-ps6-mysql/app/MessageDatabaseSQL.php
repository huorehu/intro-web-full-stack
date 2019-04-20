<?php

namespace App;

use App\{Contracts\MessageDatabaseInterface, Entities\Message, Services\DatabaseConnection};
use PDO;

class MessageDatabaseSQL implements MessageDatabaseInterface
{

    private $dbConnection;

    public function __construct()
    {
        $this->dbConnection = DatabaseConnection::getConnection();
    }

    public function addMessage(Message $message)
    {
        $sqlMessage = 'INSERT INTO messages (messageid, message, userid) VALUES (:messageid, :message, :userid)';
        $stmt = $this->dbConnection->prepare($sqlMessage);
        return $stmt->execute([
                    'messageid' => $message->getTime(),
                    'message' => $message->getMessage(),
                    'userid' => $message->getUsername()
               ]);
    }

    public function getAll()
    {
        $sqlMessage = 'SELECT messageid, message, name FROM messages INNER JOIN users ON users.id=messages.userid;';
        $stmt = $this->dbConnection->prepare($sqlMessage);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $responseDB = $stmt->fetchAll();
        $messages = [];

        for ($i = 0; $i < count($responseDB); $i++) {
            $currentMsg = $responseDB[$i];
            $messages[$currentMsg['messageid']] = ['message' => $currentMsg['message'], 'username' => $currentMsg['name']];
        }

        return $messages;
    }
}
