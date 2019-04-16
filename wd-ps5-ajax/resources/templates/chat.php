<div class="message">
    <div id="welcome-message"><span id="greet-user">Hello, <?php echo $_SESSION['auth'] ?>!</span></div>
</div>
<form class="chat">
    <input class="chat__input" type="text">
    <input class="button chat__button" type="submit" value="Send">
</form>