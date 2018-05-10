import React, { Component } from 'react';
import { clickCell } from '../actions';

import '../styles/menu.css';
import coral from '../img/coral.png';
import clownfish from '../img/clownfish.png';

import { changeIndex, resetGame, changeSuggester, changeNumSuggestions } from '../actions';
import sleep from '../utils/sleep';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

class Menu extends Component {

    constructor(props) {
        super(props);
    }

    /**
       Method acts as a simple bot for running suggester as many times as user defined.
       @method delegateToSuggester
       @param {Suggester} A suggester object.
       @param {Integer} numSuggestions Number of times to ask for suggestions
       @param {Game} Game object.
       @return {void}
    */
    async delegateToSuggester(suggester, numSuggestions, game) {
        for (let i = 0; i < numSuggestions; i++) {
            this.props.store.dispatch(clickCell(suggester.nextSuggestion(game.board)));
            await sleep(250);
        }
    }

    render() {

        const { currentGame, games, store, suggesters, suggester, numSuggestions } = this.props;
        const botRunning = false;
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
              <h2>
                <img src={coral} /> <span>Coral and</span>  <span>clownfish</span> <img src={clownfish} />
              </h2>
              <div className='menu-label'>
                Select a game
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

              <h3>Suggestions welcome</h3>

              <div className='menu-label'>
                Select a suggester
              </div>
              <Select name="suggesters"
                      value={selectedSuggester}
                      clearable={false}
                      options={suggesterOptions}
                      onChange={event => store.dispatch(changeSuggester(suggesters[event.value]))}

               />
              <div className='menu-label'>
                How many suggestions?
              </div>

              <input type='number'
                     min="1"
                     value={numSuggestions}
                     onChange={event => store.dispatch(changeNumSuggestions(event.target.value))}
                     className='number-suggestions' />

              <div className='menu-label'>
                Time between each suggestion?
              </div>

              <Select name="suggesters"
                      value={selectedSuggester}
                      clearable={false}
                      options={suggesterOptions}
                      onChange={event => store.dispatch(changeSuggester(suggesters[event.value]))}
               />

                <button className={suggestButtonClassNames}
                      disabled={suggestButtonDisabled}
                        onClick={() => this.delegateToSuggester(suggester, numSuggestions, currentGame)}
                      >
                  {suggestButtonTitle}
              </button>

            </nav>
        );
    }
}

export default Menu;
