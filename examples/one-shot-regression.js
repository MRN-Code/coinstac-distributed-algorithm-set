'use strict';

global.coinslog = function(arg) {
    return typeof arg === 'object' ? console.dir(arg) : console.log(arg);
};

var oneShotRegression = require('./../index.js').oneShotRegression;
var laplace = require('./../index.js').laplace;
var utils = require('./../index.js').utils;

// test some input/output!
var dummyROIs = [
    [1, 2, 3],
    [2, 4, 3],
    [2, 4, 3],
    [1, 2, 3],
];
var response = [-1, 1, 1, -1]; //+1 = patient -1 = control
var regressor = [1, 1, 1];

var normalizedResponse = utils.normalize(response);
global.coinslog('zero-centered response');
global.coinslog(normalizedResponse);

var normalizedROIs = utils.normalize(dummyROIs);
global.coinslog('zero-centered ROIs');
global.coinslog(normalizedROIs);

global.coinslog('oneShotRegression.objective');
global.coinslog(oneShotRegression.objective(regressor, normalizedROIs, normalizedResponse));

var minimized = oneShotRegression.minimize(regressor, normalizedROIs, normalizedResponse);
global.coinslog('minimized oneShotRegression.objective');
global.coinslog(minimized);

var predictions = oneShotRegression.applyModel(minimized, normalizedROIs);
global.coinslog('predicted values');
global.coinslog(predictions);

var r2 = utils.r2(normalizedResponse, predictions);
global.coinslog('coefficient of determination (r^2)');
global.coinslog(r2);

/*
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
*/
