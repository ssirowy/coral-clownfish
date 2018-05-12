import Suggester from './suggester';
import CellSuggestion from './cell-suggestion';

export default class JakeSuggester extends Suggester {

    // Method to check if there arent't any fish touching the row/cell given. If true, means that
    // we are attempting to place a fish in a valid location.
    noFishTouching(game, rowIndex, columnIndex) {
        let board = game.board;
        let cells = []

        // Check there are no fish touching the row/col cell
        if (rowIndex >= 1 && columnIndex >= 1) {
            cells.push(board[ rowIndex - 1 ][ columnIndex - 1 ])
        }
        if (columnIndex >= 1) {
            cells.push(board[ rowIndex ][ columnIndex - 1 ])
        }
        if (rowIndex >= 1) {
            cells.push(board[ rowIndex - 1 ][ columnIndex ]);
        }
        if (rowIndex <= board.length -2 && columnIndex >= 1) {
            cells.push(board[ rowIndex + 1 ][ columnIndex - 1 ]);
        }
        if (rowIndex <= board.length -2) {
            cells.push(board[ rowIndex + 1 ][ columnIndex ]);
        }
        // Bottom left
        if (rowIndex >= 1 && columnIndex <= board.length - 2) {
            cells.push(board[ rowIndex - 1 ][ columnIndex + 1 ]);
        }
        // Bottom
        if (columnIndex <= board.length - 2) {
            cells.push(board[ rowIndex     ][ columnIndex + 1 ]);
        }
        // Bottom right
        if (rowIndex <= board.length -2 && columnIndex <= board.length -2) {
            cells.push(board[ rowIndex + 1 ][ columnIndex + 1 ]);
        }

        return !cells.some(cell => cell.type === 'clownfish');
    }

    // Given a row and column pointing to a fish and a game board, return true if the fish is valid
    isValidFish(row, col) {
        

        return true;
    }

    // Returns a shallow copy of the board
    getGameCopy(game) {
        let gameCopy = {board: []};

        for (let rowIdx = 0; rowIdx < game.board.length; rowIdx++) {
            let row = game.board[rowIdx];
            gameCopy.board[rowIdx] = []

            for (let cellIdx = 0; cellIdx < row.length; cellIdx++) {
                let cell = row[cellIdx];

                gameCopy.board[rowIdx].push({type: cell.type, value: cell.value});
            }
        }

        return gameCopy
    }

