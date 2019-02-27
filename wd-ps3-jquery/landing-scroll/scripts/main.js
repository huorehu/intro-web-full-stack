const SCROLL_TIME = 1500;
const linksId = ["#product", "#about-us", "#contact-us", "#register"];
const navigation = '.navigation';
const scrollUpBtn = '#scroll-up-btn';

function scrollPage(clckElem, scrollTo) {
    clckElem.onclick = () => $('html, body').animate({scrollTop: scrollTo}, SCROLL_TIME);
}

$(() => {
    scrollPage($(scrollUpBtn)[0], $('header').offset().top);

    $(navigation).children().each(function (index) {
        const offsetTop = $(linksId[index]).offset().top;
        const elementHeight = $(linksId[index]).outerHeight(true);
        const windowHeight = $(window).height();
        const centralPosition = (windowHeight - elementHeight) / 2;
        const scrollTo = (windowHeight < elementHeight || offsetTop < centralPosition) ? offsetTop : offsetTop - centralPosition;

        scrollPage(this, scrollTo);
    });

    $(window).on('scroll', () => $(scrollUpBtn).css('display', $('html').scrollTop() == 0 ? 'none' : 'flex'));
});
