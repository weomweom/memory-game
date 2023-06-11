import React from "react";
import Board from "./Board.js";
import cardsImages from "./Cards.js";

class Game extends React.Component {
    shuffleArray() {
      for (let i = cardsImages.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [cardsImages[i], cardsImages[j]] = [cardsImages[j], cardsImages[i]];
      }
      return cardsImages;
  }
  
      render() {
          return(
              <Board
                cardsImages={this.shuffleArray()}
              />
          )
      }
  }
  
export default Game;