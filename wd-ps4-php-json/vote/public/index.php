<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Vote</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="wrapper">
    <h4>Choice your favorite item:</h4>
    <form method="post" action="handler.php">
        <input type="hidden" name="vote">
        <div class="choice-options">
            <input type="radio" name="option" value="Option-1">
            <input type="radio" name="option" value="Option-2">
            <input type="radio" name="option" value="Option-3">
            <input type="radio" name="option" value="Option-4">
            <input type="radio" name="option" value="Option-5">
        </div>
        <input type="submit" value="Submit">
    </form>
</div>
</body>
</html>