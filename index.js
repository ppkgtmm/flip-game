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

let index = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
let game = [];
let guess = [];
let score = 0;

function getImage() {
    let imgIndex = -1;
    if(index.length>0)
    {
        imgIndex = index[Math.floor(Math.random()*index.length)];
        
    }
    return imgIndex;
}
function setUp() {
    let imgIndex = getImage();
    while(imgIndex!=-1)
    {
        game.push(imgIndex%8);
        index.splice(index.indexOf(imgIndex),1);
        imgIndex = getImage();

    }
}

function enableClick(target) {
    target.style.pointerEvents = 'auto';
}
function disableClick(target) {
    target.style.pointerEvents = 'none';
}

async function flip(target) {
    setTimeout(() => {
        target.style.backgroundImage = 'none';
        enableClick(target);
    }, 500);

}

function displayWin() {
    const winmsg = document.querySelector('.message');
    const header = document.querySelector('.header');
    // console.log(winmsg);
    winmsg.style.zIndex = 33;
    winmsg.style.top = '50%';
    winmsg.style.transition = 'all 1s';
    header.innerHTML = 'Congratulations'

}
function checkForMatch(target) {
    if(guess.length===0){
        disableClick(target);
        guess.push(target);
    }
    else if(guess.length%2===1) {
        const last = guess.pop();
        const lastImgIndex = game[last.id]%8;
        const currentImgIndex = game[target.id]%8;
        if(lastImgIndex!==currentImgIndex){
            flip(last);
            flip(target);
            }
        else
        {
            if(last.id!== target.id)
            {
                score++;
                console.log(score);
                disableClick(last);
                disableClick(target);
                if(score===8)
                {
                    displayWin();
                }
            }
            else{
                enableClick(target);
            }
        }
    }
    else{
        guess.push(target);
    }

}
setUp();
const blocks = Array.from(document.querySelectorAll('.block'));
// console.log(blocks);
blocks.forEach((block)=>{
    block.addEventListener('click',handleClick)
})
function handleClick(event) {
    const {target} = event;
    const imgUrl = imgArr[game[blocks.indexOf(target)]];
    target.style.backgroundImage = `url(img/${imgUrl})`;
    target.style.backgroundSize = 'cover';
    checkForMatch(target);
    
}
