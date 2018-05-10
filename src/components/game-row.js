import React, { Component } from 'react';
import Cell from './cell';

import '../App.css';

class GameRow extends Component {
    render() {

        return (
            <div className="game-row">
              {
                  this.props.row.map((cell, i) =>
                                     <Cell key={i}
                                               row={this.props.rowIndex}
                                               column={i}
                                               cell={cell}
                                               lastClickedCell={this.props.lastClickedCell}
                                               store={this.props.store}/>
                                    )
              }
            </div>
        );
    }
}

export default GameRow;
