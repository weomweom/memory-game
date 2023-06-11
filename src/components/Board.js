import React from "react";
import Card from "./Card.js";

class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cards: Array(16).fill(false),
            cardsImages: props.cardsImages,
            winningCombo: [],
            moves: 0,
            activeCards: [],
            isWin: false,
            winningInfo: ''
        }
    }

    handleClick(i) {
      let currentCards = this.state.cards;
      let activeCards = currentCards.filter((card) => card);
      const cardsValue = this.state.cardsImages.map(card => card.value);
      let winningCombo = this.state.winningCombo;
      const updatedCards = Array(16).fill(false);

      clearTimeout();

      if(currentCards[i])
        return;

      if (activeCards.length < 2 && !winningCombo.includes(i)) {
        currentCards[i] = true;
        activeCards = currentCards.filter((card) => card);
        this.setState({activeCards: activeCards});
      }
      else return;

      if (!winningCombo.includes(i))
        this.setState({moves: this.state.moves + 1});

      if (activeCards.length === 2) {
        const indexOfActiveCards = [currentCards.indexOf(true), currentCards.indexOf(true, currentCards.indexOf(true) + 1)];
        if(cardsValue[indexOfActiveCards[0]] === cardsValue[indexOfActiveCards[1]]){
          winningCombo = [...winningCombo, indexOfActiveCards[0], indexOfActiveCards[1]];
          setTimeout(() => this.setState({winningCombo: winningCombo}), 500);
          setTimeout(() => this.setState({cards: updatedCards}), 750);
        } else {
          setTimeout(() => this.setState({cards: updatedCards}), 750);
          return;
        }
      }

      if(winningCombo.length === 16) {
        setTimeout(() => this.setState({isWin: true}), 300);
        setTimeout(() => this.setState({winningInfo: "you won!"}), 300);
      }
    }

    renderCard(i, column) {
      let isWinningIndex = false;
      if(this.state.winningCombo.includes(i))
        isWinningIndex = true;

      return <Card 
        isActive={this.state.cards[i]} 
        onClick={() => this.handleClick(i)}
        cardImage={this.state.cardsImages[i].url}
        isWinningIndex={isWinningIndex}
        isWin={this.state.isWin}
        key={i}
        />;
    }

    render() {
        return ( 
            <div className="board">
              <div className="winningInfo">
                {this.state.winningInfo}
                <button onClick={() => window.location.reload()}>new game</button>
              </div>
                {[0,1,2,3].map((row) => (
                    <div key={row}>
                    {[0,1,2,3].map((column) => (
                        this.renderCard(row*4 + column, column)
                    ))}
                    </div>
                ))}
                <div className="moves">moves: {this.state.moves}</div>
            </div>
        );
    }
}

export default Board;