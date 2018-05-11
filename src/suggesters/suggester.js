/**
   This defines the basic interface of a suggester. You should override this class and then write
   your own suggestion algorithm.
   @class Suggester
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
       This is the meat of the suggester. Given a game state, suggest the next cell to click
       on the board. Note you should NOT be updating the input value in any way, and this will change
       every time this method gets called.  Given the input, you should be providing a cell value to
       "click" on.

       While this is encapsulated in a class (meaning you can store any amount of state), bonus
       points if you can implement a suggester that is a pure function, i.e it only needs the input
       value to provide an output.

       You can return null and expect a no-op in game play.

       @method nextCellClicksuggestion
       @param {Game} An object representing a game, most importantly which includes a board state.
       @return {Cell}
    */
    nextSuggestion(game) {
        throw 'Unimplemented';
    }
}
