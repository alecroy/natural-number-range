'use strict';

var range = require('./');

console.dir(range(1000, 1000000, {scale: Math.sqrt(10)}));
// [ 1000, 3162, 10000, 31622, 100000, 316227, 1000000 ]

console.dir(range(1000, 1, {scale: Math.sqrt(10)}));
// [ 1000, 316, 100, 32, 10, 3, 1 ]

console.dir(range(-5, -1, {scale: 2}));
// [ -4, -2, -1 ]

console.dir(range(-5, 5, {scale: 2}));
// [ -4, -2, -1, 1, 2, 4 ]

console.dir(range(-10, 100, {scale: Math.sqrt(10)}));
// [ -10, -3, -1, 1, 3, 10, 32, 100 ]
