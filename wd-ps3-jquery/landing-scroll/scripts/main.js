const SCROLL_TIME = 1500;
const linksId = ["#product", "#about-us", "#contact-us", "#register"];
const NAVIGATION_LINKS = $(".navigation").children();

function scrollPage(clckElem, scrollTo) {
  clckElem.onclick = function () {
    const animatedElem = $('html, body');
    animatedElem.animate({scrollTop: scrollTo.offset().top}, SCROLL_TIME);
  };
}

scrollPage($('#scroll-up-btn')[0], $("header"));

for (let i = 0; i < NAVIGATION_LINKS.length; i++) {
  scrollPage(NAVIGATION_LINKS[i], $(linksId[i]));
}
