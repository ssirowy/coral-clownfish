/**
   This defines the basic interface of a bot. You should inherit from this and...
*/
export default class BasicBot {
    constructor() {
        this.title = 'Basic bot';
    }

    start() {
        console.log('Start');
    }

    stop() {
        console.log('Stop');
    }

    executeStep(board) {
        console.log('Execute step');
    }
}
