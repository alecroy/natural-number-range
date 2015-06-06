'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    coffee: {
      index: {
        files: { 'index.js': 'README.litcoffee' },
      },
    },
    simplemocha: {
      all: {
        src: ['./test/**/*test.coffee'],
      },
    },
    watch: {
      files: ['./*', './test/**/*'],
      tasks: ['coffee', 'lint', 'test'],
    },
  });

  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');

  grunt.registerTask('test', 'simplemocha');
  grunt.registerTask('lint', []);

  grunt.registerTask('default', ['coffee', 'lint', 'test']);
};
