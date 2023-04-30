
const flipCard = document.querySelector('.flip-card');
const flipCardInnerBox = document.querySelector('.flip-inner-box');

// flip card on click
flipCard.addEventListener('click', () => {
    console.log('clicked');
    flipCardInnerBox.classList.toggle('clicked');
});



 