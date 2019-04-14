$('#welcome-message').append($('<span id="greet-user">Hello, Vasya!</span>'));
$('#greet-user').css('display', 'inline-block');
setTimeout(() => $('#greet-user').fadeOut(1000), 2000);