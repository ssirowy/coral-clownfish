const six = {
    title: '6x6 easy',
    board: [
        [ 'empty', 'shrub', 'empty', 'empty', 'shrub', 'shelter' ],
        [ 'empty', 'shelter', 'empty', 'shelter', 'shrub', 'shrub' ],
        [ 'empty', 'empty', 'empty', 'shrub', 'empty', 'shelter' ],
        [ 'empty', 'shrub', 'empty', 'shelter', 'empty', 'empty' ],
        [ 'empty', 'shelter', 'empty', 'empty', 'empty', 'empty' ],
        [ 'empty', 'empty', 'empty', 'shrub', 'shelter', 'empty' ],
    ],
};

const seven = {
    title: '7x7 easy',
    board: [
        [ 'empty', 'empty', 'shrub', 'shelter', 'empty', 'shelter', 'empty' ],
        [ 'shelter', 'empty', 'shrub', 'empty', 'empty', 'shrub', 'empty' ],
        [ 'shrub', 'empty', 'shelter', 'empty', 'empty', 'empty', 'empty' ],
        [ 'shelter', 'shrub', 'empty', 'empty', 'empty', 'empty', 'empty' ],
        [ 'empty', 'shrub', 'shrub', 'shelter', 'empty', 'shelter', 'shrub' ],
        [ 'empty', 'shelter', 'empty', 'empty', 'empty', 'empty', 'empty' ],
        [ 'empty', 'empty', 'empty', 'empty', 'shelter', 'shrub', 'empty' ],
    ],
};

const eight = {
    title: '8x8 easy',
    board: [
        [ 'empty', 'empty', 'shrub', 'shelter', 'shrub', 'shelter', 'shrub', 'shelter' ],
        [ 'empty', 'shelter', 'empty', 'empty', 'empty', 'empty', 'empty', 'shrub' ],
        [ 'empty', 'shrub', 'empty', 'empty', 'empty', 'empty', 'empty', 'shelter' ],
        [ 'empty', 'empty', 'shelter', 'shrub', 'shelter', 'empty', 'empty', 'shrub' ],
        [ 'shelter', 'empty', 'shrub', 'empty', 'empty', 'empty', 'empty', 'shelter' ],
        [ 'shrub', 'empty', 'empty', 'shelter', 'empty', 'empty', 'shrub', 'empty' ],
        [ 'shelter', 'shrub', 'empty', 'shrub', 'empty', 'empty', 'shelter', 'empty' ],
        [ 'empty', 'shrub', 'shelter', 'empty', 'shelter', 'shrub', 'empty', 'empty' ],
    ],

};

const generateGame = function(config) {

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
                    if (board[row][i - 1] === 'shelter') {
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
                    if (board[i - 1][col] === 'shelter') {
                        value++;
                    }
                }

                return {
                    type: 'constraint',
                    value,
                };
            }

            let type = board[i - 1][j - 1];
            const debug = false;

            if (!debug) {
                type = (type === 'shelter') ? 'empty' : type;
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

const predefinedGames = [ six, seven, eight ].map(game => generateGame(game));

export { predefinedGames };
