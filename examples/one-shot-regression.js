'use strict';

global.coinslog = function(arg) {
    return typeof arg === 'object' ? console.dir(arg) : console.log(arg);
};

var rr = require('./../index.js').ridgeRegression;
var laplace = require('./../index.js').laplace;
var utils = require('./../index.js').utils;

// test some input/output!
var dummyROIs = [
    [-428.14999999999964],
    [-200.8499999999999],
    [71.65000000000009],
    [557.3499999999999]
];
var subjectTypes = [1, 1, -1, -1]; //+1 = patient -1 = control
var initialCoefficients = [0.23186233500018716];

var normalizedROIs = utils.normalize(dummyROIs);
global.coinslog('zero-centered ROIs');
global.coinslog(normalizedROIs);

var gradients = rr.gradient(
    initialCoefficients,
    normalizedROIs,
    subjectTypes
);

global.coinslog('gradient');
global.coinslog(gradients);

var minimized = rr.oneShot(
    initialCoefficients,
    normalizedROIs,
    subjectTypes
);
global.coinslog('minimized rr');
global.coinslog(minimized);

var predictedSubjectTypes = rr.applyModel(minimized, normalizedROIs);
global.coinslog('predicted values');
global.coinslog(predictedSubjectTypes);

var r2 = utils.r2(subjectTypes, predictedSubjectTypes);
global.coinslog('coefficient of determination (r^2)');
global.coinslog(r2);

/*
global.coinslog('re-applied rr.objective');
global.coinslog(rr.objective(minimized, dummyROIs, response));

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
