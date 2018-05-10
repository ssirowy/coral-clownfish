function fishHaveSpace(board)  {
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
   Returns true if board is in a winning state. False otherwise.
   @method isWinner
   @param {Object} board The game board.
   @return {Boolean}
*/
export function isWinner(board) {
    // Pull all row and column constraints. We'll use to determine if board is showing a winner.
    const cols = board[0];
    const rows = board.map(row => row[0]);

    // Make sure row/col constraints are fulfilled.
    const constraintsFulfilled = rows.every(cell => cell.fulfilled) && cols.every(cell => cell.fulfilled);

    return constraintsFulfilled && fishHaveSpace(board);
}

export function isLoser(board) {
    return {
        value: true,
        reason: 'Something or another',
    }
    
}
