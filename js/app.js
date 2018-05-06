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



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
startGame();

function startGame() {
	shuffle(cards);
	const fragment = document.createDocumentFragment();
	for ( let i = 0; i < cards.length; i++) {
		let cardEl = cards[i];
		cardEl.classList.remove("show", "open", "match");
		fragment.appendChild(cardEl);
	}
	deck.appendChild(fragment);
	
}

	

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function moveCounter() {
	
	countMoves.textContent = counter.toString();
	
	
	if (counter === 9 ) { 
		changeStar();
		}
	if (counter === 13) {
		changeStar();
		}
	if (counter === 17) {
		changeStar();
		}
		function changeStar() {
			let starList = Array.from(document.querySelectorAll('.fa-star'));
			let last = starList.length;
		starList[last-1].classList.replace('fa-star','fa-star-o');
		}
	}


 
function result() {
	let classOfFirst = firstCard.firstElementChild.className;
	let classOfSecond = secondCard.firstElementChild.className;
		if (classOfFirst == classOfSecond) {
		for (let i=0; i < openCards.length; i++) {
			openCards[i].classList.add('match');
					 }
		preA = openCards;
		openList = openList.concat(preA); 
		
	}
	else { firstCard.classList.remove('show', 'open');
		secondCard.classList.remove('show', 'open');
		
	}
openCards.splice(0,2);	
preA.splice(0,2);
firstCard=0;
secondCard=0;
counter++;
moveCounter();
deck.addEventListener('click', flipMe);

}
 
function setTimer() { 
	const fTime = setTimeout(result, 1000);

	
}
function showMe() {
	
	setTimer();
}
 
deck.addEventListener('click', flipMe);
 
function flipMe(e) {
	 if (!e.target.classList.contains('card')) return; 
	
 if (!firstCard) {
	 firstCard = e.target;
	 firstCard.classList.add('show', 'open');
	 openCards.push(firstCard);	 
 } 
	else { 
	secondCard = e.target;
	secondCard.classList.add('show','open');
	openCards.push(secondCard);
	deck.removeEventListener('click', flipMe);
	showMe();
	}
	};

restartB.addEventListener('click', restartGame);
function restartGame() {
	let counter = 0;
	countMoves.textContent = "0";
	openList.splice(0,16);
	startGame();
}