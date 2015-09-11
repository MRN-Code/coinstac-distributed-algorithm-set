global.coinslog = function(arg) {
    return typeof arg === 'object' ? console.dir(arg) : console.log(arg);
};

var n = require('numeric');
var oneShotRegression = require('./index.js').oneShotRegression;
var laplace = require('./index.js').laplace;

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

coinslog('Laplace Noise with scale of 1');
coinslog(laplace.noise(1));

coinslog('Laplace Noise with scale of 100');
coinslog(laplace.noise(100));

coinslog('Laplace Noise with scale of 1000');
coinslog(laplace.noise(1000));


coinslog('Inverse Laplace Transform of 0');
coinslog(laplace.inverse(0,1,0));

coinslog('Inverse Laplace Transform of 0.2');
coinslog(laplace.inverse(0.2,1,0));
