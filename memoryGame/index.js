let cardData = [
    {
        name: 'diet',
        img: "/images/diet.png"
    },
    {
        name: 'egg',
        img: "/images/egg.png"
    }, {
        name: 'health-insurance',
        img: "/images/health-insurance.png"
    }, {
        name: 'heart-rate',
        img: "/images/heart-rate.png"
    }, {
        name: 'ping-pong',
        img: "/images/ping-pong.png"
    }, {
        name: 'shower',
        img: "/images/shower.png"
    }, {
        name: 'smartwatch',
        img: "/images/smartwatch.png"
    }, {
        name: 'tooth',
        img: "/images/tooth.png"
    },
];
let gameCardData = cardData.concat(cardData);
const parent = document.querySelector('.inner-wrapper');
const moves = document.getElementById('moves');
const btn = document.getElementById('btn');



let clickCounter = 0;
let movesCounter = 0;
let minutes = 0;
let seconds = 0;
let firstCardName = "";
let secondCardName = "";
let startGame = false;
let buttonName = startGame ? 'Stop Game' : 'Start Game';
let firstCard;
let secondCard;
moves.innerText = movesCounter;
btn.innerText = buttonName;
const currentCard = curCard => curCard.classList.contains('text') ? curCard.parentNode.parentNode : curCard.parentNode;
const resetGame = () => {
    clickCounter = 0;
    firstCard = "";
    secondCard = "";
    firstCardName = "";
    secondCardName = "";
}

const matchCards = (firstCardName, secondCardName) => firstCardName === secondCardName ? true : false;
let shuffle = (array) => {
    let randomIndex;
    for (let x = array.length - 1; x >= 0; x--) {
        randomIndex = Math.floor(Math.random() * (x + 1)); // generating random index
        [array[x], array[randomIndex]] = [array[randomIndex], array[x]]; // shuffling an the current index
    }
    return array;
}
let shuffleCards = shuffle(gameCardData);
function timer() {
    if (minutes < 3) {
        setInterval(() => {
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
            }
            else {
                seconds++;
            }

            console.log(minutes + ':' + seconds);
            document.getElementById('seconds').innerText = seconds < 10 ? `0${seconds.toString()}` : seconds.toString();
            document.getElementById('mins').innerText =  `0${minutes.toString()}`;
        }, 1000);
    }
    else {
        console.log('Time Out');
    }
}

btn.addEventListener('click', () => {
    startGame = !startGame;
    buttonName = startGame ? 'Stop Game' : 'Start Game';
    btn.innerText = buttonName;
    if (startGame) {
        timer();
        parent.addEventListener('click', (e) => {
            let el = e.target;
            let curCard = currentCard(el);
            if (curCard == parent) return false;
            clickCounter++;
            movesCounter++;
            moves.innerText = movesCounter.toString();
            if (clickCounter <= 2) {
                if (curCard.classList.contains('back-card')) {clickCounter--;movesCounter--}
                else {
                    curCard.classList.add('card-selected');
                    if (clickCounter == 1) {
                        firstCardName = curCard.dataset.name;
                        firstCard = curCard;
                    }
                    else {
                        secondCardName = curCard.dataset.name;
                        secondCard = curCard;

                        if (matchCards(firstCardName, secondCardName)) {
                            setTimeout(() => {
                                firstCard.classList.remove('card-selected');
                                secondCard.classList.remove('card-selected')
                                firstCard.classList.add('card-matched');
                                secondCard.classList.add('card-matched');
                                resetGame();
                            }, 2000);
                        }
                        else {
                            setTimeout(() => {
                                firstCard.classList.remove('card-selected');
                                secondCard.classList.remove('card-selected');
                                movesCounter++;
                                moves.innerText = movesCounter.toString();
                                resetGame();
                            }, 2000);
                        }

                    }

                }

            }
        });
        if(card.classList.contains('card-matched')){
            stopTimer();
            startGame = false;
        }

    }
    else{
        stopTimer();
        startGame = false;
    }
});


// generating card-grid
for (let i = 0; i < shuffleCards.length; i++) {
    // creates new card
    let card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = gameCardData[i].name;
    card.dataset.image = gameCardData[i].img;
    //creates back-side 
    let backCard = document.createElement('div');
    backCard.classList.add('back-card');
    // creates image tag
    let img = document.createElement('img');
    img.classList.add('image');
    img.setAttribute('src', card.dataset.image);
    // creates text-node
    let guess = document.createElement('h1');
    guess.classList.add('text');
    let textNode = document.createTextNode('?');
    guess.appendChild(textNode);
    // creates front-side
    let frontCard = document.createElement('div');
    frontCard.classList.add('front-card');
    // append all tags
    backCard.appendChild(img);
    frontCard.appendChild(guess);
    card.appendChild(frontCard);
    card.appendChild(backCard);

    parent.appendChild(card);
}