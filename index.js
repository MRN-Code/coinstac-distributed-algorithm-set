var n = require('numeric')

global.coinslog = function(arg) {
    typeof arg === 'object' ? console.dir(arg) : console.log(arg);
};

var algorithm1 = {
    defaultLambda: 0.7,

    /**
     * Compute local paricipant set ROI error (objective)
     * @note See [Eqn 6]
     * @param  {array}  w      ?iterative regressor?
     * @param  {array}  X      2D array where rows ~subjects, cols ~ROIs, cells ~ subject-ROI volumes
     * @param  {array}  y      response
     * @param  {number} lambda
     * @return {[type]}        [description]
     */
    objective: function(w, X, y, lambda) {
        lambda = lambda || this.defaultLambda;
        return n.sum(n.pow(n.sub(y, n.dot(X, w)), 2)) + (lambda * n.dot(w, w) / 2);
    },

    /**
     * Compute the local gradient of the object function
     * @note See [Eqn 9]
     * @param  {array}  w      ?iterative regressor?
     * @param  {array}  X      2D array where rows ~subjects, cols ~ROIs, cells ~ subject-ROI volumes
     * @param  {array}  y      response
     * @param  {number} lambda
     * @return {array}
     */
    gradient: function(w, X, y, lambda) {
        lambda = lambda || this.defaultLambda;
        return n.add(
            n.mul(
                -2,
                n.dot(
                    n.rep([X.length],1),
                    n.mul(n.transpose(n.rep([X[0].length],n.sub(y, n.dot(X, w)))),X)
                )
            ),
            n.mul(lambda, w)
        );
    },

    /**
     * Simple multi-client response aggregator
     * @param  {array} W set of minimized regressors
     * @return {array}
     */
    aggregrate: function(W) {
        var result = n.dot(
            n.rep([W.length],1),
            W
        );
        return n.div(result, W.length);
    }

};


// the overall algorithm (Algorithm 1)
dummyROIs = [
    [1,2,3],
    [4,5,6],
    [7,3,9],
    [10,11,12]
];
response = [3,1,2,1.2];
regressor = [1, 1, 1];
coinslog(algorithm1.objective(regressor, dummyROIs, response));

var minimized = n.uncmin(function(x) {
    return algorithm1.objective(x, dummyROIs, response)
}, regressor).solution

coinslog(minimized);
coinslog(algorithm1.objective(minimized, dummyROIs, response));
