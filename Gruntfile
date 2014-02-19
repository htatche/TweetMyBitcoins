module.exports = function(grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-jslint');

  grunt.initConfig({
    jslint: { 
      server: {
        src: [ 
          'main.js',
          'twitter/*.js',
        ]
      }
    }
  });

  grunt.registerTask('default', 'jslint');
};