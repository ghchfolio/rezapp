let loaded = 0, r = 0, currentr = 0;
const mainbox = document.getElementById('mainbox'),
    maxboxes = mainbox.childElementCount,
    images = mainbox.getElementsByTagName('img');

//add event listener to all tiles
for (img of images) {
    img.addEventListener('load', incImgCount, false);
};

//ensure all imgs are loaded before running fx
function incImgCount() {
    loaded++;
    if (loaded === maxboxes) getRandomBox();
}

function getRandomBox() {
    r = Math.floor((Math.random() * (maxboxes - 1)) + 1);
    currentr === r ? getRandomBox() : startTrans(r);
}

//transiton (fadeOutIn)
function startTrans(r) {
    currentr = r;
    mainbox.children[r].addEventListener('animationend', animationDone, false);
    mainbox.children[r].classList.add('fadeOutInFx');
}

function animationDone() {
    mainbox.children[r].removeEventListener('animationend', animationDone);
    if (mainbox.children[r].classList.contains('fadeOutInFx')) {
        mainbox.children[r].classList.remove('fadeOutInFx');
    }
    getRandomBox();
}