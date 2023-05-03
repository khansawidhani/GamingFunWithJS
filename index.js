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
let firstCard = "";
let secondCard = "";

const resetGame = () => {
    clickCounter = 0;
    firstCard = "";
    secondCard = "";

}
const matchCards = (firstCard, secondCard) => {
    if(firstCard === secondCard){
        return true;
    }
    return false;
}
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
    let curCard = e.target;
    if (curCard== parent)return false;
    if(clickCounter < 3){
        if(curCard.classList.contains('text')){
            curCard = curCard.parentNode.parentNode;
            console.log(curCard);
            if(!curCard.classList.contains('card-selected')){
                clickCounter++;
                curCard.classList.add('card-selected');
                firstCard = curCard.dataset.name;
                console.log(firstCard);
                
            }
            else{
                clickCounter--;
            }
        }
        else{
            curCard = curCard.parentNode;
            if(!curCard.classList.contains('card-selected')){
                clickCounter++;

                curCard.classList.add('card-selected');
                secondCard = curCard.dataset.name;
                console.log(secondCard);
            }
            else{
                clickCounter--;
            }
            // curCard.classList.add('card-tapped');
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