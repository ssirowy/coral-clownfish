/**
   Simple sleep function. Pass in number of milliseconds to sleep before moving on.
   @method sleep
   @param {Integer} ms The number of milliseconds to sleep before returning promise.
   @return {Promise}
*/
export default function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};
