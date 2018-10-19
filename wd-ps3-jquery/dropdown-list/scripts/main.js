const FRIENDS_LIST = {
  Antonio: 'img/antonio.png',
  Laura:   'img/laura.png',
  Lee:     'img/lee.png',
  Mark:    'img/mark.png',
  Michael: 'img/michael.png'
};

const TITLE = 'Select friend';

/* Initializes drop-down list */
(function initDropDownList(title, friends) {
  $('.dropdown-list__title').text(title);
  const friendsList = $('<ul />').attr('class', 'items');

  for (let name in friends) {
    friendsList.append(`<li><img src="${friends[name]}" alt=""><span class="friend-name">${name}</span></li>`);
  }

  $('.dropdown-list').append(friendsList);
})(TITLE, FRIENDS_LIST);

/* Listens to click on the part of the drop-down list displaying the selected item */
$('.dropdown-list__main').click(function () {
  slideList();
});

/* Listens to click on the selected item */
$('.items li').click(function () {
  $('.dropdown-list__title').css('margin-left', 0).html(this.innerHTML);
  slideList();
})

/* Listens to click outside drop-down list */
$('body').click(function(e) {
    const dropdownList = $('.dropdown-list');

    if (dropdownList.has(e.target).length === 0 && $('.items').css('display') === 'block') {
      slideList();
    }
});

/* Slides up or down drop-down list */
function slideList() {
  $('.items').slideToggle();
  $('.fa-caret-down').toggleClass('fa-rotate-180');
}
