const API_URL = 'https://picsum.photos/';
const BIG_SIZE = '600/400';
const SMALL_SIZE = '60';

const IMAGES = [
    '?image=1080',
    '?image=1079',
    '?image=1069',
    '?image=1063',
    '?image=1050',
    '?image=1039'
];

const RIGHT = 39;
const LEFT = 37;
const CURRENT_IMAGE_CLASS = 'current';

let currentImgNumber = 0;
const $sliderCurrent = $('.slider-current');
const $sliderPreviews = $('.slider-previews');

initSlider();
addEventListener('keydown', function (e) {
    showSelectedPicture(e);
});
$($sliderPreviews.children()).on('click', showCurrentImgEvn);

/* Initializes slider */
function initSlider() {
    $sliderPreviews.addClass('slider-indicators');

    const result = IMAGES.reduce((result, current, index) =>
        result + `<li class="${index === 0 ? CURRENT_IMAGE_CLASS : ''}"><img alt=${index} src=${API_URL}${SMALL_SIZE}${current}>`,
        '');

    $sliderPreviews.append(result);
}

/* Shows next/previous picture depending which arrow-key was pressed */
function showSelectedPicture(e) {
    const oldImgNumber = currentImgNumber;
    const amountImages = IMAGES.length;

    /* change current image number */
    switch (e.keyCode) {
        case RIGHT:
            currentImgNumber = ++currentImgNumber % amountImages;
            break;
        case LEFT:
            currentImgNumber = (currentImgNumber + amountImages - 1) % amountImages;
    }

    showCurrentImg(currentImgNumber, oldImgNumber);
}

/* Shows selected picture */
function showCurrentImgEvn(e) {
    const oldImgNumber = currentImgNumber;

    currentImgNumber = $(e.currentTarget).children().attr('alt') * 1;
    showCurrentImg(currentImgNumber, oldImgNumber);

}

/* Removes old image and adds selected */
function showCurrentImg(currentImgNumber, oldImgNumber) {
    const $listPreviews = $sliderPreviews.children();
    const $img = $sliderCurrent.children();

    $img.attr('src', `${API_URL}${BIG_SIZE}/${IMAGES[currentImgNumber]}`);
    $img.attr('alt', `${currentImgNumber}`);
    $($listPreviews[oldImgNumber]).removeClass(CURRENT_IMAGE_CLASS);
    $($listPreviews[currentImgNumber]).addClass(CURRENT_IMAGE_CLASS);
}
