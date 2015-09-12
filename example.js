'use strict';

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
global.coinslog('oneShotRegression.objective');
global.coinslog(oneShotRegression.objective(regressor, dummyROIs, response));

var minimized = n.uncmin(function(x) {
    return oneShotRegression.objective(x, dummyROIs, response);
}, regressor).solution;

global.coinslog('minimized oneShotRegression.objective');
global.coinslog(minimized);
global.coinslog('re-applied oneShotRegression.objective');
global.coinslog(oneShotRegression.objective(minimized, dummyROIs, response));

global.coinslog('Laplace Noise with scale of 1');
global.coinslog(laplace.noise(1));

global.coinslog('Laplace Noise with scale of 100');
global.coinslog(laplace.noise(100));

global.coinslog('Laplace Noise with scale of 1000');
global.coinslog(laplace.noise(1000));

global.coinslog('Inverse Laplace Transform of 0.5');
global.coinslog(laplace.inverse(0.5));

global.coinslog('Inverse Laplace Transform of 0.3');
global.coinslog(laplace.inverse(0.3));

global.coinslog('Inverse Laplace Transform of 0.9');
global.coinslog(laplace.inverse(0.9));

global.coinslog('Inverse Laplace Transform of 0.9, mu = 2, b  = 2');
global.coinslog(laplace.inverse(0.9, 2, 2));
