# *natural-number-range* 

A module to compute sequences of numbers.

It exports a single function of 3 arguments:

1.  *a*, the beginning of the range
1.  *z*, the end of the range (inclusive)
1.  *options*, an optional hash containing either:
    a. *step: N*, a step size, for computing additive sequences
    a. *scale: X*, a scaling factor, for computing multiplicative sequences

This function can be called with 0, 1, 2, or 3 arguments. You can require(..) this function and give it any name you want; I will refer to it as __range__ below.

    module.exports = range = (a, z, options = step: 1) ->
      if !a then return []
      if !z then [z, a] = [a, if a < 0 then -1 else 1]

Passing in no arguments always returns an empty sequence, [].

Passing in one argument *a* computes the additive range *1..a* if *a* is positive or *a..-1* if a is negative.

Passing in two arguments *a, z* computes the ascending range *a..z* if *a* < *z*, otherwise it computes the descending range *z..a*.

For function calls of 0, 1, or 2 arguments:

- only additive sequences are computed
- a step size of 1 is used

Passing in three arguments provides the most functionality.  Any step size *step: N* can be passed into the *options* hash.  This computes additive sequences of step size *N*.  Instead of passing a step size, pass a scaling factor *scale: X* to compute multiplicative sequences.

#### Additive Sequences

`1, 2, 3, 4, 5`
`7, 8, 9`
`-2, -1, 0, -1, 2`
`100, 99, 98, 97, 96, 95`

#### Multiplicative Sequences

`1, 10, 100, 1000`
`1, 3, 10, 32, 100, 316, 1000`
`1, 2, 4, 8, 16`
`-10, -3, -1, 1, 3, 10`

Passing in both a *step: N* and a *scale: X* ignores the step size and computes the multiplicative sequence with scaling factor *X*.

      if descending_sequence a, z, options
        return range(z, a, options).reverse()

      if !options.scale
        if a > z then range(z, a, options).reverse()
        else additive a, z, options.step
      else
        if a < 0 and z > 0
          [minus, plus] = [range(a, -1, options), range(1, z, options)]
          minus.concat plus
        else multiplicative a, z, options.scale

    descending_sequence = (a, z, options) ->
      if !options.scale
        a > z
      else
        a < 0 and z < 0 and Math.abs(a) > Math.abs(z) or
        a > 0 and z < 0 or
        a > 0 and z > 0 and a > z




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
