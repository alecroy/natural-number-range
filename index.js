'use strict';

module.exports = function(start, end, options) {
  var array = [];
  options = options || {};
  var step = options.step || 1;

  if (step > 0) {
    if (start && !end) {
      end = start;
      start = 1;
    }

    if (options.scale) { // Logarithmic range (multiplicative)
      for (; Math.floor(start) <= end; start *= options.scale) {
        array.push(Math.floor(start));
      }
    } else { // Standard range (additive)
      for (; Math.round(start) <= end; start += step) {
        array.push(Math.round(start));
      }
    }
  } else if (step < 0) {
    if (options.scale) { // Logarithmic range (multiplicative)
      for (; Math.floor(start) <= end; start /= options.scale) {
        array.push(Math.floor(start));
      }
    } else { // Standard range (additive)
      for (; Math.round(start) <= end; start -= step) {
        array.push(Math.round(start));
      }
    }
  }

  return array;
};
