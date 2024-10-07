const totalCards = 36;
const cardValues = Array.from({ length: totalCards / 2 }, (_, i) => i + 1).flatMap(value => [value, value]);
let shuffledCards = [];
let flippedCards = [];
let matchedPairs = 0;

const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');

function initializeGame() {
    shuffledCards = shuffle([...cardValues]);
    gameBoard.innerHTML = '';
    matchedPairs = 0;
    flippedCards = [];
    createCards();
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCards() {
    shuffledCards.forEach((value, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.value = value;
        card.addEventListener('click', () => flipCard(card));
        gameBoard.appendChild(card);
    });
}

function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        card.innerText = card.dataset.value;
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;
    if (firstCard.dataset.value === secondCard.dataset.value) {
        matchedPairs++;
        if (matchedPairs === totalCards / 2) {
            setTimeout(() => alert("Congratulations! You've matched all cards!"), 500);
        }
    } else {
        firstCard.classList.remove('flipped');
        firstCard.innerText = '';
        secondCard.classList.remove('flipped');
        secondCard.innerText = '';
    }
    flippedCards = [];
}

resetButton.addEventListener('click', initializeGame);
initializeGame();
