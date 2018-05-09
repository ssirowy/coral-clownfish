import React, { Component } from 'react';
import { clickCell } from '../actions';

import '../styles/menu.css';

import { changeIndex, resetGame, changeSuggester } from '../actions';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

class Menu extends Component {

    render() {

        const { currentGame, games, store, suggesters, suggester, botRunning } = this.props;
        const currentIndex = games.map(game => game.title).indexOf(currentGame.title);

        // Create a series of options to render in select component.
        const gameOptions = games.map((game, i) => {
            return {
                value: i,
                label: game.title,
            };
        });

        const selectedGameOption = gameOptions[currentIndex];

        // Create a series of suggester options to render in select component.
        const suggesterOptions = suggesters.map((suggester, i) => {
            return {
                value: i,
                label: suggester.getName(),
            };
        });

        let selectedSuggester = null;
        if (suggester) {
            selectedSuggester = suggesterOptions.find(option => option.label === suggester.getName());
        }

        const suggestButtonDisabled = (selectedSuggester === null);
        const disabledClass = (suggestButtonDisabled || botRunning) ? 'disabled' : null
        const suggestButtonClassNames = `suggest-button ${disabledClass}`;
        const suggestButtonTitle = botRunning ? 'Running' : 'Make a suggestion';

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
                Select a suggester
              </div>
              <Select name="suggesters"
                      value={selectedSuggester}
                      clearable={false}
                      options={suggesterOptions}
                      onChange={event => store.dispatch(changeSuggester(suggesters[event.value]))}
                      />

                <button className={suggestButtonClassNames}
                      disabled={suggestButtonDisabled}
                        onClick={() => store.dispatch(clickCell(suggester.nextSuggestion(currentGame.board)))}
                      >
                  {suggestButtonTitle}
              </button>

            </nav>
        );
    }
}

export default Menu;
