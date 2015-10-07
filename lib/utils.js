'use strict';

var n = require('numeric');
var jStat = require('jstat').jStat;

/**
 * Get the sign (-1, 0, 1) of a value
 * Note: this is available in ES2015 as Math.sign
 * @param  {number} value The value whose sign should be computed
 * @return {int}       -1 for negative, 0 for 0 and 1 for positive
 */
function sign(value) {
    'use strict';
    if (value === 0) {
        return 0;
    }

    return value / Math.abs(value);
}

/**
 * zero-center an array of ROI values
 * @param  {[type]} values
 * @return {[type]}        [description]
 */
function zeroCenter(values) {
    var trans;
    var zeroTrans;
    var sum;
    var mean;

    // test if multi-dimensional
    if (values[0].length) {
        trans = n.t(values).transpose().x;
        zeroTrans = trans.map(zeroCenter);
        return n.t(zeroTrans).transpose().x;
    }

    sum = n.sum(values);
    mean = sum / values.length;
    return n.sub(values, mean);
}

function r2(dependentVars, predictions) {
    var meanY;
    var ssTot;
    var ssRes;
    var result;
    var diffTot;
    var diffRes;

    meanY = jStat.mean(dependentVars);

    diffTot = n.sub(dependentVars, meanY);
    ssTot = n.dot(diffTot, diffTot);

    diffRes = n.sub(dependentVars, predictions);
    ssRes = n.dot(diffRes, diffRes);

    result = 1 - (ssRes / ssTot);

    return result;
}

module.exports.sign = sign;
module.exports.zeroCenter = zeroCenter;
module.exports.r2 = r2;
