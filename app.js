// variables
let deck={}; //creates a variable to save our deck in
let previousCard = 0;
let newCard = 0;
let arrayWithCards = []; //creates an array with the card to be compared
let score = 0; // points counting from 0
let cardsRemaining = 52; //52 cards deck used
let gameOn = true;

// current date
let currentdate = new Date(); 
let datetime =    currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " at "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds(); 

// id calls
const acesHighest = document.getElementById("acesHighCheckBoxId"); //checkbox allows user to decide value of ACE
const card = document.getElementById("card"); //
const lowerButton = document.getElementById("lower");
const higherButton = document.getElementById("higher");
const drawCardButton = document.getElementById("drawCard");
const newGameButton = document.getElementById("newGame");
const output = document.getElementById("output");
const aces = document.getElementById("acesCheck");
const gameInfo = document.getElementById("gameTracker");
const resetScoreButton = document.getElementById("resetScore");

// scoreboard variables and constants
const NO_OF_HIGH_SCORES = 10;
const HIGH_SCORES = "highScores";
const highScoreString = localStorage.getItem(HIGH_SCORES);
const highScores = JSON.parse(highScoreString) || [];
const highScoreList = document.getElementById(HIGH_SCORES);


// API call
const URL_BASE = "https://deckofcardsapi.com/api/deck/"

// game text object
const gameText = {
  same: "The same card - You have got a point!",
  correct: "Well done, ",
  lower: "it's lower!",
  higher: "it's higher!",
  wrong: "I'm sorry, ",
  end: "Game over!",
  win: "You Won!"
};

// invokes app start
initialize();

// gets data from API
async function getDeck(){ 
    const res = await fetch(URL_BASE +
        "new/shuffle/?deck_count=1" );
    const data = await res.json();
    deck = data; // assigns data to the deck 
    
}



// calls API and returns deck of cards
async function drawFirstCard() {
  const res = await fetch(URL_BASE + deck.deck_id + `/draw/?count=1`);
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
  const res = await fetch(URL_BASE + deck.deck_id +
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
  drawCardButton.disabled = true;
  newGameButton.disabled = true;
  enableGameButtons();
});

//button response for lower guess
lowerButton.addEventListener("click", async() => {
  await lower();
});

// button response for higher guess
higherButton.addEventListener("click", async() => {
  await higher();
});

// starts new game 
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

// starts game app 
function initialize(){
  getDeck(); // Calls the function directly
  disableGameButtons(); // disables lower and higher buttons
  showHighScores(); //shows high scores
}

// quits the game
function gameOver(){
    
    disableGameButtons()
    newGameButton.disabled = false;
    if(cardsRemaining === 0){
      gameInfo.style.color = "green";
      document.getElementById("game").innerHTML = gameText.win;
    }else{
     gameInfo.style.color = "red";
     document.getElementById("game").innerHTML = gameText.end;
    }
    checkHighScore(score);
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

// adds and dispalys points
function addPoints(){
    score++;
    document.getElementById("points").innerHTML = score;
    gameInfo.style.color = "green";
    return score;
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

// functions operating on local storage and scoreboard
function showHighScores() {
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  const highScoreList = document.getElementById("highScores");

  highScoreList.innerHTML = highScores
    .map((score) => `<li> You scored ${score.score} on ${score.datetime}</li>`)
    .join("");
}

function checkHighScore(score) {
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  const lowestScore = highScores[NO_OF_HIGH_SCORES - 1]?.score ?? 0;

  if (score > lowestScore) {
    const newScore = { score, datetime };
    saveHighScore(newScore, highScores);
    showHighScores();
  }
}

function saveHighScore(score, highScores) {
  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(NO_OF_HIGH_SCORES);
  localStorage.setItem("highScores", JSON.stringify(highScores));
}


resetScoreButton.addEventListener("click", async() => {
  await window.localStorage.clear();
  await location.reload();
});