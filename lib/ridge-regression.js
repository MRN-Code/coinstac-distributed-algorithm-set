'use strict';
var n = require('numeric');
module.exports = {
    defaultLambda: 0.7,

    /**
     * Compute local paricipant set ROI error (objective)
     * @note See [Eqn 6]
     * @param  {array}  w      ?iterative regressor?
     * @param  {array}  X      2D array where rows ~subjects, cols ~ROIs, cells ~ subject-ROI volumes
     * @param  {array}  y      response
     * @param  {number} lambda
     * @return {number}
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
                    n.rep([X.length], 1),
                    n.mul(n.transpose(n.rep([X[0].length], n.sub(y, n.dot(X, w)))), X)
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
    aggregateAvg: function(W) {
        var result = n.dot(
            n.rep([W.length], 1),
            W
        );
        return n.div(result, W.length);
    },

    /**
     * minimize a set of regressors against an objective function and
     * response set
     * @param  {array} x0 initial regressor values
     * @param  {array}  X      2D array where rows ~subjects, cols ~ROIs, cells ~ subject-ROI volumes
     * @param  {array}  y      response
     * @return {array}  minimized regressor values
     */
    minimize: function(x0, X, y) {
        return n.uncmin(function(w) {
            return this.objective(w, X, y);
        }.bind(this), x0).solution;
    },

    applyModel: function(coefficients, ROIs) {
        return n.dot(ROIs, coefficients);
    }

};
