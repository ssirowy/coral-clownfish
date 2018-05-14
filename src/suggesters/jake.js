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

    // Method that returns the next valid row/col position of the fish the move the board toward a more valid state.
    findNextFish(game, fishLocations, waterLocations, coralLocations, currentCoral, rowConstraints, colConstraints) {

        // Build 2 lists of the fish state
        let numFishInRows = [];
        let numFishInCols = [];
        let rowIdx = coralLocations[currentCoral].row;
        let colIdx = coralLocations[currentCoral].col;

        for(var i = 1; i < game.board.length; i++) {
            numFishInRows.push(0);
            numFishInCols.push(0);
        }

        for (let x = 0; x < fishLocations.length; x++) {
            numFishInRows[fishLocations[x].row - 1]++;
            numFishInCols[fishLocations[x].col - 1]++;
        }

        let waterSurrounding = [];

        // Return locations of water surrounding this coral
        waterLocations.forEach(waterLocation => {
            if (waterLocation.row == rowIdx+1 && waterLocation.col == colIdx) {
                waterSurrounding.push('bottom');
            }
            if (waterLocation.row == rowIdx && waterLocation.col == colIdx-1) {
                waterSurrounding.push('left');
            }
            if (waterLocation.row == rowIdx-1 && waterLocation.col == colIdx) {
                waterSurrounding.push('top');
            }
            if (waterLocation.row == rowIdx && waterLocation.col == colIdx+1) {
                waterSurrounding.push('right');
            }
        });

        // TOP
        if (rowIdx > 1 && waterSurrounding.includes('top') &&
            numFishInRows[rowIdx-2] < rowConstraints[rowIdx-2] &&
            numFishInCols[colIdx-1] < colConstraints[colIdx-1] &&
            this.noFishTouching(game, rowIdx-1, colIdx)) {
            let testc = currentCoral + 1;

            let flc = fishLocations.slice(0);
            flc.push({row: rowIdx-1, col: colIdx});

            if (flc.length == coralLocations.length) {
                return {row: rowIdx-1, col: colIdx}
            }
            else {
                let nextClickLocation = this.findNextFish(game, flc, waterLocations, coralLocations, testc, rowConstraints, colConstraints)
                if (nextClickLocation) {
                    return nextClickLocation;
                }
            }
        }

        // LEFT
        if (colIdx > 1 && waterSurrounding.includes('left') &&
            numFishInRows[rowIdx-1] < rowConstraints[rowIdx-1] &&
            numFishInCols[colIdx-2] < colConstraints[colIdx-2] &&
            this.noFishTouching(game, rowIdx, colIdx-1)) {
            let testb = currentCoral + 1;

            let flb = fishLocations.slice(0);
            flb.push({row: rowIdx, col: colIdx-1});

            if (flb.length == coralLocations.length) {
                 return {row: rowIdx, col: colIdx-1}
            }
            else {
                let nextClickLocation = this.findNextFish(game, flb, waterLocations, coralLocations, testb, rowConstraints, colConstraints)
                if (nextClickLocation) {
                    return nextClickLocation;
                }
            }
        }

        // Bottom
        if (rowIdx < game.board.length - 1 && waterSurrounding.includes('bottom') &&
            numFishInRows[rowIdx] < rowConstraints[rowIdx] &&
            numFishInCols[colIdx-1] < colConstraints[colIdx-1] &&
            this.noFishTouching(game, rowIdx+1, colIdx)) {
            let test = currentCoral + 1;

            // shallow copy of fish locations
            let fla = fishLocations.slice(0);
            fla.push({row: rowIdx+1, col: colIdx});

            if (fla.length == coralLocations.length) {
                return {row: rowIdx+1, col: colIdx}
            }
            else {
                let nextClickLocation = this.findNextFish(game, fla, waterLocations, coralLocations, test, rowConstraints, colConstraints)
                if (nextClickLocation) {
                    return nextClickLocation;
                }
            }
        }

        // Right
        if (colIdx < game.board.length - 1 && waterSurrounding.includes('right') &&
            numFishInRows[rowIdx-1] < rowConstraints[rowIdx-1] &&
            numFishInCols[colIdx] < colConstraints[colIdx] &&
            this.noFishTouching(game, rowIdx, colIdx+1)) {

            let testd = currentCoral + 1;
            let fld = fishLocations.slice(0);
            fld.push({row: rowIdx, col: colIdx+1});

            if (fld.length == coralLocations.length) {
                return {row: rowIdx, col: colIdx+1}
            }
            else {
                let nextClickLocation = this.findNextFish(game, fld, waterLocations, coralLocations, testd, rowConstraints, colConstraints)
                if (nextClickLocation) {
                    return nextClickLocation;
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
        let coralLocations = [];
        let waterLocations = [];
        let fishLocations = [];
        let rowConstraints = [];
        let colConstraints = [];
        this.counter = 1;

        // Return value of first empty cell nothing cell
        for (let rowIdx = 0; rowIdx < game.board.length; rowIdx++) {
            for (let colIdx = 0; colIdx < game.board.length; colIdx++) {
                let cell = game.board[rowIdx][colIdx];

                if (cell.type == 'constraint') {
                    if (rowIdx == 0) {
                        colConstraints.push(game.board[rowIdx][colIdx].value);
                    }
                    else {
                        rowConstraints.push(game.board[rowIdx][colIdx].value);                          
                    }
                }

                if (cell.type == 'empty') {
                    return new CellSuggestion(rowIdx, colIdx);
                }

                if (cell.type == 'coral') {
                    coralLocations.push({row: rowIdx, col: colIdx})
                }

                if (cell.type == 'water') {
                    waterLocations.push({row: rowIdx, col: colIdx})
                }

                if (cell.type == 'clownfish') {
                    fishLocations.push({row: rowIdx, col: colIdx})
                }
            }
        }

        let nextStep = this.findNextFish(game, fishLocations, waterLocations, coralLocations, 0, rowConstraints, colConstraints);
        console.log(this.counter)
        return new CellSuggestion(nextStep.row, nextStep.col);
    }
}
