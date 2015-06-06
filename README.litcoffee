# *natural-number-range* 

A module to compute additive & multiplicative sequences of numbers.

#### Some additive sequences

| Input | Output |
|:----- |:------ |
| `range 5` | `1, 2, 3, 4, 5` |
| `range 100, 95` | `100, 99, 98, 97, 96, 95` |
| `range -2, 2` | `-2, -1, 0, -1, 2` |

#### Some multiplicative sequences

| Input | Output |
|:----- |:------ |
| `range 1, 1000, scale: 10` | `1, 10, 100, 1000` |
| `range 16, 1, scale: 2` | `16, 8, 4, 2, 1` |
| `range -25, 25, scale: 5` | `-25, -5, -1, 1, 5, 25` |

## The Module

This module exports a single function of 3 arguments, all of which are optional:

1.  *a*, the beginning of the range
1.  *z*, the end of the range (inclusive)
1.  *options*, an optional hash containing:

  - either *step: N*, a step size, for computing additive sequences
  - or *scale: X*, a scaling factor, for computing multiplicative sequences

For function calls of zero, one, or two arguments, additive sequences of step size 1 are computed by default.

    module.exports = range = (a, z, options = step: 1) ->

Passing in no arguments always returns an empty sequence, [].

      if !a then return []

Passing in one argument *a* without *z* computes the sequence *1..a* for positive *a* and *-1..a* for negative *a*.

      if !z then [z, a] = [a, if a < 0 then -1 else 1]

Passing in two arguments *a, z* always computes the ascending sequence *a..z*.  To compute a descending sequnce when *z* < *a*, it computes and reverses the ascending sequence *z..a*.

      if isDescending a, z, options
        return range(z, a, options).reverse()

Passing in three arguments allows you to compute multiplicative sequences.  Ascending/descending order is determined by the order of the arguments, *not* by a negative step size or <1 scaling factor.  To avoid bad input, all steps are normalized to positive numbers & all scaling factors are normalized to positive numbers greater than 1.

      if options.scale
        options.scale = Math.abs options.scale
        if options.scale < 1
          options.scale = 1 / options.scale
        else if options.scale == 1
          return []
      else
        if options.step == 0
          return []
        options.step = Math.abs options.step

Like additive sequences, multiplicative sequences can ascend across 0, but they do it differently.  These double-ended sequences are formed by combining one ascending sequence (*a* up to *-1*) with another (*+1* up to *z*).

      if isDoubleEnded a, z, options
        return range(a, -1, options).concat range(1, z, options)

Passing in a scaling factor *X* will always compute a multiplicative sequence, ignoring any step size.  Otherwise, it computes the additive sequence *a..z*.

      if options.scale then multiplicative a, z, options.scale
      else additive a, z, options.step

#### Helper functions

    isDescending = (a, z, options) ->
      if !options.scale
        a > z
      else
        a < 0 and z < 0 and Math.abs(a) > Math.abs(z) or
        a > 0 and z < 0 or
        a > 0 and z > 0 and a > z

    isDoubleEnded = (a, z, options) ->
      options.scale and a < 0 and z > 0

The 2 functions `additive` and `multiplicative` both generate ascending sequences.  Additive sequences terminate when their values round to an integer above the upper bound.

    additive = (lower, upper, step) ->
      array = []
      while Math.round(lower) <= upper
        array.push Math.round lower
        lower += step
      return array

Multiplicative sequences terminate when their rounded absolute values exceed the absolute value of their upper bound.

    multiplicative = (lower, upper, scale) ->
      array = []
      while Math.round(Math.abs(lower)) <= Math.abs(upper)
        array.push Math.round lower
        lower *= scale
      return array

## Build / Test

To build & test, you will need `coffee-script` and `mocha` to be installed globally (`-g`).

To build the module: `npm run build`.

To run the tests: `npm run test`.

---

*This file is written in Literate CoffeeScript: all source code is shown above.  The module `index.js` is generated from this file.*
