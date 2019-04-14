<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
  <title>Easy Chat</title>
</head>
<body>
<div class="wrapper">
  <header class="header">
    <div class="header-colored"></div>
    <div class="header-colored"></div>
  </header>
  <h1>Easy Chat</h1>
  <?php
//  require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'resources' . DIRECTORY_SEPARATOR . 'templates' . DIRECTORY_SEPARATOR . 'auth.php';
  require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'resources' . DIRECTORY_SEPARATOR . 'templates' . DIRECTORY_SEPARATOR . 'chat.php';
  ?>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="js/script.js"></script>
</body>
</html>