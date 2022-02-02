let deck={}; //creates a variable to save our deck in

let previousCard = 0;
let newCard = 0;
let arraywithCards = [] //creates an array with the card to be compared
let points = 0;

const card = document.getElementById("card");
const lowerButton = document.getElementById("lower");
const higherButton = document.getElementById("higher");
const drawCardButton = document.getElementById("drawCard");
const output = document.getElementById("output");
const sameCardbutton = document.getElementById("sameCard");

async function getDeck(){ 
    const res = await fetch(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1" );
    const data = await res.json();
    deck = data; // assigns data to our deck so that we can use the variable later
    
}

getDeck(); // Calls the function directly

async function drawFirstCard() {
  const res = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
  const data = await res.json();
  image.setAttribute("src", data.cards[0].image);
  previousCard = convertRoyals(data.cards[0].value);
  
  return previousCard;
}

async function drawnewCard() {
  const res = await fetch(
      `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
  const data = await res.json();
  image.setAttribute("src", data.cards[0].image);
  newCard = data.cards[0].value;
  newCard = convertRoyals(newCard);
  return newCard;
  }

drawCardButton.addEventListener("click", async() => {
  const firstCard = await drawFirstCard();
  arraywithCards.push(firstCard);
  drawCardButton.disabled = true;
});


lowerButton.addEventListener("click", async() => {
  await lower();
});

higherButton.addEventListener("click", async() => {
  await higher();
});

sameCardbutton.addEventListener("click", async() =>{
  await sameCard();
});

async function lower() {
  const currentCard = await drawnewCard(); // draws a card
  arraywithCards.push(currentCard); // adds the card

  if (arraywithCards[0] > arraywithCards[1]) { //compare the first card with the second
    output.textContent = "correct, it's lower L";
    points++;
    document.getElementById("points").innerHTML = points;
    return points;
    
  } else if (arraywithCards[0] === arraywithCards[1]){
    output.textContent = "the same card - no points L"
  } else {
    output.textContent = "it's higher, game over L"
  }
arraywithCards.shift(); //removes the first card
}


async function higher() {
  const currentCard = await drawnewCard(); // draws a card
  arraywithCards.push(currentCard); // adds the card

  if (arraywithCards[0] < arraywithCards[1]) { //compare the first card with the second
    output.textContent = "correct, it's higher H";
    points++;
    document.getElementById("points").innerHTML = points;
    return points;   
  } else if (arraywithCards[0] === arraywithCards[1]){
    output.textContent = "the same card - no points H"
  } else {
    output.textContent = "it's lower, game over H"
  }
arraywithCards.shift(); //removes the first card
}

async function sameCard() {
  const currentCard = await drawnewCard(); // draws a card


  arraywithCards.push(currentCard);

  if (arraywithCards[0] === arraywithCards[1]) {
    output.textContent = "Correct, it was the same card S"
    points++;
    document.getElementById("points").innerHTML = points;
    return points; 
  } else if (arraywithCards[0] < arraywithCards[1]){
    output.textContent = "Sorry it was higher - game over S"
  } else {
    output.textContent = "sorry it was lower - game over S"
  }
  arraywithCards.shift(); //removes the first card
}

// Check if it is between 2 and 10 in strings
async function convertRoyals(card) {
  switch (card) {
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "10":
          return parseInt(card);

      case 'ACE':
          card = 14
          break
      case 'KING':
          card = 13
          break
      case 'QUEEN':
          card = 12
          break
      case 'JACK':
          card = 11
          break
      default:
          console.log("Somethings Wrong");
          break;
  }
  return card
}



