(function() {
  var additive, descending_sequence, multiplicative, range;

  module.exports = range = function(a, z, options) {
    var minus, plus, ref, ref1;
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
    if (descending_sequence(a, z, options)) {
      return range(z, a, options).reverse();
    }
    if (!options.scale) {
      if (a > z) {
        return range(z, a, options).reverse();
      } else {
        return additive(a, z, options.step);
      }
    } else {
      if (a < 0 && z > 0) {
        ref1 = [range(a, -1, options), range(1, z, options)], minus = ref1[0], plus = ref1[1];
        return minus.concat(plus);
      } else {
        return multiplicative(a, z, options.scale);
      }
    }
  };

  descending_sequence = function(a, z, options) {
    if (!options.scale) {
      return a > z;
    } else {
      return a < 0 && z < 0 && Math.abs(a) > Math.abs(z) || a > 0 && z < 0 || a > 0 && z > 0 && a > z;
    }
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
