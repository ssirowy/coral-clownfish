import React, { Component } from 'react';

import '../styles/menu.css';

import { changeIndex, resetGame, changeBot } from '../actions';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

class Menu extends Component {

    render() {

        const { currentGame, games, store, bots, bot, botRunning } = this.props;
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

        let selectedBot = null;
        if (bot) {
            selectedBot = botOptions.find(option => option.label === bot.title);
        }

        const playButtonDisabled = (selectedBot === null);
        const disabledClass = (playButtonDisabled || botRunning) ? 'disabled' : null
        const playButtonClassNames = `play-button ${disabledClass}`;
        const playButtonTitle = botRunning ? 'Running' : 'Run bot';

        return (
            <nav>
              <h2>Coral and clownfish</h2>
              <div className='menu-label'>
                Select preconfigured game
              </div>
              <Select name="games"
                      value={selectedGameOption}
                      clearable={false}
                      options={gameOptions}
                      onChange={event => store.dispatch(changeIndex(event.value))}
              />
              <button className='reset-button'
                      onClick={() => store.dispatch(resetGame(currentIndex))}>
                Reset
              </button>

              <div className='menu-label bots-label'>
                Select a bot
              </div>
              <Select name="bots"
                      value={selectedBot}
                      clearable={false}
                      options={botOptions}
                      onChange={event => store.dispatch(changeBot(bots[event.value]))}
                      />

                <button className={playButtonClassNames}
                      disabled={playButtonDisabled}
                        onClick={() => bot.start(store)}
                      >
                  {playButtonTitle}
              </button>

            </nav>
        );
    }
}

export default Menu;
