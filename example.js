global.coinslog = function(arg) {
    return typeof arg === 'object' ? console.dir(arg) : console.log(arg);
};

var n = require('numeric');
var oneShotRegression = require('./lib/one-shot-regression.js');

// test some input/output!
var dummyROIs = [
    [1, 2, 3],
    [1, 2, 3],
    [1, 2, 3],
    [1, 2, 3],
];
var response = [3, 1, 2, 1.2];
var regressor = [1, 1, 1];
coinslog('oneShotRegression.objective');
coinslog(oneShotRegression.objective(regressor, dummyROIs, response));

var minimized = n.uncmin(function(x) {
    return oneShotRegression.objective(x, dummyROIs, response);
}, regressor).solution;

coinslog('minimized oneShotRegression.objective');
coinslog(minimized);
coinslog('re-applied oneShotRegression.objective');
coinslog(oneShotRegression.objective(minimized, dummyROIs, response));
