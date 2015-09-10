global.coinslog = function(arg) {
    return typeof arg === 'object' ? console.dir(arg) : console.log(arg);
};

var n = require('numeric');
var algorithm1 = require('./lib/algorithm1.js');

// test some input/output!
dummyROIs = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 3, 9],
    [10, 11, 12]
];
response = [3, 1, 2, 1.2];
regressor = [1, 1, 1];
coinslog(algorithm1.objective(regressor, dummyROIs, response));

var minimized = n.uncmin(function(x) {
    return algorithm1.objective(x, dummyROIs, response);
}, regressor).solution;

coinslog(minimized);
coinslog(algorithm1.objective(minimized, dummyROIs, response));
