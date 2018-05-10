/**
   Utility methode to determine whether or not all the fish have space.
   @method _fishHaveSpace
   @param {Board} Game board.
   @return {Boolean}
*/
function _fishHaveSpace(board)  {
    // Make sure an indidivual fish defined at rowIndex, columnIndex has space.
    // No fish can be around in its immediate vicinity.
    const hasSpace = function(rowIndex, columnIndex) {

        const cells = [];

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

    let fishHaveSpace = true;
    board.forEach((row, rowIndex) => {
        row.forEach((cell, columnIndex) => {
            if (cell.type === 'clownfish' && !hasSpace(rowIndex, columnIndex)) {
                fishHaveSpace = false;
            }
        });
    });

    return fishHaveSpace;
}

/**
   Utility method to determine if the whole board has been filled in. Basically no more empty cells
   @method boardCompleted
   @param {Board} Game board.
   @return {Boolean}
*/
function _boardCompleted(board) {
    return !board.some(row => row.some(cell => cell.type === 'empty'));
}

function _rowColConstraintsFulfilled(board) {
    // Pull all row and column constraints. We'll use to determine if board is showing a winner.
    const cols = board[0];
    const rows = board.map(row => row[0]);

    return rows.every(cell => cell.fulfilled) && cols.every(cell => cell.fulfilled);
}

/**
   Returns true if board is in a winning state. False otherwise.
   @method isWinner
   @param {Object} board The game board.
   @return {Boolean}
*/
export function isWinner(board) {
    return _rowColConstraintsFulfilled(board) && _fishHaveSpace(board);
}

export function isLoser(board) {

    let value = false;
    let reason = null;

    if (!_boardCompleted(board)) {
        return {
            value,
        };
    }


    if (!_rowColConstraintsFulfilled(board)) {
        value = true;
        reason = 'Row and/or column constraints not fulfilled';
    }
    else if (!_fishHaveSpace(board)) {
        value = true;
        reason = 'Clownfish need room to swim, they can’t be adjacent to each other';
    }

    return {
        value,
        reason,
    };
}
