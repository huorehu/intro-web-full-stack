const FRIENDS_LIST = {
    Antonio: 'img/antonio.png',
    Laura: 'img/laura.png',
    Lee: 'img/lee.png',
    Mark: 'img/mark.png',
    Michael: 'img/michael.png'
};

const TITLE = 'Select friend';
/* Constants for selectors */
const dropDownListTitle = '.dropdown-list__title';
const dropDownListMain = '.dropdown-list__main';
const dropDownList = '.dropdown-list';
const items = '.items';
const items_li = '.items li';

$(function () {
    const $DROPDOWN_TITLE = $(dropDownListTitle);
    /* Initializes drop-down list */
    (function initDropDownList(title, friends) {
        $DROPDOWN_TITLE.text(title);
        const friendsList = $('<ul />').attr('class', 'items');

        for (let name in friends) {
            friendsList.append(
                `<li>
                    <img src="${friends[name]}" alt="friend">
                    <span class="friend-name">${name}</span>
                 </li>`);
        }

        $(dropDownList).append(friendsList);
    })(TITLE, FRIENDS_LIST);
    const $ITEMS = $(items);

    /* Listens to click on the part of the drop-down list displaying the selected item */
    $(dropDownListMain).on('click', function () {
        $ITEMS.stop(true, true);
        slideList();
        clearHover($ITEMS[0].children);
        paintSelectedItem();
    });

    /* Paints selected item */
    function paintSelectedItem() {
        const FRIEND_NAME = $('.dropdown-list__title > .friend-name')[0];

        if (!FRIEND_NAME) {
            return;
        }

        const FRIEND_NAME_TEXT = FRIEND_NAME.innerText;

        for (item of $ITEMS[0].children) {
            if (item.innerText === FRIEND_NAME_TEXT) {
                item.classList.add('items_hovered');
            }
        }
    }

    /* Listens to click on the selected item */
    $(items_li).on('click', function () {
        $DROPDOWN_TITLE.css('margin-left', 0).html(this.innerHTML);
        clearHover($ITEMS[0].children);
        this.classList.add('items_hovered');
        slideList();
        $ITEMS.stop(true, true);
    });

    $ITEMS.hover(
        function (e) {
            clearHover(e.currentTarget.children);
        },
        function (e) {
            e.target.classList.add('items_hovered');
        });

    /* Listens to click outside drop-down list */
    $('body').on('click', function (e) {
        const dropdownList = $(dropDownList);

        if (dropdownList.has(e.target).length === 0 && $ITEMS.css('display') === 'block') {
            slideList();
        }
    });

    /* Slides up or down drop-down list */
    function slideList() {
        $ITEMS.slideToggle();
        $('.fa-caret-down').toggleClass('fa-rotate-180');
    }

    /* Clears all painted items */
    function clearHover(itemsList) {
        for (item of itemsList) {
            item.classList.remove('items_hovered');
        }
    }
});
