# *natural-number-range* 

A module to compute additive & multiplicative sequences of numbers.

#### Some additive sequences

`1, 2, 3, 4, 5`
`100, 99, 98, 97, 96, 95`
`-2, -1, 0, -1, 2`

#### Some multiplicative sequences

`1, 10, 100, 1000`
`16, 8, 4, 2, 1`
`-25, -5, -1, 1, 5, 25`

## Exports

This module exports a single function of 3 arguments, all of which are optional:

1.  *a*, the beginning of the range
1.  *z*, the end of the range (inclusive)
1.  *options*, an optional hash containing either:
    a. *step: N*, a step size, for computing additive sequences
    a. *scale: X*, a scaling factor, for computing multiplicative sequences

For function calls of zero, one, or two arguments, additive sequences of step size 1 are computed by default.

    module.exports = range = (a, z, options = step: 1) ->

Passing in no arguments always returns an empty sequence, [].

      if !a then return []

Passing in one argument *a* without *z* computes the sequence *1..a* for positive *a* and *-1..a* for negative *a*.

      if !z then [z, a] = [a, if a < 0 then -1 else 1]

Passing in two arguments *a, z* always computes the ascending sequence *a..z*.  To compute a descending sequnce when *z* < *a*, it computes and reverses the ascending sequence *z..a*.

      if isDescending a, z, options
        return range(z, a, options).reverse()

Passing in three arguments provides the most functionality, allowing you to computer multiplicative sequences.

Like additive sequences, multiplicative sequences can ascend across 0, stopping when they scale below ±1.  This is a double-ended sequence, since the negative side scales down from *-a* to *-1*, then the positive side scales up from *+1* to *+z*.

      if isDoubleEnded a, z, options
        return range(a, -1, options).concat range(1, z, options)

Passing in a scaling factor *X* will always compute a multiplicative sequence, ignoring any step size.

      if options.scale
        multiplicative a, z, options.scale
      else
        if a > z then range(z, a, options).reverse()
        else additive a, z, options.step

## Helper functions

    isDescending = (a, z, options) ->
      if !options.scale
        a > z
      else
        a < 0 and z < 0 and Math.abs(a) > Math.abs(z) or
        a > 0 and z < 0 or
        a > 0 and z > 0 and a > z

    isDoubleEnded = (a, z, options) ->
      options.scale and a < 0 and z > 0

    additive = (lower, upper, step) ->
      array = []
      while Math.round(lower) <= upper
        array.push Math.round lower
        lower += step
      return array

    multiplicative = (lower, upper, scale) ->
      array = []
      while Math.round(Math.abs(lower)) <= Math.abs(upper)
        array.push Math.round lower
        lower *= scale
      return array
~~~
