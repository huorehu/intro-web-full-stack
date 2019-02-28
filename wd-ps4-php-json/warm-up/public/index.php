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
                <input type="hidden" name="task" value="load-file">
                <input type="file" name="fil">
                <input type="submit" value="Load File">
            </form>
            <div>
                <?php
                    echo $_SESSION['task-3'] ?? '';
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
                                            chessboard__cell_<?php echo $chessboard[$row][$column]?>"></div>
                            <?php endfor; ?>
                            </div>
                            <?php
                        endfor;
                    endif; ?>
            </div>
        </div>


    </div>
    <?php
        session_destroy();
    ?>
</body>
</html>
