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
let clickCounter = 0;
let firstCardName = "";
let secondCardName = "";
let firstCard;
let secondCard;
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

parent.addEventListener('click', (e) => {
    let el = e.target;
    let curCard = currentCard(el);
    if (curCard == parent) return false;
    clickCounter++;
    if (clickCounter <= 2) {
        console.log(curCard);
        if (curCard.classList.contains('back-card')) clickCounter--;
        else {
            curCard.classList.add('card-selected');
            if (clickCounter == 1) {
                firstCardName = curCard.dataset.name;
                firstCard = curCard;
            }
            else {
                secondCardName = curCard.dataset.name;
                secondCard = curCard;
                console.log(secondCardName);
                console.log(matchCards(firstCardName, secondCardName));
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
                        resetGame();
                    }, 2000);
                }

            }

        }

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