const FRIENDS_LIST = {
    Antonio: 'img/antonio.png',
    Laura: 'img/laura.png',
    Lee: 'img/lee.png',
    Mark: 'img/mark.png',
    Michael: 'img/michael.png'
};

const $dropdownListTitle = $('.dropdown-list__title');
const $dropdownListMain = $('.dropdown-list__main');
const $dropdownList = $('.dropdown-list');

const TITLE = 'Select friend';

    $(function () {
    /* Initializes drop-down list */
    (function initDropDownList(title, friends) {
        $dropdownListTitle.text(title);
        const friendsList = $('<ul />').attr('class', 'items');

        for (let name in friends) {
            friendsList.append(
                `<li>
                    <img src="${friends[name]}" alt="friend">
                    <span class="friend-name">${name}</span>
                 </li>`);
        }

        $($dropdownList).append(friendsList);
    })(TITLE, FRIENDS_LIST);
    const $items = $('.items');

    /* Listens to click on the part of the drop-down list displaying the selected item */
        $dropdownListMain.on('click', function () {
        if ($dropdownList[0].clientHeight === 50 || $dropdownList[0].clientHeight === 300) {
            slideList();
        }

        clearHover($items[0].children);
        paintSelectedItem();
    });

    /* Paints selected item */
    function paintSelectedItem() {
        const FRIEND_NAME = $('.dropdown-list__title > .friend-name')[0];

        if (!FRIEND_NAME) {
            return;
        }

        const FRIEND_NAME_TEXT = FRIEND_NAME.innerText;

        for (item of $items[0].children) {
            if (item.innerText === FRIEND_NAME_TEXT) {
                item.classList.add('items_hovered');
            }
        }
    }

    /* Listens to click on the selected item */
    $('.items li').on('click', function () {
        $dropdownListTitle.css('margin-left', 0).html(this.innerHTML);
        clearHover($items[0].children);
        this.classList.add('items_hovered');

        if ($dropdownList[0].clientHeight === 300) {
            slideList();
        }
    });

        $items.hover(
        function (e) {
            clearHover(e.currentTarget.children);
        },
        function (e) {
            e.target.classList.add('items_hovered');
        });

    /* Listens to click outside drop-down list */
    $('body').on('click', function (e) {
        if ($dropdownList.has(e.target).length === 0 && $items.css('display') === 'block'
            && $dropdownList[0].clientHeight === 300) {
            slideList();
        }
    });

    /* Slides up or down drop-down list */
    function slideList() {
        $items.slideToggle();
        $('.fa-caret-down').toggleClass('fa-rotate-180');
    }

    /* Clears all painted items */
    function clearHover(itemsList) {
        for (item of itemsList) {
            item.classList.remove('items_hovered');
        }
    }
});
