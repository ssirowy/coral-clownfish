import React, { Component } from 'react';
import Menu from './components/menu';
import Game from './components/game';

import './App.css';

import { createStore } from 'redux';
import { appStore } from './reducers';

const store = createStore(appStore);

class App extends Component {

    constructor(props) {
        super(props);

        // Get initial state from Redux.
        this.state = store.getState();

        // Subscribe to updates to Redux store and update app state every time state changes.
        store.subscribe(() => {
            this.setState(store.getState());
        });
    }

    render() {
        return (
            <div className="App">
              <Menu games={this.state.games}
                    currentGame={this.state.game}
                    suggesters={this.state.gameSuggesters}
                    suggester={this.state.gameSuggester}
                    numSuggestions={this.state.numSuggestions}
                    suggestionDelay={this.state.suggestionDelay}
                    store={store} />
              <section>
                <Game game={this.state.game}
                      lastClickedCell={this.state.lastClickedCell}
                      store={store} />
              </section>
            </div>
        );
    }
}

export default App;
