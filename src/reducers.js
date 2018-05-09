import { predefinedGames } from './utils/predefined-games';
import bots from './bots';
import { interactiveCellTypes } from './utils/constants';
import { CLICK_CELL, CHANGE_GAME_INDEX, RESET_GAME, CHANGE_BOT, BOT_RUNNING } from './actions';
import { combineReducers } from 'redux';

// Initial game index to load.
const INITIAL_GAME_INDEX = 0;

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
function game(state = predefinedGames[INITIAL_GAME_INDEX], action) {

    // Game index and reset.  Return a predefined game.
    if (action.type === CHANGE_GAME_INDEX || action.type === RESET_GAME) {
        return predefinedGames[action.index];
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

    // Create new immutable board.
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
        let numClownfishs = 0;

        row.forEach(cell => {
            if (cell.type === 'clownfish') {
                numClownfishs++;
            }
        });

        rowConstraintCell.fulfilled = rowConstraintCell.value === numClownfishs;
        rowConstraintCell.unfulfilled = !rowConstraintCell.fulfilled;
    }
    else {
        rowConstraintCell.fulfilled = rowConstraintCell.unfulfilled = false;
    }

    // Update column constraints state.
    if (!column.some(cell => cell.type === 'empty')) {
        let numClownfish = 0;

        column.forEach(cell => {
            if (cell.type === 'clownfish') {
                numClownfish++;
            }
        });

        colConstraintCell.fulfilled = colConstraintCell.value === numClownfish;
        colConstraintCell.unfulfilled = !colConstraintCell.fulfilled;
    }
    else {
        colConstraintCell.fulfilled = colConstraintCell.unfulfilled = false;
    }

    // Pull all row and column constraints. We'll use to determine if board is showing a winner.
    const cols = board[0];
    const rows = board.map(row => row[0]);

    // Return a new version of the game state.
    return {
        title: state.title,
        board,
        winner: rows.every(cell => cell.fulfilled) && cols.every(cell => cell.fulfilled),
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
   Predefined game bots reducer.
   @method gameBots
   @return {Array}
*/
function gameBots(state = bots) {
    return state;
}

/**
   Game bot index reduceer.
   @method gameBotIndex
   @return {Bot}
*/
function gameBot(state = null, action) {
    if (action.type !== CHANGE_BOT) {
        return state;
    }

    return action.bot;
}

/**
   Game bot running reducer.
   @method gameBotRunning
   @return {Boolean}
*/
function gameBotRunning(state = false, action) {
    if (action.type !== BOT_RUNNING) {
        return state;
    }

    return action.running;
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
    gameBots,
    gameBot,
    gameBotRunning,
});

export { appStore };
