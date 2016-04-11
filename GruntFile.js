'use strict';

module.exports = function(grunt) {

  // load all grunt tasks
  require('load-grunt-config')(grunt);

  grunt.registerTask('test:protractor', ['protractor_webdriver:local', 'protractor:local']);
};
