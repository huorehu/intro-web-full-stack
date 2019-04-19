<?php

namespace App\Services;

class Validator
{

    private $isCorrectUsername = false;
    private $isCorrectPassword = false;
    private $errorMessage = '';

    public function validateAuth($username, $password)
    {
        $this->isCorrectUsername = strlen($username) > 2 && strlen($username) <= 50;
        $this->isCorrectPassword = strlen($password) > 2;
    }

    public function validateMessage($message)
    {
        if (empty(trim($message))) {
            $this->errorMessage = 'Enter your message';
        } else if (strlen(trim($message)) > 255) {
            $this->errorMessage = 'Your message must contain no more than 255 characters';
        }

        return empty($this->errorMessage);
    }

    public function isAllCorrect()
    {
        return $this->isCorrectUsername && $this->isCorrectPassword;
    }

    public function isCorrectUsername()
    {
        return $this->isCorrectUsername;
    }

    public function isCorrectPassword()
    {
        return $this->isCorrectPassword;
    }

    public function getErrorMessage()
    {
        return $this->errorMessage;
    }
}
