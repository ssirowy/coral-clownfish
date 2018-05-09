import React, { Component } from 'react';
import { clickCell } from '../actions';

import '../styles/cell.css';

import coral from '../img/coral.png';
import clownfish from '../img/clownfish.png';

class Cell extends Component {

    render() {

        const cell = this.props.cell;
        const classNames = `cell ${cell.type}`;

        if (cell.type === 'coral') {
            return (
                <div className={classNames}>
                  <img src={coral} />
                </div>
            );
        }
        else if (cell.type === 'clownfish') {
            return (
                <div className={classNames} onClick={() => this.props.store.dispatch(clickCell(this.props.row, this.props.col))}>
                  <img src={clownfish} />
                </div>
            );
        }
        else if (cell.type === 'constraint') {

            const fulfilledClass = cell.fulfilled ? 'fulfilled' : cell.unfulfilled ? 'unfulfilled' : null;

            return (
                <div className={classNames}>
                  <div className={fulfilledClass}>
                    {cell.value}
                  </div>
                </div>
            );
        }
        else if (cell.type === 'none') {
            return (
                <div className={classNames} />
            );
        }
        else {
            return (
                    <div className={classNames} onClick={() => this.props.store.dispatch(clickCell(this.props.row, this.props.col))}></div>
            );
        }
    }
}

export default Cell;
