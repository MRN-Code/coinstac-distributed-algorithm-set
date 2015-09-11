'use strict';
var utils = require('./utils.js');
var numeric = require('numeric');
var _ = require('lodash');

/**
 * calculate the inverse Laplace CDN at the given location
 * @param  {number} location a number between -0.5 and 0.5
 * @param  {number} scale of the CDN (defaults to 1)
 * @param  {number} mean of the CDN (default to 0)
 * @return {number}   The inverse transform of the CDN at location
 */
function inverseCdn(location, scale, mean) {
    scale = scale || 1;
    mean = mean || 0;

    var sign = utils.sign(location);

    if (location > 0.5 || location < -0.5) {
        throw new Error('location must be -0.5 < location < 0.5');
    }

    return mean - (scale * location) * Math.log(1 - (2 * Math.abs(location)));
}

/**
 * sample from the Laplace inverse CDN
 * @param  {int} count number of samples
 * @param  {number} scale the scale of the CDN
 * @param  {number} mean  the mean of the CDN
 * @return {array}      array containing `count` samples
 */
function sampleInverseCdn(count, scale, mean) {
    var locations = numeric.random([1, count]).map(function(location) {
        return location - 0.5;
    });

    return locations.map(_.partialRight(inverseCdn, scale, mean));
}

/**
 * calculate random Laplace noise. Assumes CDN has a mean of 0
 * @param  {number} scale the scale of the CDN (defaults to 1)
 * @return {number}       the noise
 */
function noise(scale) {
    return sampleInverseCdn(1, scale)[0];
}

module.exports = {
    inverse: inverseCdn,
    sampleInverse: sampleInverseCdn,
    noise: noise
};
