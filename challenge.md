<!-- challenge.md -->
# Web Developer Technical Challenge
Develop a webapp for a ‘higher or lower’ card guessing game.

Using the deck of cards api [DeckOfCardsAPI.com](https://deckofcardsapi.com/) generate a new deck of cards and save the
deck_id for use throughout the game. Draw a card from the deck and present this to the user.

After the first card has been presented; the user should be able to guess if the next card will be
lower or higher in value. Once submitting the guess, the application should draw another card from
the deck and check if the users guess was correct.

If the guess was correct, increment the current score and allow the user to guess the next card until
the deck is empty. If the guess was incorrect the game should end; informing the user they lost,
presenting the current game score, and giving an option to play again.

Aces can be either high or low, this decision should be presented to the user.

The same value drawn consecutively should be considered a win for either a higher or lower guess.

Bonus points for keeping track of the user’s best score across multiple attempts / sessions.

The UI and styling of the application is entirely up to you.

The tech stack used is up to you; you can use vanilla JavaScript, or a framework of your choice. The
source code for the project should be submitted to us either via a git repository or sent directly via
email.