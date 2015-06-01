'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    coffee: {
      index: {
        options: { bare: true, },
        files: { 'lib/index.js': 'src/index.coffee' },
      },
    },
    jshint: {
      all: {
        src: ['./*.js', './test/**/*test.js'],
        options: {
          curly: true,
          eqeqeq: true,
          expr: true,
          mocha: true,
          node: true,
          strict: true,
          undef: true,
          unused: true,
        },
      },
    },
    jscs: {
      all: {
        src: ['./*.js', './lib/*.js'],
        options: {
          preset: 'airbnb',
          disallowMultipleVarDecl: null,
          disallowTrailingComma: null,
          maximumLineLength: null,
          requirePaddingNewLinesAfterBlocks: null,
          requirePaddingNewLinesBeforeLineComments: null,
          requireTrailingComma: null,
          verbose: true,
        },
      },
    },
    simplemocha: {
      all: {
        src: ['./test/**/*test.coffee'],
      },
    },
    watch: {
      files: ['./*', './src/**/*', './test/**/*'],
      tasks: ['coffee', 'lint', 'test'],
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-coffee');

  grunt.registerTask('test', 'simplemocha');
  grunt.registerTask('lint', ['jshint', 'jscs']);

  grunt.registerTask('default', ['coffee', 'lint', 'test']);
};
