import React, { Component } from 'react';
import GameRow from './game-row';
import isWinner from '../utils/is-winner';
import '../styles/game.css';

class Game extends Component {

    generateRow(i) {
        const row = this.props.game.board[i];

        return (
            <GameRow key={i}
                     row={row}
                     rowIndex={i}
                     lastClickedCell={this.props.lastClickedCell}
                     store={this.props.store}
                     />
        );
    }

    render() {
        return (
            <div>
              <h1>{this.props.game.title} {isWinner(this.props.game.board) && '- Winner'}</h1>
                <div className="game-container">
                  {
                      this.props.game.board.map((row, i) => this.generateRow(i))
                  }
                </div>
                <div className="instructions">Click non-coral cells to toggle</div>
            </div>
        );
    }
}

export default Game;
