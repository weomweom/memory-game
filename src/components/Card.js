import React from "react";
import hidden from "./../img/hidden.jpg";
import tlo from "./../img/tlo.jpg";

class Card extends React.Component {
    handleClick = () => {
        this.props.onClick();
    }

    render() {
        let style;
        if (this.props.isWin) {
          style = {backgroundImage: `url(${tlo})`};
        }
        else {
        if(this.props.isWinningIndex)
          style = {backgroundImage: `none`};
        else
          style = {backgroundImage: this.props.isActive ? `url(${this.props.cardImage})` : `url(${hidden})` };
        }
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

export default Card;