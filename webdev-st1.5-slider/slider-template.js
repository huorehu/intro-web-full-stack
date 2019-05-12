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
    let result = '';

    $sliderPreviews.addClass('slider-indicators');

    for (let i = 0; i < IMAGES.length; i++) {
        result += `<li class="${i === 0 ? 'current' : ''}"><img alt=${i} src=${API_URL}${SMALL_SIZE}${IMAGES[i]}>`;
    }

    $sliderPreviews.append(result);
}

/* Shows next/previous picture depending which arrow-key was pressed */
function showSelectedPicture(e) {
    const oldImgNumber = currentImgNumber;

    /* change current image number */
    switch (e.key) {
        case 'ArrowRight':
            currentImgNumber = ++currentImgNumber % IMAGES.length;
            break;
        case 'ArrowLeft':
            currentImgNumber = (currentImgNumber + IMAGES.length - 1) % IMAGES.length;
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

    $sliderCurrent.empty();
    $sliderCurrent.append(`<img src=${API_URL}${BIG_SIZE}/${IMAGES[currentImgNumber]} alt=${currentImgNumber}>`);
    $($listPreviews[oldImgNumber]).removeClass('current');
    $($listPreviews[currentImgNumber]).addClass('current');
}
