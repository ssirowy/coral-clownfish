// Action types in game.
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_GAME_INDEX = 'GAME_INDEX';
export const RESET_GAME = 'RESET_GAME';
export const CHANGE_BOT_INDEX = 'CHANGE_BOT_INDEX';

// Simple action creators for game.
export function clickCell(row, column) {
    return {
        type: CLICK_CELL,
        row,
        column,
    };
}

export function changeIndex(index) {
    return {
        type: CHANGE_GAME_INDEX,
        index,
    };
}

export function resetGame(index) {
    return {
        type: RESET_GAME,
        index,
    };
}

export function changeBotIndex(index) {
    return {
        type: CHANGE_BOT_INDEX,
        index,
    };
}

