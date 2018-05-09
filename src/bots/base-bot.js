import { botRunning, clickCell } from '../actions';
/**
   This defines the basic interface of a bot. You should inherit from this and...
*/
export default class BasicBot {
    constructor() {
        this.title = 'Basic bot';
        this.unsubscribe = null;
        this.store = null;
        this.sleepMS = 500;

        this.i = 1;
    }

    start(store) {

        this.store = store;
        this.unsubscribe = store.subscribe(state => {
            this.executeStep(store.getState().game.board);
        });

        store.dispatch(botRunning(true));
    }

    stop() {
        this.unsubscribe();
        this.store.dispatch(botRunning(false));

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
x
    async clickCell(row, column) {
        if (this.sleepMS) {
            await this._sleep(this.sleepMS);
        }

        this.store.dispatch(clickCell(row, column));
    }
}