    // Method that returns the next valid row/col position of the fish the move the board toward a more valid state.
    findNextFish(game, coralRow, coralCol) {
        // Build 2 lists of constraints
        let numFish = 0;
        let numCoral = 0;
        let rowConstraints = [];
        let colConstraints = [];

        // Build 2 lists of the fish state
        let numFishInRows = [];
        let numFishInCols = [];
        for(var i = 0; i < game.board.length - 1; i++) {
            numFishInRows.push(0);
            numFishInCols.push(0);
        }

        for (let rowIdxc = 0; rowIdxc < game.board.length; rowIdxc++) {
            for (let colIdxc = 0; colIdxc < game.board[rowIdxc].length; colIdxc++) {
                if (game.board[rowIdxc][colIdxc].type == 'constraint') {
                    if (rowIdxc == 0) {
                        colConstraints.push(game.board[rowIdxc][colIdxc].value);
                    }
                    else {
                        rowConstraints.push(game.board[rowIdxc][colIdxc].value);                          
                    }
                }

                // Count fish
                if (game.board[rowIdxc][colIdxc].type == 'clownfish') {
                    numFishInRows[rowIdxc - 1]++;
                    numFishInCols[colIdxc - 1]++;
                    numFish++;
                }

                if (game.board[rowIdxc][colIdxc].type == 'coral') {
                    numCoral++;
                }
            }
        }
        for (let rowIdxa = game.board.length - 1; rowIdxa > 0; rowIdxa--) {
            for (let colIdxa = game.board[rowIdxa].length - 1; colIdxa > 0; colIdxa--) {
                if ((rowIdxa < coralRow || (rowIdxa == coralRow && colIdxa < coralCol)) && game.board[rowIdxa][colIdxa].type == 'coral') {
                    // Get list of cells that a fish can be added to without breaking
                    // Push each option that is water, won't break a constraint, and is not near a fish

                    let gameStates = []

                    // LEFT
                    if (colIdxa > 1 &&
                        game.board[rowIdxa][colIdxa-1].type == 'water' &&
                        numFishInRows[rowIdxa-1] < rowConstraints[rowIdxa-1] &&
                        numFishInCols[colIdxa-2] < colConstraints[colIdxa-2] &&
                        this.noFishTouching(game, rowIdxa, colIdxa-1)) {

                        let gameCopya = this.getGameCopy(game);

                        // Simulate click on the board
                        gameCopya.board[rowIdxa][colIdxa-1].type = 'clownfish'

                        // If there are more coral, find those moves and keep going. If not, try each click and see if we won
                        if (numFish + 1 == numCoral) {
                            return {row: rowIdxa, col: colIdxa-1}
                        }
                        else {
                            gameStates.push(gameCopya);
                        }
                    }
                    // TOP
                    if (rowIdxa > 1 &&
                        game.board[rowIdxa-1][colIdxa].type == 'water' &&
                        numFishInRows[rowIdxa-2] < rowConstraints[rowIdxa-2] &&
                        numFishInCols[colIdxa-1] < colConstraints[colIdxa-1] &&
                        this.noFishTouching(game, rowIdxa-1, colIdxa)) {

                        let gameCopyb = this.getGameCopy(game);

                        // Simulate click on the board
                        gameCopyb.board[rowIdxa-1][colIdxa].type = 'clownfish'

                        // If there are more coral, find those moves and keep going. If not, try each click and see if we won
                        if (numFish + 1 == numCoral) {
                            return {row: rowIdxa-1, col: colIdxa}
                        }
                        else {
                            gameStates.push(gameCopyb);
                        }
                    }
                    // Bottom
                    if (rowIdxa < game.board.length - 1 && game.board[rowIdxa+1][colIdxa].type == 'water' &&
                        numFishInRows[rowIdxa] < rowConstraints[rowIdxa] &&
                        numFishInCols[colIdxa-1] < colConstraints[colIdxa-1] &&
                        this.noFishTouching(game, rowIdxa+1, colIdxa)) {

                        let gameCopyc = this.getGameCopy(game);

                        // Simulate click on the board
                        gameCopyc.board[rowIdxa+1][colIdxa].type = 'clownfish'

                        // If there are more coral, find those moves and keep going. If not, try each click and see if we won
                        if (numFish + 1 == numCoral) {
                            return {row: rowIdxa+1, col: colIdxa}
                        }
                        else {
                            gameStates.push(gameCopyc);
                        }
                    }

                    // Right
                    if (colIdxa < game.board.length - 1 && game.board[rowIdxa][colIdxa+1].type == 'water' &&
                        numFishInRows[rowIdxa-1] < rowConstraints[rowIdxa-1] &&
                        numFishInCols[colIdxa] < colConstraints[colIdxa] &&
                        this.noFishTouching(game, rowIdxa, colIdxa+1)) {

                        let gameCopyd = this.getGameCopy(game);

                        // Simulate click on the board
                        gameCopyd.board[rowIdxa][colIdxa+1].type = 'clownfish'

                        // If there are more coral, find those moves and keep going. If not, try each click and see if we won
                        if (numFish + 1 == numCoral) {
                            return {row: rowIdxa, col: colIdxa+1}
                        }
                        else {
                            gameStates.push(gameCopyd);
                        }
                    }

                    for (let stateIdx = 0; stateIdx < gameStates.length; stateIdx++) {
                        let click = this.findNextFish(gameStates[stateIdx], rowIdxa, colIdxa);

                        if (click) {
                            return click;
                        }
                    }
                }
            }
        }        
    }

    /**
       Overridden method of base class. Will return a cell to click.
       @method nextSuggestion
       @param {Game} Game object
       @return {Cell}
    */
    nextSuggestion(game) {
        let gameCopy = this.getGameCopy(game)

        const size = gameCopy.board.length - 1;
        let rowClickIdx = 0;
        let cellClickIdx = 0;

        // Find all the corals
        let corals = [];
        let fish = [];

        // Return value of last nothing cell
        for (let rowIdxz = 1; rowIdxz < gameCopy.board.length; rowIdxz++) {
            let row = gameCopy.board[rowIdxz];

            for (let cellIdxz = 1; cellIdxz < row.length; cellIdxz++) {
                let cell = row[cellIdxz];

                if (cell.type == 'empty') {
                    rowClickIdx = rowIdxz;
                    cellClickIdx = cellIdxz;
                }

                if (cell.type == 'coral') {
                    corals.push({row: rowIdxz, col: cellIdxz})
                }

                if (cell.type == 'clownfish') {
                    fish.push({row: rowIdxz, col: cellIdxz})
                }
            }
        }

        // There were no empty squares to click, next we would check for any invalid fish and click those to get them back to empty
        // Going to skip this step for now, let's assume we are starting from scratch and there are no invalid fish

        // Then let's start adding fish.
        // Pick a coral and add a valid fish
        if (rowClickIdx == 0) {
            // if (fish.length) {
            //     for(let fishIdx = 0; fishIdx < fish.length; fishIdx++) {
            //         if (!isValidFish(game, fish[fishIdx].row, fish[fishIdx].col)) {
            //             return new CellSuggestion(fish[fishIdx].row, fish[fishIdx].col);
            //         }
            //     }
            // }
            // TODO we'll need to account for fish that are already there if it doesn't do it
            let nextStep = this.findNextFish(gameCopy, game.board.length, game.board.length);
            return  new CellSuggestion(nextStep.row, nextStep.col);
        }
        else {
            return new CellSuggestion(rowClickIdx, cellClickIdx);
        }
    }
}
