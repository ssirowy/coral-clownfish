import { predefinedGames } from './utils/predefined-games';
import suggesters from './suggesters';
import { interactiveCellTypes } from './utils/constants';
import { CLICK_CELL, CHANGE_GAME_INDEX, RESET_GAME, CHANGE_SUGGESTER, CHANGE_NUM_SUGGESTIONS, CHANGE_SUGGESTION_DELAY } from './actions';
import { combineReducers } from 'redux';

/**
   Helper function that returns the next cell type when a cell with a type has been clicked.
   @method _nextCellType
   @param {String} type Cell type.
   @return {String}
*/
function _nextCellType(type) {
    const index = interactiveCellTypes.indexOf(type);

    if (index < 0) {
        return 'empty';
    }

    return interactiveCellTypes[(index + 1) % interactiveCellTypes.length];
}

/**
   Game state reducer.
*/
function game(state = predefinedGames[0], action) {

    // Game index and reset.  Return a predefined game.
    if (action.type === CHANGE_GAME_INDEX) {
        return predefinedGames[action.index];
    }

    if (action.type === RESET_GAME) {
        return predefinedGames[action.game.index];
    }

    // If its any other action we don't know about, just return state back.
    if (action.type !== CLICK_CELL) {
        return state;
    }

    // Out of bounds error. Just return same board.
    if (action.row < 1 ||
        action.row >= state.board.length ||
        action.column < 1 ||
        action.column >= state.board[0].length ||
        state.board[action.row][action.column].type === 'coral') {
        return state;
    }

    // Create new board.
    const board = state.board.map(row => {
        return row.map(cell => Object.assign({}, cell));
    });

    // Update cell type based on what was clicked.
    const cell = board[action.row][action.column];
    cell.type = _nextCellType(cell.type);

    const rowConstraintCell = board[action.row][0];
    const colConstraintCell = board[0][action.column];

    // Update row constraints state.
    const row = board[action.row];
    const column = board.map(row => row[action.column]);

    if (!row.some(cell => cell.type === 'empty')) {
        const numClownfish = row.filter(cell => cell.type === 'clownfish').length;

        rowConstraintCell.fulfilled = rowConstraintCell.value === numClownfish;
        rowConstraintCell.unfulfilled = !rowConstraintCell.fulfilled;
    }
    else {
        rowConstraintCell.fulfilled = rowConstraintCell.unfulfilled = false;
    }

    // Update column constraints state.
    if (!column.some(cell => cell.type === 'empty')) {
        const numClownfish = column.filter(cell => cell.type === 'clownfish').length;

        colConstraintCell.fulfilled = colConstraintCell.value === numClownfish;
        colConstraintCell.unfulfilled = !colConstraintCell.fulfilled;
    }
    else {
        colConstraintCell.fulfilled = colConstraintCell.unfulfilled = false;
    }

    // Return a new version of the game state.
    return {
        title: state.title,
        board,
        index: state.index,
    };
}

/**
   Game index reduceer.
   @method gameIndex
   @return {Integer}
*/
function gameIndex(state = 0, action) {
    if (action.type !== CHANGE_GAME_INDEX) {
        return state;
    }

    return action.index >= 0 ? action.index : 0;
}

/**
   Predefined games reducer.
   @method games
   @return {Array}
*/
function games(state = predefinedGames) {
    return state;
}

/**
   Predefined game suggesters reducer.
   @method gameSuggesters
   @return {Array}
*/
function gameSuggesters(state = suggesters) {
    return state;
}

/**
   Game suggester reduceer.
   @method gameSuggester
   @return {Suggester}
*/
function gameSuggester(state = null, action) {
    if (action.type !== CHANGE_SUGGESTER) {
        return state;
    }

    return action.suggester;
}

/**
   @method numSuggestions reducer.
   @return {Integer}
*/
function numSuggestions(state = 111, action) {
    if (action.type !== CHANGE_NUM_SUGGESTIONS) {
        return state;
    }

    return action.numSuggestions > 0 ? action.numSuggestions : 1;
}

/**
   @method suggestionDelay reducer.
   @return {Integer}
*/
function suggestionDelay(state = 25, action) {
    if (action.type !== CHANGE_SUGGESTION_DELAY) {
        return state;
    }

    return action.delay >= 0 ? action.delay : 250;
}

function lastClickedCell(state = null, action) {
    if (action.type !== CLICK_CELL) {
        return state;
    }

    return {
        row: action.row,
        column: action.column,
    };
}

/**
   Main app store for our game.
   @method appStore
   @return {Object}
*/
const appStore = combineReducers({
    games,
    game,
    gameIndex,
    gameSuggesters,
    gameSuggester,
    numSuggestions,
    suggestionDelay,
    lastClickedCell,
});

export { appStore };
