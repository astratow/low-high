# Higher or Lower Card Game - Web Developer Challenge

This project is a web-based card game, "Higher or Lower," developed as part of a technical challenge. The game uses the [Deck of Cards API](https://deckofcardsapi.com/) to simulate a deck of cards and provide an engaging, interactive experience.

---

## **Game Description**

In "Higher or Lower," the goal is to guess whether the next card in a deck will have a higher or lower value than the current card. The game continues until either the deck is empty or the player makes an incorrect guess.

### **Gameplay Overview**

1. **Deck Initialization**:
   - A new shuffled deck is fetched using the Deck of Cards API.
   - The `deck_id` is stored for subsequent API calls.

2. **First Card**:
   - The first card is drawn from the deck and displayed to the user.

3. **User Input**:
   - The user guesses whether the next card will be higher or lower in value.
   - The game draws a new card and compares it to the previous card.

4. **Scoring**:
   - A correct guess increments the score, and the game proceeds to the next round.
   - If the user guesses incorrectly, the game ends, showing the final score.

5. **Game Rules**:
   - Aces can be either high or low, as per the user's preference.
   - Drawing two consecutive cards of the same value results in a win for either guess (higher or lower).

6. **Game End**:
   - If the deck is empty, the user wins.
   - If the user makes an incorrect guess, they lose, and the final score is displayed.

7. **Replay Option**:
   - The user can start a new game at any time.

---

## **Features**

- **Dynamic Card Drawing**:
  - Cards are fetched dynamically from the Deck of Cards API during gameplay.

- **Customizable Aces**:
  - Players can set Aces as either high (`14`) or low (`1`).

- **Score Tracking**:
  - Keeps track of the user's score within a session.

- **High Scores**:
  - Saves the top 10 scores across sessions using `localStorage`.

- **Interactive UI**:
  - A simple, intuitive interface with buttons for user inputs and visual feedback for card values and scores.

- **Resilient Design**:
  - Handles edge cases like empty decks and API errors gracefully.

---

## **Technology Stack**

- **Frontend**:
  - HTML, CSS, JavaScript (Vanilla)
- **API**:
  - [Deck of Cards API](https://deckofcardsapi.com/)

---

## **How to Run the Project**

1. Clone the repository:
   ```bash
   git clone https://github.com/astratow/low-high
   cd <repository-directory>

