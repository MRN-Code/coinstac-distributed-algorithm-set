'use strict';
var n = require('numeric');
module.exports = {
    defaultLambda: 0.7,

    /**
     * Compute regression error for a set of samples (objective)
     * @note See [Eqn 6]
     * @param  {array}  mVals   (aka betas or coefficients): array of betas to
     *                          correspond to each xVal.
     * @param  {array}  xVals   2D array where each sub-array contains all xVals
     *                          for a single sample in the same order as
     *                          initialMVals
     * @param  {array}  yVals   array of y values for each sample in xVals
     * @param  {number} lambda
     * @return {number} error score
     */
    objective: function(mVals, xVals, yVals, lambda) {
        lambda = lambda || this.defaultLambda;
        return n.sum(n.pow(n.sub(yVals, n.dot(xVals, mVals)), 2)) +
            (lambda * n.dot(mVals, mVals) / 2);
    },

    /**
     * Compute the local gradient of the object function
     * @note See [Eqn 9]
     * @param  {array}  mVals   (aka betas or coefficients): array of betas to
     *                          correspond to each xVal.
     * @param  {array}  xVals   2D array where each sub-array contains all xVals
     *                          for a single sample in the same order as
     *                          initialMVals
     * @param  {array}  yVals   array of y values for each sample in xVals
     * @param  {number} lambda
     * @return {array}  gradient values for each mVal
     */
    gradient: function(mVals, xVals, yVals, lambda) {
        lambda = lambda || this.defaultLambda;
        return n.add(
            n.mul(
                -2,
                n.dot(
                    n.rep([xVals.length], 1),
                    n.mul(n.transpose(n.rep(
                        [xVals[0].length],
                        n.sub(yVals, n.dot(xVals, mVals))
                    )), xVals)
                )
            ),
            n.mul(lambda, mVals)
        );
    },

    /**
     * minimize a set of regressors against the objective function and
     * response set
     * @param  {array} initialMVals initial regressor values
     * @param  {array} xVals    2D array where each sub-array contains all xVals
     *                          for a single sample in the same order as
     *                          initialMVals
     * @param  {array}  yVals   array of y values for each sample in xVals
     * @return {array}  mVals in same order as initialMVals
     */
    oneShot: function(initialMVals, xVals, yVals) {
        return n.uncmin(function(mVals) {
            return this.objective(mVals, xVals, yVals);
        }.bind(this), initialMVals).solution;
    },

    /**
     * calculate new mVals based on previous mVals, gradients and a learningRate
     * @param  {number} learningRate    the rate applied to the gradient
     * @param  {array} mVals            the previous mVals which gradients were
     *                                  calculated from
     * @param  {array} gradients        the gradients calculated from the mVals
     * @return {array}                  the new mVals (betas)
     */
    recalculateMVals: function(learningRate, mVals, gradients) {
        return n.sub(mVals, n.prod(learningRate, gradients));
    },

    /**
     * Apply mVals (aka coefficients or betas) to x values, then sum results
     * 	aka `y = m1 * x1 + m2 * x2...`
     * @param  {array} mVals array of coefficents (betas)
     * @param  {array} xVals       array of x values
     * @return {number}             result (y value);
     */
    applyModel: function(mVals, xVals) {
        return n.dot(xVals, mVals);
    }

};
