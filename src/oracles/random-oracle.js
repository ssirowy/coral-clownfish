import Oracle from './oracle';
import Cell from './cell';

export default class RandomOracle extends Oracle {

    /**
       Return a random number integer in a range.
       @method _getRandomInt
       @param {Integer} min The minimum in range.
       @param {Integer} max The max in range.
       @return {Integer}
    */
    _getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max) + 1;
        return Math.floor(Math.random() * (max - min)) + min;
    }

    /**
       Overridden method of base class. Will return a random cell to click.
       @method nextCellClicksuggestion
       @param {Object} A 2D array of the board.
       @return {Cell}
    */
    nextCellClickSuggestion(board) {
        const size = board.length;
        const randomRow = this._getRandomInt(1, size);
        const randomColumn = this._getRandomInt(1, size);

        return new Cell(randomRow, randomColumn);
    }
}
