'use strict';

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

module.exports.sign = sign;
