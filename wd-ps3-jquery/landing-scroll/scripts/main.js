const SCROLL_TIME = 1500;
const linksId = ["#product", "#about-us", "#contact-us", "#register"];

function scrollPage(clckElem, scrollTo) {
  clckElem.onclick = function () {
    $('html, body').animate({scrollTop: scrollTo.offset().top}, SCROLL_TIME);
  };
}

scrollPage($('#scroll-up-btn')[0], $('header'));

$('.navigation').children().each(function (index) {
  scrollPage(this, $(linksId[index]));
});

$(window).on('scroll', function () {
  $('#scroll-up-btn').css('display', $('html').scrollTop() == 0 ? 'none' : 'flex');
});
