// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

'use strict';
module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['mocha', 'chai', 'sinon-chai', 'chai-as-promised', 'chai-things'],

    client: {
      mocha: {
        timeout: 5000 // set default mocha spec timeout
      }
    },

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'frontend/bower_components/jquery/dist/jquery.js',
      'frontend/bower_components/angular/angular.js',
      'frontend/bower_components/angular-resource/angular-resource.js',
      'frontend/bower_components/angular-cookies/angular-cookies.js',
      'frontend/bower_components/angular-sanitize/angular-sanitize.js',
      'frontend/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'frontend/bower_components/lodash/dist/lodash.compat.js',
      'frontend/bower_components/angular-ui-router/release/angular-ui-router.js',
      'frontend/bower_components/angular-mocks/angular-mocks.js',
      // endbower
      'frontend/scripts/app.js',
      'frontend/{scripts,components}/**/*.module.js',
      'frontend/{scripts,components}/**/*.js',
      'frontend/{scripts,components}/**/*.html'
    ],

    preprocessors: {
      '**/*.html': 'ng-html2js',
      'frontend/{scripts,components}/**/*.js': 'babel'
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'frontend/'
    },

    babelPreprocessor: {
      options: {
        sourceMap: 'inline',
        optional: [
          'es7.classProperties'
        ]
      },
      filename: function (file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    },

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // reporter types:
    // - dots
    // - progress (default)
    // - spec (karma-spec-reporter)
    // - junit
    // - growl
    // - coverage
    reporters: ['spec'],

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
