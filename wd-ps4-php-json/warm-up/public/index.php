<?php
    session_start();
?>

<!DOCTYPE html>
<html>
<body>
    <!-- Task-1 -->
    <label for="">Task-1</label>
    <form method="POST" action="handler.php">
        <input type="text" name="text">
        <input type="submit" name="task" value="Submit">
    </form>
    <div>
        <?php
            echo $_SESSION['text'];
        ?>
    </div>

    <!-- Task-2 -->
    <label for="text">Task-2</label>
    <form method="POST" action="handler.php">
        <input type="text" name="text">
        <input type="submit" name="task" value="Submit">
    </form>
    <div>
        <?php
            echo $_SESSION['text'];
        ?>
    </div>

    <!-- Task-3 -->
    <label for="text">Task-3</label>
    <form method="POST" action="handler.php">
        <input type="text" name="text">
        <input type="submit" name="task" value="Submit">
    </form>
    <div>
        <?php
            echo $_SESSION['text'];
        ?>
    </div>

</body>
</html>
