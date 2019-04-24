<?php

namespace App\Services;

use DateTime;

class Logger
{
    private $logPathFile;

    public function __construct($logPathFile)
    {
        $this->logPathFile = $logPathFile;
    }

    public function logging($service, $level, $message, $ip, $userID)
    {
        $log = json_encode([
            'time' => (new DateTime())->format('d-m-y h:i:s'),
            'service' => $service,
            'level' => $level,
            'message' => $message,
            'ip' => $ip,
            'userID' => $userID
        ]) . "\n";

        file_put_contents($this->logPathFile, $log, FILE_APPEND);
    }
}
