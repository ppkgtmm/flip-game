const imgArr = [
    'anonymus.png',
    'bear.png',
    'chicken.png',
    'gem.png',
    'pig.png',
    'sword.png',
    'whale.png',
    'wolf.png',
];
const fullScore = 8;
const retries = 12;

function getRandomImage(index) {
    let imgIndex = -1;
    if (index.length > 0) {
        imgIndex = index[Math.floor(Math.random() * index.length)];
    }
    return imgIndex;
}

function setUp(game) {
    let index = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    let imgIndex = getRandomImage(index);
    while (imgIndex != -1) {
        game.push(imgIndex % 8);
        index.splice(index.indexOf(imgIndex), 1);
        imgIndex = getRandomImage(index);
    }
}

async function flip(target) {
    setTimeout(() => {
        target.style.backgroundImage = 'none';
        target.style.pointerEvents = 'auto';
    }, 1500);
}

function displayCover(message) {
    const msg = document.querySelector('.message');
    const cover = document.querySelector('.cover');
    const game = document.querySelector('.game');
    msg.innerHTML = message
    cover.style.transition = 'display 4s ease-in-out';
    cover.style.display = 'flex'
    game.style.display = 'none'
}

function checkForMatch(target, game, current) {
    if (!game.prev) {
        target.style.pointerEvents = 'none';
        game.prev = { target, tile: current };
        return
    }
    if (game.prev.tile === current) {
        target.style.pointerEvents = 'none';
        game.score++;
    }
    else {
        game.wrong++;
        flip(game.prev.target);
        flip(target);
    }
    game.prev = null;
}


function render_game() {
    const game = {
        game: [],
        prev: null,
        score: 0,
        wrong: 0
    }
    const blocks = Array.from(document.querySelectorAll('.block'));
    setUp(game.game);
    blocks.forEach((block) => {
        block.addEventListener('click', () => {
            const { target } = event;
            const current = game.game[blocks.indexOf(target)]
            target.style.backgroundImage = `url(img/${imgArr[current]})`;
            target.style.backgroundSize = 'cover';
            checkForMatch(target, game, current);
            if (game.wrong == retries) {
                displayCover('Game Over !!!');
            }
            else if (game.score == fullScore) {
                displayCover('You Win !!!');
            }
        })
    })
}

render_game()
