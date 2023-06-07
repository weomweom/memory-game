import React from "react";
import "./style.css";
import el1_0 from "./img/el1-0.jpg";
import el1_1 from "./img/el1-1.jpg";
import el2_0 from "./img/el2-0.jpg";
import el2_1 from "./img/el2-1.jpg";
import el3_0 from "./img/el3-0.jpg";
import el3_1 from "./img/el3-1.jpg";
import el4_0 from "./img/el4-0.jpg";
import el4_1 from "./img/el4-1.jpg";
import el5_0 from "./img/el5-0.jpg";
import el5_1 from "./img/el5-1.jpg";
import el6_0 from "./img/el6-0.jpg";
import el6_1 from "./img/el6-1.jpg";
import el7_0 from "./img/el7-0.jpg";
import el7_1 from "./img/el7-1.jpg";
import el8_0 from "./img/el8-0.jpg";
import el8_1 from "./img/el8-1.jpg";

function App() {
  return (
    <div className="App">
      <Game/>
    </div>
  );
}

class Game extends React.Component {
  shuffleArray() {
    let cardsImages = [
      {
        url:el1_0,
        value: 1
      }, 
      {
        url:el1_1,
        value: 1
      },
      {
        url:el2_0,
        value: 2
      }, 
      {
        url:el2_1,
        value: 2
      },
      {
        url:el3_0,
        value: 3
      }, 
      {
        url:el3_1,
        value: 3
      },
      {
        url:el4_0,
        value: 4
      }, 
      {
        url:el4_1,
        value: 4
      },
      {
        url:el5_0,
        value: 5
      }, 
      {
        url:el5_1,
        value: 5
      },
      {
        url:el6_0,
        value: 6
      }, 
      {
        url:el6_1,
        value: 6
      },
      {
        url:el7_0,
        value: 7
      }, 
      {
        url:el7_1,
        value: 7
      },
      {
        url:el8_0,
        value: 8
      }, 
      {
        url:el8_1,
        value: 8
      }
    ];

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

class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeCards: 0,
            cards: Array(16).fill(false),
            cardsImages: props.cardsImages,
            winningCombo: Array(2).fill(-1),
        }
    }

    handleClick(i) {
      const currentCards = this.state.cards;
      const activeCards = currentCards.filter((card) => card);
      let updatedCards = [...currentCards];
      const cardsValue = this.state.cardsImages.map(card => card.value);

      if (activeCards.length < 2) {
        updatedCards[i] = !updatedCards[i];
        this.setState({cards: updatedCards});
      } else {
        const indexOfActiveCards = [currentCards.indexOf(true), currentCards.indexOf(activeCards[1], currentCards.indexOf(true) + 1)];
        if(cardsValue[indexOfActiveCards[0]].value === cardsValue[indexOfActiveCards[1]].value)
          console.log("dziala");
        updatedCards = Array(16).fill(false);
        updatedCards[i] = !updatedCards[i];
        this.setState({cards: updatedCards});
      }
    }

    renderCard(i, column) {
      return <Card 
        isActive={this.state.cards[i]} 
        onClick={() => this.handleClick(i)}
        cardImage={this.state.cardsImages[i].url}
        key={i}
        />;
    }

    render() {
        return ( 
            <div className="board">
                {[0,1,2,3].map((row) => (
                    <div key={row}>
                    {[0,1,2,3].map((column) => (
                        this.renderCard(row*4 + column, column)
                    ))}
                    </div>
                ))}
            </div>
        );
    }
}

class Card extends React.Component {
    handleClick = () => {
        this.props.onClick();
    }

    render() {
        const style = {backgroundImage: this.props.isActive ? `url(${this.props.cardImage})` : `url(${require('./img/hidden.jpg')})` };
        return ( 
        <button 
            className="card"
            style={style}
            onClick={this.handleClick}
            >
        </button>
        );
    }
}


export default App;
