/**
   Returns true if board is in a winning state. False otherwise.
   @method isWinner
   @param {Object} board The game board.
   @return {Boolean}
*/
export default function isWinner(board) {
    // Pull all row and column constraints. We'll use to determine if board is showing a winner.
    const cols = board[0];
    const rows = board.map(row => row[0]);

    return rows.every(cell => cell.fulfilled) && cols.every(cell => cell.fulfilled);
}
