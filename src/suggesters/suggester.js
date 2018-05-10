/**
   This defines the basic interface of a suggester. You should override this class and then write
   your own suggestion algorithm.
*/
export default class Suggester {

    /**
       Suggester constructor.
       @method constructor
       @param {String}
       @return {void}
    */
    constructor(name) {
        this._name = name;
    }

    /**
       Returns name of suggester.
       @method getTitle
       @return {String}
    */
    getName() {
        return this._name;
    }

    /**
       This is the meat of the suggester. Given a board state, suggest the next cell to click
       on the board.
       @method nextCellClicksuggestion
       @param {Object} A 2D array of the board. Remember the actual board is 1-indexed (the 0 indices are the constraints for the board)
       @return {Cell}
    */
    nextSuggestion(board) {
        throw 'Unimplemented';
    }
}
