<?php

namespace App\Services;

class Validator
{

    public function validateAuth($username, $password)
    {
        return [
            'username' => [
                'length' => strlen($username) > 2 && strlen($username) <= 50,
                'chars' => preg_match('/^\w{3,50}$/', $username)
            ],
            'password' => [
                'length' => strlen($password) > 2,
                'chars' => preg_match('/^\w{3,100}$/', $password)
            ]
        ];
    }

    public function validateMessage($message)
    {
        $result = '';

        if (empty(trim($message))) {
            $result = 'Enter your message';
        } else if (strlen(trim($message)) > 255) {
            $result = 'Your message must contain no more than 255 characters';
        }

        return $result;
    }
}
