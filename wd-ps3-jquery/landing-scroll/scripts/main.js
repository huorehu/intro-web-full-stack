function scrollPage(clckElem, scrollTo) {
  clckElem.click(function () {
    const animatedElem = $('html, body');
    animatedElem.animate({scrollTop: 0}, 1000);
  });
}

scrollPage($('#scroll-up-btn'), 0);
