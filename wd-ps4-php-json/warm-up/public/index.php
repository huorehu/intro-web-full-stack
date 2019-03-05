<?php
session_start();
?>

<!DOCTYPE html>
<html>
<link rel="stylesheet" href="style.css">
<body>
<div class="wrapper">
    <!-- Task-1 -->
    <div class="task">
        <h4>Task-1: calculate the sum of numbers from -1000 to 1000</h4>
        <form method="POST" action="handler.php">
            <input type="hidden" name="task" value="sum-numbers">
            <input type="submit" value="Calculate">
        </form>
        <div>
            <?php
            echo $_SESSION['task-1'] ?? '';
            ?>
        </div>
    </div>

    <!-- Task-2 -->
    <div class="task">
        <h4>Task-2: calculate the sum of numbers from -1000 to 1000, adding only numbers that end with 2, 3 and 7</h4>
        <form method="POST" action="handler.php">
            <input type="hidden" name="task" value="sum-numbers237">
            <input type="submit" value="Calculate">
        </form>
        <div>
            <?php
            echo $_SESSION['task-2'] ?? '';
            ?>
        </div>
    </div>

    <!-- Task-3: load files -->
    <div class="task">
        <h4>Task-3: load files</h4>
        <form enctype="multipart/form-data" method="POST" action="handler.php">
            <input type="hidden" name="MAX_FILE_SIZE" value="300000">
            <input type="hidden" name="task" value="load-file">
            <h4>Choose file to upload</h4>
            <input type="file" name="selected-file" accept=".png, .jpeg" multiple>
            <input type="submit" value="Load File">
        </form>
        <form method="POST" action="handler.php">
            <input type="hidden" name="task" value="print-files">
            <input type="submit" value="Show files list">
        </form>
        <div class="files-list">
            <?php
            if (isset($_SESSION['files-list'])) {
                $filesList = $_SESSION['files-list'];
                $arrayLength = count($_SESSION['files-list']);

                for ($i = 2; $i < $arrayLength; $i++): ?>
                    <a href="<?php echo $filesList[$i] ?>/"><?php echo $filesList[$i] ?></a>
                <?php
                endfor;
            }
            ?>
        </div>
    </div>

    <!-- Task-4: draw chessboard -->
    <div class="task">
        <h4>Task-4: draw chessboard</h4>
        <form method="POST" action="handler.php">
            <input type="hidden" name="task" value="draw-chessboard">
            <input type="text" name="width">
            <input type="text" name="height">
            <input type="submit" value="Draw chessboard">
        </form>
        <div class="chessboard">
            <?php
            $chessboard = $_SESSION['task-4'];

            if (isset($chessboard)):
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
            endif; ?>
        </div>
    </div>

    <!-- Task-5: find the sum of received number digits -->
    <div class="task">
        <h4>Task-5: finds the sum of received number digits</h4>
        <form method="POST" action="handler.php">
            <input type="hidden" name="task" value="sum-digits">
            <input type="text" name="number">
            <input type="submit" value="Sum Digits">
        </form>
        <div>
            <?php
            echo $_SESSION['task-5'] ?? '';
            ?>
        </div>
    </div>

    <!-- Task-6: random numbers -->
    <div class="task">
        <h4>Task-6: random numbers</h4>
        <form method="POST" action="handler.php">
            <input type="hidden" name="task" value="random-numbers">
            <input type="submit" value="Get random">
        </form>
        <div>
            <?php
            echo $_SESSION['task-6'] ?? '';
            ?>
        </div>
    </div>

    <!-- Task-7: page visitor counter -->
    <div class="task">
        <h4>Task-7: page visitor counter</h4>
        <form method="POST" action="handler.php">
            <input type="hidden" name="task" value="count-visitors">
        </form>
        <div>You have visited this page <?php echo $_SESSION['task-7'] ?? ''; ?> times in this session
        </div>
    </div>

    <!-- Task-8: text analyzer -->
    <div class="task">
        <h4>Task-8: text analyzer</h4>
        <form method="POST" action="handler.php">
            <input type="hidden" name="task" value="analyze-text">
            <textarea cols="60" rows="10"></textarea>
            <input type="submit" value="Get text info">
        </form>
        <div>
            <?php
            echo $_SESSION['task-8'] ?? '';
            ?>
        </div>
    </div>
</div>
<?php
session_destroy();
?>
</body>
</html>
