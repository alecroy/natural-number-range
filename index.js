'use strict';

function range(start, end, options) {
  var array = [];
  if (!start) {
    return array;
  }

  if (!end && start > 0) {
    end = start;
    start = 1;
  } else if (!end && start < 0) {
    end = start;
    start = -1;
  }

  options = options || {};
  var step = options.step || 1;
  var scale = options.scale;

  if (scale) {
    if (start < 0 && end > 0) {
      var negatives = range(start, -1, options);
      var positives = range(1, end, options);
      return negatives.concat(positives);
    } else if (start < 0 && end < 0 && Math.abs(start) > Math.abs(end) ||
      start > 0 && end < 0 ||
      start > 0 && end > 0 && start > end) {
      return range(end, start, { scale: scale }).reverse();
    }
  } else if (start > end) {
    return range(end, start, { step: step }).reverse();
  }

  if (scale) { // Logarithmic range (multiplicative)
    for (; Math.round(Math.abs(start)) <= Math.abs(end); start *= scale) {
      array.push(Math.round(start));
    }
  } else { // Standard range (additive)
    for (; Math.round(start) <= end; start += step) {
      array.push(Math.round(start));
    }
  }

  return array;
}

module.exports = range;
