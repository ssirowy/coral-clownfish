const sixEasy = {
    title: '6x6 Problem 1',
    board: [
        [ 'empty', 'coral', 'empty', 'empty', 'coral', 'clownfish' ],
        [ 'empty', 'clownfish', 'empty', 'clownfish', 'coral', 'coral' ],
        [ 'empty', 'empty', 'empty', 'coral', 'empty', 'clownfish' ],
        [ 'empty', 'coral', 'empty', 'clownfish', 'empty', 'empty' ],
        [ 'empty', 'clownfish', 'empty', 'empty', 'empty', 'empty' ],
        [ 'empty', 'empty', 'empty', 'coral', 'clownfish', 'empty' ],
    ],
};

const sevenEasy = {
    title: '7x7 Problem 1',
    board: [
        [ 'empty', 'empty', 'coral', 'clownfish', 'empty', 'clownfish', 'empty' ],
        [ 'clownfish', 'empty', 'coral', 'empty', 'empty', 'coral', 'empty' ],
        [ 'coral', 'empty', 'clownfish', 'empty', 'empty', 'empty', 'empty' ],
        [ 'clownfish', 'coral', 'empty', 'empty', 'empty', 'empty', 'empty' ],
        [ 'empty', 'coral', 'coral', 'clownfish', 'empty', 'clownfish', 'coral' ],
        [ 'empty', 'clownfish', 'empty', 'empty', 'empty', 'empty', 'empty' ],
        [ 'empty', 'empty', 'empty', 'empty', 'clownfish', 'coral', 'empty' ],
    ],
};

const eightEasy = {
    title: '8x8 Problem 1',
    board: [
        [ 'empty', 'empty', 'coral', 'clownfish', 'coral', 'clownfish', 'coral', 'clownfish' ],
        [ 'empty', 'clownfish', 'empty', 'empty', 'empty', 'empty', 'empty', 'coral' ],
        [ 'empty', 'coral', 'empty', 'empty', 'empty', 'empty', 'empty', 'clownfish' ],
        [ 'empty', 'empty', 'clownfish', 'coral', 'clownfish', 'empty', 'empty', 'coral' ],
        [ 'clownfish', 'empty', 'coral', 'empty', 'empty', 'empty', 'empty', 'clownfish' ],
        [ 'coral', 'empty', 'empty', 'clownfish', 'empty', 'empty', 'coral', 'empty' ],
        [ 'clownfish', 'coral', 'empty', 'coral', 'empty', 'empty', 'clownfish', 'empty' ],
        [ 'empty', 'coral', 'clownfish', 'empty', 'clownfish', 'coral', 'empty', 'empty' ],
    ],

};

const nineEasy = {
    title: '9x9 Problem 1',
    board: [
        [ 'clownfish', 'empty', 'empty', 'empty', 'clownfish', 'coral', 'empty', 'empty', 'empty' ],
        [ 'coral', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'clownfish', 'coral' ],
        [ 'empty', 'clownfish', 'coral', 'empty', 'empty', 'clownfish', 'empty', 'empty', 'empty' ],
        [ 'coral', 'empty', 'empty', 'clownfish', 'coral', 'coral', 'empty', 'empty', 'empty' ],
        [ 'clownfish', 'empty', 'empty', 'empty', 'empty', 'empty', 'clownfish', 'coral', 'clownfish' ],
        [ 'empty', 'coral', 'empty', 'coral', 'clownfish', 'empty', 'empty', 'empty', 'coral' ],
        [ 'empty', 'clownfish', 'empty', 'empty', 'empty', 'coral', 'empty', 'clownfish', 'coral' ],
        [ 'empty', 'empty', 'empty', 'empty', 'empty', 'clownfish', 'empty', 'empty', 'coral' ],
        [ 'empty', 'clownfish', 'coral', 'clownfish', 'coral', 'empty', 'empty', 'empty', 'clownfish' ],
    ],
};

/**
   Utility function ot generate a board from a game config aboe.
   @method _generateGame
   @return {Object}
*/
function _generateGame(config) {

    const board = config.board;
    const boardSize = board[0].length;

    const newBoard = [ ...Array(boardSize + 1) ].map((x, i) => {

        if (i === 0) {
            return [ ...Array(boardSize + 1) ].map((x, i) => {
                if (i === 0) {
                    return {
                        type: 'none',
                        fulfilled: true,
                    };
                }

                let value = 0;

                for (let row = 0; row < boardSize; row++) {
                    if (board[row][i - 1] === 'clownfish') {
                        value++;
                    }
                }
                return {
                    type: 'constraint',
                    value,
                };
            });
        }

        return [ ...Array(boardSize + 1) ].map((x, j) => {

            if (j === 0) {

                let value = 0;

                for (let col = 0; col < boardSize; col++) {
                    if (board[i - 1][col] === 'clownfish') {
                        value++;
                    }
                }

                return {
                    type: 'constraint',
                    value,
                };
            }

            let type = board[i - 1][j - 1];
            const debug = true;

            if (!debug) {
                type = (type === 'clownfish') ? 'empty' : type;
            }

            return {
                type
            };
        });
    });

    return {
        title: config.title,
        board: newBoard,
        winner: false,
    };
};



const predefinedGames = [ sixEasy, sevenEasy, eightEasy, nineEasy ].map(game => _generateGame(game));

export { predefinedGames };
