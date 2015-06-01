module.exports = range = (a, z, opts = step: 1) ->
  if !a then return []
  if !z then [z, a] = [a, if a < 0 then -1 else 1]
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
