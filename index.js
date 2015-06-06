(function() {
  var additive, isDescending, isDoubleEnded, multiplicative, range;

  module.exports = range = function(a, z, options) {
    var ref;
    if (options == null) {
      options = {
        step: 1
      };
    }
    if (!a) {
      return [];
    }
    if (!z) {
      ref = [a, a < 0 ? -1 : 1], z = ref[0], a = ref[1];
    }
    if (isDescending(a, z, options)) {
      return range(z, a, options).reverse();
    }
    if (isDoubleEnded(a, z, options)) {
      return range(a, -1, options).concat(range(1, z, options));
    }
    if (options.scale) {
      return multiplicative(a, z, options.scale);
    } else {
      if (a > z) {
        return range(z, a, options).reverse();
      } else {
        return additive(a, z, options.step);
      }
    }
  };

  isDescending = function(a, z, options) {
    if (!options.scale) {
      return a > z;
    } else {
      return a < 0 && z < 0 && Math.abs(a) > Math.abs(z) || a > 0 && z < 0 || a > 0 && z > 0 && a > z;
    }
  };

  isDoubleEnded = function(a, z, options) {
    return options.scale && a < 0 && z > 0;
  };

  additive = function(lower, upper, step) {
    var array;
    array = [];
    while (Math.round(lower) <= upper) {
      array.push(Math.round(lower));
      lower += step;
    }
    return array;
  };

  multiplicative = function(lower, upper, scale) {
    var array;
    array = [];
    while (Math.round(Math.abs(lower)) <= Math.abs(upper)) {
      array.push(Math.round(lower));
      lower *= scale;
    }
    return array;
  };

}).call(this);
