import React, { Component } from 'react';
import { clickCell } from '../actions';

import '../App.css';

import coral from '../img/coral.svg';
import clownfish from '../img/clownfish.svg';

class Cell extends Component {

    constructor(props) {

        super(props);

        this.state = {
            grassColor: Math.random() > .7 ? 'green-2' : 'green-1',
        };
    }

    render() {

        const cell = this.props.cell;

        if (cell.type === 'coral') {
            return (
                <div className="game-cell">
                  <img src={coral} />
                </div>
            );
        }
        else if (cell.type === 'shelter') {
            return (
                <div className="game-cell" onClick={() => this.props.store.dispatch(clickCell(this.props.row, this.props.col))}>
                  <img src={shelter} />
                </div>
            );
        }
        else if (cell.type === 'constraint') {
            let classNames = 'game-cell constraint background';
            let symbol = null;

            if (cell.fulfilled) {
                classNames = `${classNames} fulfilled`;
                symbol = String.fromCharCode(0x2714);
            }
            else if (cell.unfulfilled) {
                classNames = `${classNames} unfulfilled`;
                symbol = String.fromCharCode(0x2715);
            }

            return (
                <div className={classNames}>
                  {cell.value} {symbol}
                </div>
            );
        }
        else if (cell.type === 'none') {
            return (
                <div className="game-cell background">
                </div>
            );
        }
        else {
            const color = (cell.type === 'empty') ? 'black' : this.state.grassColor;
            const classNames = `game-cell ${color}`;

            return (
                    <div className={classNames} onClick={() => this.props.store.dispatch(clickCell(this.props.row, this.props.col))}></div>
            );
        }
    }
}

export default Cell;
