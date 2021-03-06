/*
 * Create a list that holds all of your cards
 */
let card = document.getElementsByClassName('card');
let cards = [...card];
let firstCard = 0;
let secondCard = 0;
let openCards = [];
let openList = [];
let preA = [];
const stars = document.querySelector('.stars');
const deck = document.querySelector('.deck');
deck.innerHTML = '';
const countMoves = document.querySelector('.moves');
let counter = 0;
countMoves.textContent = "0";
const restartB = document.querySelector('.restart');
let seconds = 0,
    minutes = 0;
let secs, mins;
let clearTime;
const modal = document.getElementById('modal');
const closeMe = document.querySelector('.close-btn');
const playAgain = document.querySelector('.play-again');
const contemplate = document.querySelector('.contemplate');
let stats = document.querySelector('.stats');
let starRate = 3;




//@description Shuffle function from http://stackoverflow.com/a/2450976 
 function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//TODO: Loop to create card HTML and add it to page
//TODO: start game & event listener
function startGame() {
    shuffle(cards);
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < cards.length; i++) {
        let cardEl = cards[i];
        cardEl.classList.remove('show', 'open', 'match', 'disabled');
        fragment.appendChild(cardEl);
    }
    deck.appendChild(fragment);
    startWatch();
    deck.addEventListener('click', flipMe);

}
//@description StopWatch for the game, on 60 min restarts 
function startWatch() {
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    mins = (minutes < 10) ? (`0 ${minutes} :`) : (`${minutes} : `);
    if (minutes === 60) {
        restartGame();
    }
    secs = (seconds < 10) ? (`0 ${seconds}`) : (seconds);
    const timer = document.querySelector('.timer');
    timer.innerHTML = ` ${mins} ${secs}`;
    seconds++;
    clearTime = setTimeout("startWatch( )", 1000);
};
//TODO: call the function to start game
startGame();

//@description Puts 2 cards in array, adds classes to show content
function flipMe(e) {
    if (openCards.length < 2) {
        if (!e.target.classList.contains('card')) return;

        if (!firstCard) {
            firstCard = e.target;
            firstCard.classList.add('show', 'open', 'disabled');
            openCards.push(firstCard);
        } else {
            secondCard = e.target;
            secondCard.classList.add('show', 'open', 'disabled');
            openCards.push(secondCard);
            showMe();
        }
    }
};

function showMe() {
    setTimer();
}
//@description Set timer for cards to close
function setTimer() {
    const fTime = setTimeout(result, 750);
}
//@description Check  and compare card content, match or close
function result() {
    let classOfFirst = firstCard.firstElementChild.className;
    let classOfSecond = secondCard.firstElementChild.className;
    if (classOfFirst == classOfSecond) {
        for (let i = 0; i < openCards.length; i++) {
            openCards[i].classList.add('match', 'disabled');
        }
        preA = openCards;
        openList = openList.concat(preA);

    } else {
        firstCard.classList.remove('show', 'open', 'disabled');
        secondCard.classList.remove('show', 'open', 'disabled');

    }
    openCards.splice(0, 2);
    preA.splice(0, 2);
    firstCard = 0;
    secondCard = 0;
    counter++;
    moveCounter();
	
	//@description Condition for game end
    if (openList.length == 16) {
        clearTimeout(clearTime);
        stats.innerHTML = ` Time: ${mins}${secs}. Moves: ${counter}. Star rating: ${starRate} `;
        modal.style.display = 'block';

    }
   
};
//@description Counter and stars functionallity 
function moveCounter() {
	
    countMoves.textContent = counter.toString();

    if (counter === 12) {
        changeStar();
		starRate = 2;
    }
    if (counter === 18) {
        changeStar();
		starRate = 1;
    }
  
    function changeStar() {
        let starList = Array.from(document.querySelectorAll('.fa-star'));
        let last = starList.length;
        starList[last - 1].classList.replace('fa-star', 'fa-star-o');
    }
}

//@description Event listener for restart button
restartB.addEventListener('click', restartGame);

function restartGame() {
    let starsBack = Array.from(document.querySelectorAll('.fa-star-o'));
    for (i = 0; i < starsBack.length; i++) {
        starsBack[i].classList.replace('fa-star-o', 'fa-star');
    }
    counter = 0;
    countMoves.textContent = "0";
    openList.splice(0, 16);
	openCards.splice(0,2);
	firstCard = 0;
	secondCard = 0;
    clearTimeout(clearTime);
    minutes = 0, seconds = 0;
    mins = '00 :';
    secs = '00';
	starRate = 3;
    startGame();
}
//@description Event listeners for modal input fields
closeMe.addEventListener('click', closeModal);

function closeModal() {
    modal.style.display = 'none';
}
playAgain.addEventListener('click', seriously);

function seriously() {
    restartGame();
    modal.style.display = 'none';
}
contemplate.addEventListener('click', doThat);

function doThat() {
    document.body.style.display = 'none';
}