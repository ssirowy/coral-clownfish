import React, { Component } from 'react';
import '../App.css';

import { changeIndex, resetGame } from '../actions';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

class Menu extends Component {

    render() {

        const { currentGame, games, store } = this.props;
        const currentIndex = games.map(game => game.title).indexOf(currentGame.title);

        // Create a series of options to render in select component.
        const options = games.map((game, i) => {
            return {
                value: i,
                label: game.title,
            };
        });

        const selectedGameOption = options[currentIndex];

        return (
            <nav>
              <h2>Shelters and shrubs</h2>
              <div className='menu-label'>
                Select preconfigured game
              </div>
              <Select
                name="form-field-name"
                value={selectedGameOption}
                onChange={event => store.dispatch(changeIndex(event.value))}
                clearable={false}
                options={options}
                />
                <button className='reset-button'
                        onClick={() => store.dispatch(resetGame(currentIndex))}>
                  Reset
                </button>

              <div className='menu-label strategy-label'>
                Select a strategy
              </div>



            </nav>
        );
    }
}

export default Menu;
