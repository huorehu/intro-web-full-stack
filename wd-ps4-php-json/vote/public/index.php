<?php
session_start();

require dirname(__DIR__) . DIRECTORY_SEPARATOR . "app" . DIRECTORY_SEPARATOR . "JsonDataController.php";
$config = require dirname(__DIR__) . DIRECTORY_SEPARATOR . 'config.php';
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
    <h3>Choice your favorite activity:</h3>
    <form method="post" action="handler.php">
        <input type="hidden" name="vote">
        <div class="choice-options">
            <?php
            $voteDataJson = json_decode(file_get_contents($config['jsonFileName']), true);
            $keys = array_keys($voteDataJson);

            foreach ($keys as $item):
                $idName = str_replace(" ", "", strtolower($item)); ?>
                <div class="choice-options_activity">
                    <input type="radio" name="option" id= <?php echo $idName ?> value= "<?php echo $item; ?>" >
                    <label for=<?php echo $idName; ?> > <?php echo $item; ?> </label>
                </div>
            <?php endforeach; ?>
        </div>
        <input type="submit" class="button" value="Submit">
    </form>
    <?php if (isset($_SESSION['error'])): ?>
    <div class="error"><?php echo $_SESSION['error'] ?></div>
    <?php endif;
    session_destroy();
    ?>
</div>
</body>
</html>