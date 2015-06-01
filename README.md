# natural-number-range

This is a very small library for generating sequences of natural numbers.  Both standard ranges (1, 2, 3..) and logarithmic ranges (1, 10, 100..) are generated by the same one function.

## Example Usage

~~~javascript
var range = require('natural-number-range')

range(5)
//  [ 1, 2, 3, 4, 5 ]

range(5, 9, {step: 2})
//  [ 5, 7, 9 ]

range(1000, 1000000, {scale: Math.sqrt(10)})
//  [ 1000, 3162, 10000, 31623, 100000, 316228, 1000000 ]

range(1000, 1, {scale: Math.sqrt(10)})
//  [ 1000, 316, 100, 32, 10, 3, 1 ]

range(-5, -1, {scale: 2})
//  [ -4, -2, -1 ]

range(-5, 5, {scale: 2})
//  [ -4, -2, -1, 1, 2, 4 ]

range(-10, 100, {scale: Math.sqrt(10)})
//  [ -10, -3, -1, 1, 3, 10, 32, 100 ]
~~~

## Behavior / Tests

~~~
  range = require('natural-number-range')
    ✓ range returns an Array
    ✓ range() = []
    it counts standard additive ranges: N, N+d, N+2d, ..
      ✓ range(5) = [1, 2, 3, 4, 5]
      ✓ range(7, 9) = [7, 8, 9]
      ✓ range(1, 10, {step: 2}) = [1, 3, 5, 7, 9]
      including negative integers, too
        ✓ range(-5) = [-1, -2, -3, -4, -5]
        ✓ range(-5, -1) = []
        ✓ range(-2, 2) = [-2, -1, 0, 1, 2]
        ✓ range(5, -5, {step: 2}) = [5, 3, 1, -1, -3, -5]
      including rounded numbers below the unrounded upper bound
        ✓ range(1, 3.1) = [1, 2, 3]
        ✓ range(1, 2.9) = [1, 2]
        ✓ range(1, 2.1, {step: 0.5}) = [1, 2, 2]
        ✓ range(1, 2.0, {step: 0.5}) = [1, 2, 2]
        ✓ range(1, 1.9, {step: 0.5}) = [1]
        ✓ range(0.7, 2, 0.5) = [1, 1, 2, 2]
        ✓ range(0.7, 1.9, {step: 0.5}) = [1, 1]
    it counts logarithmic ranges: N, s*N, s^2*N, s^3*N..
      ✓ range(1, 10, {scale: 2}) = [1, 2, 4, 8]
      ✓ range(1, 10, {scale: sqrt(10)}) = [1, 3, 10]
      ✓ range(1, 1000000, {scale: sqrt(10)}) = [1 .. 1,000,000]
      including negative integers, too
        ✓ range(-5, -1, {scale: 2}) = [-4, -2, -1]
        ✓ range(-7, 7, {scale: sqrt(7)}) = [-7, -3, -1, 1, 3, 7]
        ✓ range(-2, 2, {scale: sqrt(2)}) = [-2, -1, -1, 1, 1, 2]
      including rounded numbers below the unrounded upper bound
        ✓ range(1, 9.9, {scale: sqrt(10)}) = [1, 3]
        ✓ range(1, 10.1, {scale: sqrt(10)}) = [1, 3, 10]
    it counts downward ranges
      ✓ range(5, 1) = [5, 4, 3, 2, 1]
      ✓ range(-3, -5) = [-3, -4, -5]
      ✓ range(-1, -5, {scale: 2}) = [-1, -2, -4]
      ✓ range(5, 1, {step: 2}) = [5, 3, 1]
      ✓ range(10, 1, {scale: sqrt(10)}) = [10, 3, 1]


  29 passing (28ms)


Done, without errors.
~~~