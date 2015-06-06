*natural-number-range* is a module to calculate sequences of numbers.

It exports a single anonymous function of 3 arguments:

1.  *a*, the beginning of the range
1.  *z*, the end of the range (inclusive)
1.  *opts*, an optional hash containing either:
    a. *step: N*, a step size, for calculating additive sequences
    a. *scale: X*, a scaling factor, for calculating multiplicative sequences

This function can be called with 0, 1, 2, or 3 arguments. You can require(..) this function and give it any name you want; I will refer to it as __range__ below.

    module.exports = range = (a, z, opts = step: 1) ->
      if !a then return []
      if !z then [z, a] = [a, if a < 0 then -1 else 1]

Passing in no arguments always returns an empty sequence, [].

Passing in one argument *a* computes the additive range *1..a* if *a* is positive or *a..-1* if a is negative.

Passing in two arguments *a* & *z* computes the ascending range *a..z* if *a* < *z*, otherwise it computes the descending range *z..a*.

Passing in three arguments provides the most functionality.  Any step size can be passed into the *opts* hash.


      array = []
    
      if !opts.scale # Standard range (additive)
        if a > z then return range(z, a, opts).reverse()
        while Math.round(a) <= z
          array.push Math.round a
          a += opts.step
      else # Logarithmic range (multiplicative)
        if a < 0 and z < 0 and Math.abs(a) > Math.abs(z) or
            a > 0 and z < 0 or a > 0 and z > 0 and a > z
          return range(z, a, opts).reverse()
        else if a < 0 and z > 0
          [minus, plus] = [range(a, -1, opts), range(1, z, opts)]
          return minus.concat plus
        while Math.round(Math.abs(a)) <= Math.abs(z)
          array.push Math.round a
          a *= opts.scale
      
      return array
~~~
