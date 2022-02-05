let deck={}; //creates a variable to save our deck in

let previousCard = 0;
let newCard = 0;
let arraywithCards = [] //creates an array with the card to be compared
let points = 0;
let cardsRemaining = 52;
let acesHighest = document.getElementById("#acesHighCheckBoxId");

const card = document.getElementById("card");
const lowerButton = document.getElementById("lower");
const higherButton = document.getElementById("higher");
const drawCardButton = document.getElementById("drawCard");
const output = document.getElementById("output");
const url_base = "https://deckofcardsapi.com/api/deck/"


async function getDeck(){ 
    const res = await fetch(url_base +
        "new/shuffle/?deck_count=1" );
    const data = await res.json();
    deck = data; // assigns data to our deck so that we can use the variable later
    
}

getDeck(); // Calls the function directly

async function drawFirstCard() {
  const res = await fetch(url_base + deck.deck_id + `/draw/?count=1`);
  const data = await res.json();
  image.setAttribute("src", data.cards[0].image);
  previousCard = convertRoyals(data.cards[0].value);
  cardsRemaining = data.remaining;
  document.getElementById("cardsRemaining").innerHTML = cardsRemaining;
  return previousCard;
}

async function drawnewCard() {
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
    document.getElementById("cardsRemaining").innerHTML = cardsRemaining;
  }
  
  return newCard;
  }

drawCardButton.addEventListener("click", async() => {
  const firstCard = await drawFirstCard();
  arraywithCards.push(firstCard);
  drawCardButton.style.visibility = "hidden";
  // drawCardButton.disabled = true;
});


lowerButton.addEventListener("click", async() => {
  await lower();
});

higherButton.addEventListener("click", async() => {
  await higher();
});

newGame.addEventListener("click", async() => { 
  await location.reload();
});

async function lower() {
  const currentCard = await drawnewCard(); // draws a card
  arraywithCards.push(currentCard); // adds the card

  if (arraywithCards[0] > arraywithCards[1]) { //compare the first card with the second
    output.textContent = "Correct, it's lower ";
    addPoints()
    
  } else if (arraywithCards[0] === arraywithCards[1]){
    output.textContent = "The same card - You have got a point!";
    addPoints()

  } else {
    output.textContent = "It's higher, game over "
    gameOver();
  }
arraywithCards.shift(); //removes the first card
}


async function higher() {
  const currentCard = await drawnewCard(); // draws a card
  arraywithCards.push(currentCard); // adds the card

  if (arraywithCards[0] < arraywithCards[1]) { //compare the first card with the second
    output.textContent = "Correct, it's higher!";
    addPoints()
   
  } else if (arraywithCards[0] === arraywithCards[1]){
    output.textContent = "The same card - You have got a point!"
    addPoints()

  } else {
    output.textContent = "It's lower, game over!"
    gameOver();
  }
arraywithCards.shift(); //removes the first card
}

function gameOver(){
    document.getElementById("game").innerHTML = "Game over!";
    lowerButton.disabled = true;
    higherButton.disabled = true;
}

function addPoints(){
    points++;
    document.getElementById("points").innerHTML = points;
}



// Check if it is between 2 and 10 in strings
// async function convertRoyals(card) {
//   switch (card) {
//       case "2":
//       case "3":
//       case "4":
//       case "5":
//       case "6":
//       case "7":
//       case "8":
//       case "9":
//       case "10":
//           return parseInt(card);

//       case 'ACE':
//           card = (acesHighest.checked) ? 14 : 1
//           break
//       case 'KING':
//           card = 13
//           break
//       case 'QUEEN':
//           card = 12
//           break
//       case 'JACK':
//           card = 11
//           break
//       default:
//           console.log("Somethings Wrong");
//           break;
//   }
//   return card
// }

async function convertRoyals(card) {
    if (card.match(/^\d+$/)) {
        return parseInt(card);
    } else {
        return {
           "ACE": $(acesHighest.checked) ? 14 : 1,
           "KING":13,
           "QUEEN":12,
           "JACK": 11
         }[card];
    }
}

