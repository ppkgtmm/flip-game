const imgArr = [
    'anonymus.png',
    'bear.png',
    'chicken.png',
    'gem.png',
    'pig.png',
    'sword.png',
    'whale.png',
    'wolf.png',
]
const fullScore = 8
const retries = 12

function getRandomImage(index) {
    let imgIndex = -1
    if (index.length > 0) {
        imgIndex = index[Math.floor(Math.random() * index.length)]
    }
    return imgIndex
}

function setUp(game) {
    let index = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    let imgIndex = getRandomImage(index)
    while (imgIndex != -1) {
        game.push(imgIndex % 8)
        index.splice(index.indexOf(imgIndex), 1)
        imgIndex = getRandomImage(index)
    }
}


function displayCover(message) {
    const msg = document.querySelector('.message')
    const cover = document.querySelector('.cover')
    const game = document.querySelector('.game')
    const start = document.getElementById('start')
    msg.innerHTML = message
    start.innerText = 'restart'
    cover.style.transition = 'display 4s ease-in-out'
    cover.style.display = 'flex'
    game.style.display = 'none'
}

function flipBack(indices) {
    setTimeout(() => {
        for (const index of indices) {
            const block = document.querySelectorAll('.block')[index]
            block.style.backgroundImage = 'none'
            block.style.pointerEvents = 'auto'
        }
    }, 1000)
}

function checkForMatch(game, current) {
    if (game.prev === -1) {
        game.prev = current
        return
    }
    if (game.game[game.prev] === game.game[current]) {
        game.score++
    }
    else {
        game.wrong++
        document.querySelector('.retries .count').innerText = retries - game.wrong
        flipBack([game.prev, current])
    }
    if (game.wrong === retries) {
        displayCover('Game Over !!!')
    }
    else if (game.score === fullScore) {
        displayCover('You Win !!!')
    }
    game.prev = -1
}

function handlerWithParams(game, blocks) {
    return function eventListener() {
        const { target } = event
        const current = blocks.indexOf(target)
        target.style.pointerEvents = 'none'
        target.style.backgroundImage = `url(img/${imgArr[game.game[current]]})`
        target.style.backgroundSize = 'cover'
        checkForMatch(game, current)
    }
}
function render_game() {
    const game = {
        game: [],
        prev: -1,
        score: 0,
        wrong: 0
    }
    const blocks = Array.from(document.querySelectorAll('.block'))
    setUp(game.game)
    document.querySelector('.retries .count').innerText = retries - game.wrong
    blocks.forEach((block) => {
        block.style.backgroundImage = 'none'
        block.style.pointerEvents = 'auto'
        block.addEventListener('click', handlerWithParams(game, blocks))
    })
}

const start = document.getElementById('start')
start.addEventListener('click', () => {
    window.location = window.location
    render_game()
})
render_game()
