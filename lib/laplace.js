'use strict';
var utils = require('./utils');
var jStat = require('jstat').jStat;

function scaleToRate(scale) {
    scale = scale || 1;
    return 1 / scale;
}

function convertProbability(probability) {
    var errorMsg;
    if (probability <= 0 || probability >= 1) {
        errorMsg = [
            'probability must be in range [0,1]: `',
            probability,
            '` given'
        ].join('');
        throw new Error(errorMsg);
    }

    return 1 - (2 * probability);
}

function convertDistrubution(expX, probability, mean) {
    mean = mean || 0;
    return expX * utils.sign(probability - 0.5) + mean;
}

/**
 * calculate the inverse Laplace CDN at the given location
 * @param  {number} probability a number between 0 and 1
 * @param  {number} scale of the CDN (defaults to 1)
 * @param  {number} mean of the CDN (default to 0)
 * @return {number}   The inverse transform of the CDN at location
 */
function inverseCdn(probability, scale, mean) {
    var rate = scaleToRate(scale);
    var expProbability = convertProbability(probability);
    var expX = jStat.exponential.inv(expProbability, rate);
    return convertDistrubution(expX, probability, mean);
}

/**
 * sample from the Laplace inverse CDN
 * @param  {number} scale the scale of the CDN (defaults to 1)
 * @param  {number} mean  the mean of the CDN (defaults to 0)
 * @return {number}       random sample from Laplace CDN
 */
function sampleInverseCdn(scale, mean) {
    var probability = Math.random();
    var rate =  scaleToRate(scale);
    var expX = jStat.exponential.sample(rate);
    return convertDistrubution(expX, probability, mean);
}

/**
 * calculate random Laplace noise. Assumes CDN has a mean of 0
 * @param  {number} scale the scale of the CDN (defaults to 1)
 * @return {number}       the noise
 */
function noise(scale) {
    return sampleInverseCdn(scale);
}

module.exports = {
    inverse: inverseCdn,
    sampleInverse: sampleInverseCdn,
    noise: noise
};
