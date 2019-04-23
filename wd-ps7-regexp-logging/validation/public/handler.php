<?php

$regExp = [
    'ip-validate' => '/^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/',
    'email-validate' => '/^\w{1,50}@\w{1,50}(\.[a-z]{2,4}){1,2}$/',
    'url-validate' => '/^https?:\/\/(w{3}\.)?\w+(\.[a-z]{2,10}){1,5}(\/\w*)*$/',
    'date-validate' => '/^([1-9]|(0[1-9])|1[0-2])\/([1-9]|(0[1-9])|([12]\d)|(3[01]))\/(?!0{4})\d{4}$/',
    'time-validate' => '/^([01]\d|2[0-3])(:([0-5]\d)){2}$/'
];

$route = htmlspecialchars($_POST['route']);
$input = htmlspecialchars($_POST['input']);

echo preg_match($regExp[$route], $input) ? 'success' : 'error';
