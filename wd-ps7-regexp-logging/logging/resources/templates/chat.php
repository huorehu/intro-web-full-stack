<div class="message">
    <?php if (isset($_SESSION['greet'])): ?>
        <div id="welcome-message"><span id="greet-user">Hello, <?php echo $_SESSION['auth'] ?>!</span></div>
    <?php
    endif;
    unset($_SESSION['greet']);
    ?>
    <div id="message-block"></div>
</div>
<form class="chat" id="chat">
    <input class="chat__input" type="text">
    <input class="button chat__button" id="send-msg" type="submit" value="Send">
</form>
<form id="logout">
    <input class="logout__button button" type="submit" value="Logout">
</form>
