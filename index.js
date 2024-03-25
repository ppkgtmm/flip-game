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

function getRandomImage(index) {
    // initialize default return value
    let imgIndex = -1;
    // check if the index array is not empty
    if (index.length > 0) {
        // get a random index from the array
        imgIndex = index[Math.floor(Math.random() * index.length)];
    }
    // return the random index or default value
    return imgIndex;
}

function setUp(game) {
    // initialize an array with numbers from 0 to 15, representing index of tiles
    let index = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    // get a random image index
    let imgIndex = getRandomImage(index);
    // loop until image index array become empty
    while (imgIndex != -1) {
        // add the random image index to the end of the game array
        game.push(imgIndex % 8);
        // remove the used image index from the original index array
        index.splice(index.indexOf(imgIndex), 1);
        // get a new random image index from the updated index array
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
    if(game.wrong == 5) {
        displayCover('Game Over !!!');
    }
    else if(game.score == 8){
        displayCover('You Win !!!');
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
        })
    })
}

render_game()
