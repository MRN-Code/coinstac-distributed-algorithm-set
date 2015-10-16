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
 * shift data so that it is centered around zero. Columns are shifted in
 * two-dimensional arrays.
 * @param  {array} values array of values to normalize
 *                        Assumes that data is a one-d array or
 *                        a 2-d array.
 * @return {[type]}        [description]
 */
function normalize(values) {
    var trans;
    var zeroTrans;
    var sum;
    var mean;

    // test if multi-dimensional
    if (values[0].length) {
        trans = n.t(values).transpose().x;
        zeroTrans = trans.map(normalize);
        return n.t(zeroTrans).transpose().x;
    }

    sum = n.sum(values);
    mean = sum / values.length;
    return n.sub(values, mean);
}

function r2(sampleData, modelData) {
    var meanY;
    var ssTot;
    var ssRes;
    var result;
    var diffTot;
    var diffRes;

    meanY = jStat.mean(sampleData);

    diffTot = n.sub(sampleData, meanY);
    ssTot = n.dot(diffTot, diffTot);

    if (ssTot === 0) {
        //@TODO Ask what to do in this case. @dwood
        throw new Error('No variance in data');
    }

    diffRes = n.sub(sampleData, modelData);
    ssRes = n.dot(diffRes, diffRes);

    result = 1 - (ssRes / ssTot);

    return result;
}

/**
 * Simple multi-client response aggregator
 * @param  {array} W set of minimized regressors
 * @return {array}
 */
function columnWiseAverage(table) {
    var result = n.dot(
        n.rep([table.length], 1),
        table
    );
    return n.div(result, table.length);
}

module.exports.sign = sign;
module.exports.normalize = normalize;
module.exports.r2 = r2;
module.exports.columnWiseAverage = columnWiseAverage;
