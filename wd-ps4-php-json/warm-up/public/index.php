<?php
const MB_SIZE = 1000000;
const KB_SIZE = 1000;

session_start();
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="wrapper">
    <!-- Task-1 -->
    <div class="task">
        <h4>Task-1: calculate the sum of numbers from -1000 to 1000</h4>
        <form method="post" action="handler.php">
            <input type="hidden" name="task" value="task-1">
            <input type="submit" value="Calculate">
        </form>
        <div>
            <?php
            echo $_SESSION['task-1']['result'] ?? '';
            ?>
        </div>
    </div>

    <!-- Task-2 -->
    <div class="task">
        <h4>Task-2: calculate the sum of numbers from -1000 to 1000, adding only numbers that end with 2, 3 and 7</h4>
        <form method="post" action="handler.php">
            <input type="hidden" name="task" value="task-2">
            <input type="submit" value="Calculate">
        </form>
        <div>
            <?php
            echo $_SESSION['task-2']['result'] ?? '';
            ?>
        </div>
    </div>

    <!-- Task-3: load files -->
    <div class="task">
        <h4>Task-3: load files</h4>
        <form enctype="multipart/form-data" method="post" action="handler.php">
            <input type="hidden" name="MAX_FILE_SIZE" value="2000000">
            <input type="hidden" name="task" value="task-3">
            <h4>Choose file to upload</h4>
            <input type="file" name="selected-file" accept=".png, .jpeg">
            <input type="submit" value="Load File">
        </form>
        <form method="post" action="handler.php">
            <input type="hidden" name="task" value="task-3">
            <input type="submit" value="Show files list">
        </form>
        <div class="files-list">
            <?php
            if (isset($_SESSION['task-3'])):
                $filesList = $_SESSION['task-3']['result'];
                $arrayLength = count($_SESSION['task-3']['result']);
                $uploadDir = 'uploads' . DIRECTORY_SEPARATOR;

                for ($i = 2; $i < $arrayLength; $i++): ?>
                    <a href="<?php echo $uploadDir . $filesList[$i] ?>" download="""><?php echo $filesList[$i] ?>
                    (<?php
                    $byteSize = filesize($uploadDir . $filesList[$i]);
                    $fileSize = round(
                            $byteSize / ($byteSize >= MB_SIZE
                                                ? MB_SIZE
                                                : KB_SIZE),
                            1,
                            PHP_ROUND_HALF_UP
                    );
                    echo $fileSize . ' ' . ($byteSize >= MB_SIZE ? 'MB' : 'kB') ?>)</a>
                    <?php
                endfor;
            endif;
            ?>
        </div>
    </div>

    <!-- Task-4: draw chessboard -->
    <div class="task">
        <h4>Task-4: draw chessboard (max size 50 x 50)</h4>
        <form method="post" action="handler.php">
            <input type="hidden" name="task" value="task-4">
            <input type="text" name="width">
            <input type="text" name="height">
            <input type="submit" value="Draw chessboard">
        </form>
        <div class="chessboard">
            <?php
            if (isset($_SESSION['task-4'])):
                $chessboard = $_SESSION['task-4']['result'];

                for ($row = 0; $row < count($chessboard); $row++): ?>
                    <div class="chessboard__line">
                        <?php
                        for ($column = 0; $column < count($chessboard[$row]); $column++): ?>
                            <div class="chessboard__cell
                                    chessboard__cell_<?php echo $chessboard[$row][$column] ?>"></div>
                        <?php endfor; ?>
                    </div>
                <?php
                endfor;
            endif;
            echo $_SESSION['task-4']['error'] ?? '';
            ?>
        </div>
    </div>

    <!-- Task-5: find the sum of received number digits -->
    <div class="task">
        <h4>Task-5: find the sum of received number digits</h4>
        <form method="post" action="handler.php">
            <input type="hidden" name="task" value="task-5">
            <input type="text" name="number">
            <input type="submit" value="Sum Digits">
        </form>
        <div>
            <?php
            if (isset($_SESSION['task-5'])):
                echo $_SESSION['task-5']['result'];
            endif;
            echo $_SESSION['task-5']['error'] ?? '';
            ?>
        </div>
    </div>

    <!-- Task-6: random numbers -->
    <div class="task">
        <h4>Task-6: random numbers</h4>
        <form method="post" action="handler.php">
            <input type="hidden" name="task" value="task-6">
            <input type="submit" value="Get random">
        </form>
        <div>
            <?php
            echo $_SESSION['task-6']['result'] ?? '';
            ?>
        </div>
    </div>

    <!-- Task-7: page visitor counter -->
    <div class="task">
        <h4>Task-7: page visitor counter</h4>
        <form method="post" action="handler.php">
            <input type="hidden" name="task" value="task-7">
        </form>
        <div>You have visited this page <?php echo isset($_SESSION['session-counter'])
                ? $_SESSION['session-counter']++
                : $_SESSION['session-counter'] = 1; ?> times in this session
        </div>
    </div>

    <!-- Task-8: text analyzer -->
    <div class="task">
        <h4>Task-8: text analyzer</h4>
        <form method="post" action="handler.php">
            <input type="hidden" name="task" value="task-8">
            <textarea name="text" cols="60" rows="10"></textarea>
            <input type="submit" value="Get text info">
        </form>
        <div>
            <?php
            if (isset($_SESSION['task-8'])):
                foreach ($_SESSION['task-8']['result'] as $key => $value): ?>
                    <p><?php echo $key . ': ' . $value; ?></p>
                <?php endforeach;
            endif;
            echo $_SESSION['task-8']['error'] ?? '';
            ?>
        </div>
    </div>

    <!-- Destroy current session -->
    <div class="task">
        <h4>Destroy current session</h4>
        <form method="post" action="handler.php">
            <input type="hidden" name="task" value="destroy-session">
            <input type="submit" value="Destroy session">
        </form>
    </div>
</div>
</body>
</html>
