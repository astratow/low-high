// variables
let deck={}; //creates a variable to save our deck in
let previousCard = 0;
let newCard = 0;
let arrayWithCards = [] //creates an array with the card to be compared
let score = 0; // points counting from 0
let cardsRemaining = 52; //52 cards deck used


// id calls
const acesHighest = document.getElementById("#acesHighCheckBoxId"); //checkbox allows user to decide value of ACE
const card = document.getElementById("card"); //
const lowerButton = document.getElementById("lower");
const higherButton = document.getElementById("higher");
const drawCardButton = document.getElementById("drawCard");
const newGameButton = document.getElementById("newGame");
const output = document.getElementById("output");
const aces = document.getElementById("acesCheck");

const NO_OF_HIGH_SCORES = 10;
const HIGH_SCORES = 'highScores';
const highScoreString = localStorage.getItem(HIGH_SCORES);
const highScores = JSON.parse(highScoreString) || [];
const highScoreList = document.getElementById(HIGH_SCORES);

// API call
const url_base = "https://deckofcardsapi.com/api/deck/"

// game text object
const gameText = {
  same: "The same card - You have got a point!",
  correct: "Well done, ",
  lower: "it's lower!",
  higher: "it's higher!",
  wrong: "I'm sorry, ",
  end: "Game over!"
};


async function getDeck(){ 
    const res = await fetch(url_base +
        "new/shuffle/?deck_count=1" );
    const data = await res.json();
    deck = data; // assigns data to the deck 
    
}

getDeck(); // Calls the function directly
disableGameButtons(); // disables lower and higher buttons

// calls API and returns deck of cards
async function drawFirstCard() {
  const res = await fetch(url_base + deck.deck_id + `/draw/?count=1`);
  const data = await res.json();
  image.setAttribute("src", data.cards[0].image);
  previousCard = convertRoyals(data.cards[0].value);
  cardsRemaining = data.remaining;
  aces.style.visibility = "hidden";
  displayRemainingCard();
  return previousCard;
}

// calls API and draws a card
async function drawNewCard() {
  const res = await fetch(url_base + deck.deck_id +
      `/draw/?count=1`);
  const data = await res.json();
  image.setAttribute("src", data.cards[0].image);
  newCard = data.cards[0].value;
  newCard = convertRoyals(newCard);
  cardsRemaining = data.remaining;
  if(cardsRemaining===0){
    gameOver();
  } else{
    displayRemainingCard();
  }
  return newCard;
  }

drawCardButton.addEventListener("click", async() => {
  const firstCard = await drawFirstCard();
  arrayWithCards.push(firstCard);
  drawCardButton.style.visibility = "hidden";
  newGameButton.style.visibility = "hidden";

  enableGameButtons();
});


lowerButton.addEventListener("click", async() => {
  await lower();
});

higherButton.addEventListener("click", async() => {
  await higher();
});

// starts new game by refreshing page
newGameButton.addEventListener("click", async() => { 
  await location.reload();
});

// deals with click lower
async function lower() {
  const currentCard = await drawNewCard(); // draws a card
  arrayWithCards.push(currentCard); 
  if (arrayWithCards[0] > arrayWithCards[1]) { 
    output.textContent = gameText.correct + gameText.lower;
    addPoints();
  } else if (arrayWithCards[0] === arrayWithCards[1]){
    output.textContent = gameText.same;
    addPoints();
  } else {
    output.textContent =  gameText.wrong + gameText.higher;
    gameOver();
  }
arrayWithCards.shift(); //removes the first card
}

// deals with click higher
async function higher() {
  const currentCard = await drawNewCard(); // draws a card
  arrayWithCards.push(currentCard); // adds the card
  if (arrayWithCards[0] < arrayWithCards[1]) { //compare the first card with the second
    output.textContent = gameText.correct + gameText.higher;
    addPoints();
  } else if (arrayWithCards[0] === arrayWithCards[1]){
    output.textContent = gameText.same;
    addPoints();
  } else {
    output.textContent = gameText.wrong + gameText.lower;
    gameOver();
  }
arrayWithCards.shift(); //removes the first card
}

// quits the game
function gameOver(){
    document.getElementById("game").innerHTML = gameText.end;
    disableGameButtons()
    newGameButton.style.visibility = "visible";
    checkHighScore(account.score);
}

// disables game functionality
function disableGameButtons(){
  lowerButton.disabled = true;
  higherButton.disabled = true;
}

// enables game functionality
function enableGameButtons(){
  lowerButton.disabled = false;
  higherButton.disabled = false;
}

// adds and dispalyspoints
function addPoints(){
    score++;
    document.getElementById("points").innerHTML = score;
}

// displays number of cards in the deck
function displayRemainingCard(){
  document.getElementById("cardsRemaining").innerHTML = cardsRemaining;
}

// converts cards value into integer
async function convertRoyals(card) {
    if (card.match(/^\d+$/)) {
        return parseInt(card);
    } else {
        return {
           "ACE": (acesHighest.checked) ? 14 : 1,
           "KING":13,
           "QUEEN":12,
           "JACK": 11
         }[card];
    }
}

function checkHighScore(score) {
  const highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) || [];
  const lowestScore = highScores[NO_OF_HIGH_SCORES-1].score || 0;
  
  if (score > lowestScore) {
    saveHighScore(score, highScores);
    showHighScores(); 
  }
}

function saveHighScore(score, highScores) {
  const name = prompt('You got a highscore! Enter name:');
  const newScore = { score, name  };
  
  // 1. Add to list
  highScores.push(newScore);

  // 2. Sort the list
  highScores.sort((a, b) => b.score-a.score);
  
  // 3. Select new list
  highScores.splice(NO_OF_HIGH_SCORES);
  
  // 4. Save to local storage
  localStorage.setItem(HIGH_SCORES, JSON.stringify(highScores));
};
highScoreList.innerHTML = highScores.map((score) => 
  `<li>${score.score} - ${score.name}`
);