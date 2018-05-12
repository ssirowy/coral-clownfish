import Suggester from './suggester';
import CellSuggestion from './cell-suggestion';
import isWinner from '../utils/winner-loser';


class Action {
//TODO: work legal puns into this more.

    coral: null
    row: null
    col: null
    option: null
}

export default class BaileySuggester extends Suggester {
    // Makes suggestions based on a depth first search of the solution space.
    //
    // The key insights here are that the coral can be iteratively processed one at a time in order.
    // If any coral has 0 possible placements of clownfish, because constraints are violated,
    // then the placement of a fish to an earlier processed coral must have been invalid.
    //
    // This suggestor

    fillInWater(game) {
        // Returns the last cell that is empty water.
        const size = game.board.length - 1;

        let toreturn = null;

        game.board.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (cell.type === 'empty') {
                    toreturn = [i, j];
                }
            });
        });

        return toreturn;
    }

    getLonelyCoral(game) {
        // Find unattended corals
        let corals = [];
        game.board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (cell.type === 'coral' && !this.board[rowIndex][colIndex].marked) {
                    corals.push([rowIndex, colIndex]);
                }
            });
        });
        return corals;
    }

    wouldMeetConstraints(game, rowIndex, colIndex) {
        const row = game.board[rowIndex];
        const column = game.board.map(row => row[colIndex]);

        if (game.board[rowIndex][colIndex].type == 'coral') {
            return false;
        }

        const rowConstraintCell = game.board[rowIndex][0];
        const colConstraintCell = game.board[0][colIndex];

        // check that row constraint not exceeded
        const rowClownfish = row.filter(cell => cell.type === 'clownfish').length;
        const rowFishExceeded = rowConstraintCell.value === rowClownfish;

        // check that column constraint not exceeded
        const colClownFish = column.filter(cell => cell.type === 'clownfish').length;
        const colFishExceeded = colConstraintCell.value === colClownFish;

        return !rowFishExceeded && !colFishExceeded;
    }

    hasSpace(game, rowIndex, columnIndex) {
        const cells = [];
        const board = game.board;

        cells.push(board[ rowIndex ][ columnIndex ]);

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
        if (rowIndex >= 1 && columnIndex <= board.length - 2) {
            cells.push(board[ rowIndex - 1 ][ columnIndex + 1 ]);
        }
        if (columnIndex <= board.length - 2) {
            cells.push(board[ rowIndex     ][ columnIndex + 1 ]);
        }
        if (rowIndex <= board.length -2 && columnIndex <= board.length -2) {
            cells.push(board[ rowIndex + 1 ][ columnIndex + 1 ]);
        }
        return !cells.some(cell => cell.type === 'clownfish');
    }

    validFishOptions(game, coral) {
        const options = [];

        if (coral[1] > 1) {
           if (this.wouldMeetConstraints(game, coral[0], coral[1]-1) && this.hasSpace(game, coral[0], coral[1]-1)) {
                options.push([coral[0], coral[1]-1]);
           }
        }

        if (coral[1] < game.board.length - 1) {
           if (this.wouldMeetConstraints(game, coral[0], coral[1]+1) && this.hasSpace(game, coral[0], coral[1]+1)) {
                options.push([coral[0], coral[1]+1]);
           }
        }

        if (coral[0] < game.board.length - 1) {
           if (this.wouldMeetConstraints(game, coral[0]+1, coral[1]) && this.hasSpace(game, coral[0]+1, coral[1])) {
                options.push([coral[0]+1, coral[1]]);
           }
        }

        if (coral[0] > 1) {
           if (this.wouldMeetConstraints(game, coral[0]-1, coral[1]) && this.hasSpace(game, coral[0]-1, coral[1])) {
                options.push([coral[0]-1, coral[1]]);
           }
        }

        return options;
    }


    /**
       Overridden method of base class. Performs the next step in a depth first search.
       @method nextSuggestion
       @param {Game} Game object
       @return {Cell}
    */
    nextSuggestion(game) {
        if (this.initialized === undefined) {
            this.stack = [];
            this.initialized = true;

            this.board = [];
            game.board.forEach((row,i) => {
                this.board[i] = [];
                row.forEach((cell, j) => {
                    this.board[i].push({ marked: false });
                });
            });
        }

        let autoclick = null
        if (this.suggestion) {
            autoclick = this.suggestion;
            this.suggestion = null;
            return autoclick;
        }

        // Get the next unattached coral.
        const corals = this.getLonelyCoral(game);
        if (corals.length > 0) {
            const coral = corals[0];

            // find adjacent cells that are valid to put fish near this coralcoral.
            const options = this.validFishOptions(game, coral);

            // Use the next untried fish placement.
            if (options.length > 0 && (this.last === undefined || this.last.option < options.length - 1)) {
                const option = this.last ? this.last.option + 1 : 0;
                const action = new Action();

                action.row = options[option][0];
                action.col = options[option][1];
                action.coral = coral;
                action.option = option;
                this.stack.push(action);

                this.last = undefined;
                this.board[coral[0]][coral[1]].marked = true;

                this.suggestion = new CellSuggestion(options[option][0], options[option][1])
                return this.suggestion;
            }
            else {
                // coral is unattached but has no valid placements.
                // A placed fish earlier must be incorrect. Undo the last placed fish.
                this.last = this.stack.pop()
                this.board[this.last.coral[0]][this.last.coral[1]].marked = false;
                return new CellSuggestion(this.last.row, this.last.col);
            }
        }

        const cell = this.fillInWater(game);

        return new CellSuggestion(cell[0], cell[1])
    }
}
