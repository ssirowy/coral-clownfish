/**
   This defines the basic interface of an oracle. You should override this class and then write
   your own suggestion algorithm.
*/
export default class Oracle {

    /**
       Oracle constructor.
       @method constructor
       @param {String}
       @return {void}
    */
    constructor(name) {
        this._name = name;
    }

    /**
       Returns name of oracle.
       @method getTitle
       @return {String}
    */
    getTitle() {
        return this._name;
    }

    /**
       This is the meat of the oracle. Given a board state, suggest the next cell to click
       on the board.
       @method nextCellClicksuggestion
       @param {Object} A 2D array of the board. Remember the actual board is 1-indexed (the 0 indices are the constraints for the board)
       @return {Cell}
    */
    nextCellClickSuggestion(board) {
        throw 'Unimplemented';
    },

    /**

    start(store) {

        this.store = store;
        this.unsubscribe = store.subscribe(state => {
            this.executeStep(store.getState().game.board);
        });

        store.dispatch(setBotRunning(true));
    }

    stop() {
        this.unsubscribe();
        this.store.dispatch(setBotRunning(false));

        this.i = 1;
        this.unsubscribe = this.store = null;
    }

    executeStep(board) {
        console.log(board);

        if (this.i < 7) {
            this.clickCell(2, this.i);
            this.i++;
        }
        else {
            this.stop();
        }
    }

    _sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async clickCell(row, column) {
        if (this.sleepMS) {
            await this._sleep(this.sleepMS);
        }

        this.store.dispatch(clickCell(row, column));
    }
}
