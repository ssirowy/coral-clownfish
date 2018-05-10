const fiveEasy = {
    title: '5x5 Problem 1',
    board : [
        [ '-', 'f', 'c', 'c', 'f'  ],
        [ '-', '-', '-', '-', '-'  ],
        [ 'c', 'f', '-', '-', '-'  ],
        [ '-', '-', '-', 'f', '-'  ],
        [ 'f', 'c', '-', 'c', '-'  ],
    ],
};
const sixEasy = {
    title: '6x6 Problem 1',
    board: [
        [ '-', 'c', '-', '-', 'c', 'f' ],
        [ '-', 'f', '-', 'f', 'c', 'c' ],
        [ '-', '-', '-', 'c', '-', 'f' ],
        [ '-', 'c', '-', 'f', '-', '-' ],
        [ '-', 'f', '-', '-', '-', '-' ],
        [ '-', '-', '-', 'c', 'f', '-' ],
    ],
};

const sevenEasy = {
    title: '7x7 Problem 1',
    board: [
        [ '-', '-', 'c', 'f', '-', 'f', '-' ],
        [ 'f', '-', 'c', '-', '-', 'c', '-' ],
        [ 'c', '-', 'f', '-', '-', '-', '-' ],
        [ 'f', 'c', '-', '-', '-', '-', '-' ],
        [ '-', 'c', 'c', 'f', '-', 'f', 'c' ],
        [ '-', 'f', '-', '-', '-', '-', '-' ],
        [ '-', '-', '-', '-', 'f', 'c', '-' ],
    ],
};

const eightEasy = {
    title: '8x8 Problem 1',
    board: [
        [ '-', '-', 'c', 'f', 'c', 'f', 'c', 'f' ],
        [ '-', 'f', '-', '-', '-', '-', '-', 'c' ],
        [ '-', 'c', '-', '-', '-', '-', '-', 'f' ],
        [ '-', '-', 'f', 'c', 'f', '-', '-', 'c' ],
        [ 'f', '-', 'c', '-', '-', '-', '-', 'f' ],
        [ 'c', '-', '-', 'f', '-', '-', 'c', '-' ],
        [ 'f', 'c', '-', 'c', '-', '-', 'f', '-' ],
        [ '-', 'c', 'f', '-', 'f', 'c', '-', '-' ],
    ],

};

const nineEasy = {
    title: '9x9 Problem 1',
    board: [
        [ 'f', '-', '-', '-', 'f', 'c', '-', '-', '-' ],
        [ 'c', '-', '-', '-', '-', '-', '-', 'f', 'c' ],
        [ '-', 'f', 'c', '-', '-', 'f', '-', '-', '-' ],
        [ 'c', '-', '-', 'f', 'c', 'c', '-', '-', '-' ],
        [ 'f', '-', '-', '-', '-', '-', 'f', 'c', 'f' ],
        [ '-', 'c', '-', 'c', 'f', '-', '-', '-', 'c' ],
        [ '-', 'f', '-', '-', '-', 'c', '-', 'f', 'c' ],
        [ '-', '-', '-', '-', '-', 'f', '-', '-', 'c' ],
        [ '-', 'f', 'c', 'f', 'c', '-', '-', '-', 'f' ],
    ],
};

// [ '-', '-', '-', '-', '-', '-' ],

const abbreviatedTypes = {
    '-' : 'empty',
    'c' : 'coral',
    'f' : 'clownfish',
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
                    if (board[row][i - 1] === 'f') {
                        value++;
                    }
                }
                return {
                    type: 'constraint',
                    value,
                    constraintType: 'column',
                };
            });
        }

        return [ ...Array(boardSize + 1) ].map((x, j) => {

            if (j === 0) {

                let value = 0;

                for (let col = 0; col < boardSize; col++) {
                    if (board[i - 1][col] === 'f') {
                        value++;
                    }
                }

                return {
                    type: 'constraint',
                    value,
                    constraintType: 'row',
                };
            }

            let type = abbreviatedTypes[board[i - 1][j - 1]];
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



const predefinedGames = [ fiveEasy, sixEasy, sevenEasy, eightEasy, nineEasy ].map(game => _generateGame(game));

export { predefinedGames };
