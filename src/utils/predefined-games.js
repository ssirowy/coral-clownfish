const fiveEasy = [
    [ '-', 'f', 'c', 'c', 'f'  ],
    [ '-', '-', '-', '-', '-'  ],
    [ 'c', 'f', '-', '-', '-'  ],
    [ '-', '-', '-', 'f', '-'  ],
    [ 'f', 'c', '-', 'c', '-'  ],
];

const sixEasy =   [
    [ '-', 'c', '-', '-', 'c', 'f' ],
    [ '-', 'f', '-', 'f', 'c', 'c' ],
    [ '-', '-', '-', 'c', '-', 'f' ],
    [ '-', 'c', '-', 'f', '-', '-' ],
    [ '-', 'f', '-', '-', '-', '-' ],
    [ '-', '-', '-', 'c', 'f', '-' ],
];


const sevenEasy =  [
    [ '-', '-', 'c', 'f', '-', 'f', '-' ],
    [ 'f', '-', 'c', '-', '-', 'c', '-' ],
    [ 'c', '-', 'f', '-', '-', '-', '-' ],
    [ 'f', 'c', '-', '-', '-', '-', '-' ],
    [ '-', 'c', 'c', 'f', '-', 'f', 'c' ],
    [ '-', 'f', '-', '-', '-', '-', '-' ],
    [ '-', '-', '-', '-', 'f', 'c', '-' ],
];

const eightEasy = [
    [ '-', '-', 'c', 'f', 'c', 'f', 'c', 'f' ],
    [ '-', 'f', '-', '-', '-', '-', '-', 'c' ],
    [ '-', 'c', '-', '-', '-', '-', '-', 'f' ],
    [ '-', '-', 'f', 'c', 'f', '-', '-', 'c' ],
    [ 'f', '-', 'c', '-', '-', '-', '-', 'f' ],
    [ 'c', '-', '-', 'f', '-', '-', 'c', '-' ],
    [ 'f', 'c', '-', 'c', '-', '-', 'f', '-' ],
    [ '-', 'c', 'f', '-', 'f', 'c', '-', '-' ],
];

const nineEasy = [
    [ 'f', '-', '-', '-', 'f', 'c', '-', '-', '-' ],
    [ 'c', '-', '-', '-', '-', '-', '-', 'f', 'c' ],
    [ '-', 'f', 'c', '-', '-', 'f', '-', '-', '-' ],
    [ 'c', '-', '-', 'f', 'c', 'c', '-', '-', '-' ],
    [ 'f', '-', '-', '-', '-', '-', 'f', 'c', 'f' ],
    [ '-', 'c', '-', 'c', 'f', '-', '-', '-', 'c' ],
    [ '-', 'f', '-', '-', '-', 'c', '-', 'f', 'c' ],
    [ '-', '-', '-', '-', '-', 'f', '-', '-', 'c' ],
    [ '-', 'f', 'c', 'f', 'c', '-', '-', '-', 'f' ],
];

const abbreviatedTypes = {
    '-' : 'empty',
    'c' : 'coral',
    'f' : 'clownfish',
};

/**
   Utility function ot generate a board from a game config aboe.
   @method _generateGame
   @param {Array}
   @return {Object}
*/
function _generateGame(board, index) {

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
        title: `Problem ${index+1}: ${boardSize}x${boardSize}`,
        board: newBoard,
        winner: false,
        index: index,
    };
};



const predefinedGames = [ fiveEasy, sixEasy, sevenEasy, eightEasy, nineEasy ].map((game, index) => _generateGame(game, index));

export { predefinedGames };
