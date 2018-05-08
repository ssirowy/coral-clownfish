import React, { Component } from 'react';
import GameRow from './game-row';
import '../App.css';

class Game extends Component {

    generateRow(i) {
        const row = this.props.game.board[i];

        return (
            <GameRow key={i}
                      row={row}
                      rowIndex={i}
                      store={this.props.store}
                      />
        );
    }

    render() {

        let winner = null;
        if (this.props.game.winner) {
            winner = '- Winner!';
        }
        return (
            <div>
                <h1>{this.props.game.title} {winner}</h1>
              <div className="game-container xcard card-1">
                {
                    this.props.game.board.map((row, i) => this.generateRow(i))
                }
              </div>
            </div>
        );
    }
}

export default Game;
