import React, { Component } from 'react';

import '../styles/menu.css';

import { changeIndex, resetGame } from '../actions';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

class Menu extends Component {

    render() {

        const { currentGame, games, store, bots } = this.props;
        const currentIndex = games.map(game => game.title).indexOf(currentGame.title);

        // Create a series of options to render in select component.
        const gameOptions = games.map((game, i) => {
            return {
                value: i,
                label: game.title,
            };
        });

        const selectedGameOption = gameOptions[currentIndex];

        // Create a series of bot options to render in select component.
        const botOptions = bots.map((bot, i) => {
            return {
                value: i,
                label: bot.title,
            };
        });

        const disabled=true;

        return (
            <nav>
              <h2>Coral and clownfish</h2>
              <div className='menu-label'>
                Select preconfigured game
              </div>
              <Select
                name="games"
                value={selectedGameOption}
                onChange={event => store.dispatch(changeIndex(event.value))}
                clearable={false}
                options={gameOptions}
                />
              <button className='reset-button'
                      onClick={() => store.dispatch(resetGame(currentIndex))}>
                Reset
              </button>

              <div className='menu-label bots-label'>
                Select a bot
              </div>
              <Select
                name="bots"
                clearable={false}
                options={botOptions}
                />

              <button className='play-button' disabled={disabled}
                      >
              Run bot
              </button>


            </nav>
        );
    }
}

export default Menu;
