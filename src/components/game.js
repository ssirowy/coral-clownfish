import React, { Component } from 'react';
import ReactModal from 'react-modal';
import GameRow from './game-row';
import { isWinner, isLoser } from '../utils/winner-loser';
import { resetGame } from '../actions';
import '../styles/game.css';
import steve from '../img/steve.png';

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

        const loser = isLoser(this.props.game.board);
        const winner = isWinner(this.props.game.board);
        const message = loser.value ? loser.reason : 'Click non-coral cells to toggle';
        const loserClass = loser.value ? 'loser' : '';
        const instructionsClassNames = `instructions ${loserClass}`;

        return (
            <div>
              <h1>{this.props.game.title} {winner && '- Winner'}</h1>
                <div className="game-container">
                  {
                      this.props.game.board.map((row, i) => this.generateRow(i))
                  }
                </div>
                <div className={instructionsClassNames}>{message}</div>
                <ReactModal
                  isOpen={winner}
                  className="winner-modal"
                  overlayClassName='modal-overlay'
                  ariaHideApp={false}
                  >
                  <div className='modal-content'>
                    <h1>You saved the reef!</h1>
                    <div className='container'>
                      <p>
                        All the clownfish have found a happy coral home. Ocean levels
                        will maintain, the polar ice caps with stop melting, and Steve
                        Zissou approves.
                      </p>
                      <img className='steve'
                           src={steve} />
                    </div>
                    <div className='actions'>
                      <button className='green-button'
                              onClick={() => this.props.store.dispatch(resetGame(this.props.game))}
                        >
                        Reset game
                      </button>
                    </div>
                  </div>
                </ReactModal>


            </div>
        );
    }
}

export default Game;
