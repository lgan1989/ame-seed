// Generated on 2015-12-10 using generator-angular-fullstack 3.0.2
'use strict';

module.exports = function(grunt) {
    var localConfig;
    try {
        localConfig = require('./server/config/local.env');
    } catch (e) {
        localConfig = {};
    }

    // Load grunt tasks automatically, when needed
    require('jit-grunt')(grunt, {
        shell: 'grunt-shell-spawn',
        useminPrepare: 'grunt-usemin',
        ngtemplates: 'grunt-angular-templates',
        cdnify: 'grunt-google-cdn',
        protractor: 'grunt-protractor-runner',
        buildcontrol: 'grunt-build-control',
        istanbul_check_coverage: 'grunt-mocha-istanbul'
    });

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        pkg: grunt.file.readJSON('package.json'),
        yeoman: {
            // configurable paths
            client: require('./bower.json').appPath || 'frontend',
            server: 'backend',
            dist: 'dist'
        },
        shell: {
            dev: {
                command: 'electron server.js',
                options:{
                    async: true
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= express.options.port %>'
            }
        },
        watch: {
            babel: {
                files: ['<%= yeoman.client %>/{scripts,components}/**/!(*.spec|*.mock).js'],
                tasks: ['newer:babel:client']
            },
            injectJS: {
                files: [
                    '<%= yeoman.client %>/{scripts,components}/**/!(*.spec|*.mock).js',
                    '!<%= yeoman.client %>/scripts/app.js'
                ],
                tasks: ['injector:scripts']
            },
            injectCss: {
                files: ['<%= yeoman.client %>/{styles,bower_components}/**/*.css'],
                tasks: ['injector:css']
            },
            mochaTest: {
                files: ['<%= yeoman.server %>/**/*.{spec,integration}.js', 'server.js'],
                tasks: ['env:test', 'mochaTest']
            },
            jsTest: {
                files: ['<%= yeoman.client %>/{scripts,bower_components}/**/*.{spec,mock}.js'],
                tasks: ['newer:jshint:all', 'wiredep:test', 'karma']
            },
            injectSass: {
                files: ['<%= yeoman.client %>/{styles,bower_components}/**/*.{scss,sass}'],
                tasks: ['injector:sass']
            },
            sass: {
                files: ['<%= yeoman.client %>/{styles,bower_components}/**/*.{scss,sass}'],
                tasks: ['sass', 'postcss']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                files: [
                    '{.tmp,<%= yeoman.client %>}/{styles,views}/**/*.{css,html}',
                    '{.tmp,<%= yeoman.client %>}/{scripts}/**/!(*.spec|*.mock).js',
                    '<%= yeoman.client %>/assets/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
                ],
                options: {
                    livereload: true
                }
            },
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '<%= yeoman.client %>/.jshintrc',
                reporter: require('jshint-stylish')
            },
            server: {
                options: {
                    jshintrc: '<%= yeoman.server %>/.jshintrc'
                },
                src: ['<%= yeoman.server %>/**/!(*.spec|*.integration).js']
            },
            serverTest: {
                options: {
                    jshintrc: '<%= yeoman.server %>/.jshintrc-spec'
                },
                src: ['<%= yeoman.server %>/**/*.{spec,integration}.js']
            },
            all: ['<%= yeoman.client %>/{scripts,components}/**/!(*.spec|*.mock).js'],
            test: {
                src: ['<%= yeoman.client %>/{scripts,components}/**/*.{spec,mock}.js']
            }
        },

        jscs: {
            options: {
                config: '.jscsrc'
            },
            main: {
                files: {
                    src: [
                        '<%= yeoman.client %>/scripts/**/*.js',
                        '<%= yeoman.server %>/**/*.js'
                    ]
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/!(.git*|.openshift|Procfile)**'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Add vendor prefixed styles
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({
                        browsers: ['last 2 version']
                    })
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/',
                    src: '{,*/}*.css',
                    dest: '.tmp/'
                }]
            }
        },

        // Debugging with node inspector
        'node-inspector': {
            custom: {
                options: {
                    'web-host': 'localhost'
                }
            }
        },

        // Use nodemon to run server in debug mode with an initial breakpoint
        nodemon: {
            debug: {
                script: 'server.js',
                options: {
                    nodeArgs: ['--debug-brk'],
                    env: {
                        PORT: process.env.PORT || 9000
                    },
                    callback: function(nodemon) {
                        nodemon.on('log', function(event) {
                            console.log(event.colour);
                        });

                        // opens browser on initial server start
                        nodemon.on('config:update', function() {
                            setTimeout(function() {
                                require('open')('http://localhost:8080/debug?port=5858');
                            }, 500);
                        });
                    }
                }
            }
        },

        // Automatically inject Bower components into the app and karma.conf.js
        wiredep: {
            options: {
                exclude: [
                    /bootstrap.js/,
                    '/json3/',
                    '/es5-shim/',
                    /font-awesome\.css/,
                    /bootstrap\.css/,
                    /bootstrap-sass-official/
                ]
            },
            client: {
                src: '<%= yeoman.client %>/views/index.html',
                ignorePath: '<%= yeoman.client %>/',
            },
            test: {
                src: './karma.conf.js',
                devDependencies: true
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= yeoman.dist %>/<%= yeoman.client %>/!(bower_components){,*/}*.{js,css}',
                    '<%= yeoman.dist %>/<%= yeoman.client %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%= yeoman.dist %>/<%= yeoman.client %>/assets/fonts/*'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: ['<%= yeoman.client %>/views/index.html'],
            options: {
                dest: '<%= yeoman.dist %>/<%= yeoman.client %>'
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/<%= yeoman.client %>/{,!(bower_components)/**/}*.html'],
            css: ['<%= yeoman.dist %>/<%= yeoman.client %>/styles/*.css'],
            js: ['<%= yeoman.dist %>/<%= yeoman.client %>/scripts/*.js'],
            options: {
                assetsDirs: [
                    '<%= yeoman.dist %>/<%= yeoman.client %>',
                    '<%= yeoman.dist %>/<%= yeoman.client %>/assets/images'
                ],
                // This is so we update image references in our ng-templates
                patterns: {
                    js: [
                        [/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
                    ]
                }
            }
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.client %>/assets/images',
                    src: '{,*/}*.{png,jpg,jpeg,gif,svg}',
                    dest: '<%= yeoman.dist %>/<%= yeoman.client %>/assets/images'
                }]
            }
        },

        // Allow the use of non-minsafe AngularJS files. Automatically makes it
        // minsafe compatible so Uglify does not destroy the ng references
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat',
                    src: '**/*.js',
                    dest: '.tmp/concat'
                }]
            }
        },

        // Package all the html partials into a single javascript payload
        ngtemplates: {
            options: {
                // This should be the name of your apps angular module
                module: 'ameSeedApp',
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                },
                usemin: 'scripts/app.js',
                url: function(url) {
                    return '/' + url.replace('.html', '');
                }
            },
            main: {
                cwd: '<%= yeoman.client %>/views',
                src: ['partials/{,*/}**.html'],
                dest: '.tmp/templates.js'
            }
        },

        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/<%= yeoman.client %>/*.html']
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.client %>',
                    dest: '<%= yeoman.dist %>/<%= yeoman.client %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'bower_components/**/*',
                        'assets/images/{,*/}*.{webp}',
                        'fonts/**/*',
                        'views/index.html'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= yeoman.dist %>/<%= yeoman.client %>/assets/images',
                    src: ['generated/*']
                }, {
                    expand: true,
                    dest: '<%= yeoman.dist %>',
                    src: [
                        'package.json',
                        'server.js',
                        '<%= yeoman.server %>/**/*'
                    ]
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.client %>',
                dest: '.tmp/',
                src: ['{styles,components,bower_components}/**/*.css']
            }
        },

        buildcontrol: {
            options: {
                dir: '<%= yeoman.dist %>',
                commit: true,
                push: true,
                connectCommits: false,
                message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
            },
            heroku: {
                options: {
                    remote: 'heroku',
                    branch: 'master'
                }
            },
            openshift: {
                options: {
                    remote: 'openshift',
                    branch: 'master'
                }
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            pre: [
                'injector:sass'
            ],
            server: [
                'newer:babel:client',
                'sass',
            ],
            test: [
                'newer:babel:client',
                'sass',
            ],
            debug: {
                tasks: [
                    'nodemon',
                    'node-inspector'
                ],
                options: {
                    logConcurrentOutput: true
                }
            },
            dist: [
                'newer:babel:client',
                'sass',
                'imagemin'
            ]
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },

        mochaTest: {
            options: {
                reporter: 'spec',
                require: 'mocha.conf.js',
                timeout: 5000 // set default mocha spec timeout
            },
            unit: {
                src: ['<%= yeoman.server %>/**/*.spec.js']
            },
            integration: {
                src: ['<%= yeoman.server %>/**/*.integration.js']
            }
        },

        mocha_istanbul: {
            unit: {
                options: {
                    excludes: ['**/*.{spec,mock,integration}.js'],
                    reporter: 'spec',
                    require: ['mocha.conf.js'],
                    mask: '**/*.spec.js',
                    coverageFolder: 'coverage/server/unit'
                },
                src: '<%= yeoman.server %>'
            },
            integration: {
                options: {
                    excludes: ['**/*.{spec,mock,integration}.js'],
                    reporter: 'spec',
                    require: ['mocha.conf.js'],
                    mask: '**/*.integration.js',
                    coverageFolder: 'coverage/server/integration'
                },
                src: '<%= yeoman.server %>'
            }
        },

        istanbul_check_coverage: {
            default: {
                options: {
                    coverageFolder: 'coverage/**',
                    check: {
                        lines: 80,
                        statements: 80,
                        branches: 80,
                        functions: 80
                    }
                }
            }
        },

        protractor: {
            options: {
                configFile: 'protractor.conf.js'
            },
            chrome: {
                options: {
                    args: {
                        browser: 'chrome'
                    }
                }
            }
        },

        env: {
            test: {
                NODE_ENV: 'test'
            },
            prod: {
                NODE_ENV: 'production'
            },
            all: localConfig
        },

        // Compiles ES6 to JavaScript using Babel
        babel: {
            options: {
                sourceMap: true,
                optional: [
                    'es7.classProperties'
                ]
            },
            client: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.client %>',
                    src: ['{scripts,components}/**/!(*.spec).js'],
                    dest: '.tmp'
                }]
            },
            server: {
                options: {
                    optional: ['runtime']
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.server %>',
                    src: ['**/*.{js,json}'],
                    dest: '<%= yeoman.dist %>/<%= yeoman.server %>'
                }]
            }
        },

        // Compiles Sass to CSS
        sass: {
            server: {
                options: {
                    compass: false
                },
                files: {
                    '.tmp/styles/main.css': '<%= yeoman.client %>/styles/sass/main.scss',
                    '<%= yeoman.client %>/styles/main.css': '<%= yeoman.client %>/styles/sass/main.scss'
                }
            }
        },

        injector: {
            options: {

            },
            // Inject application script files into index.html (doesn't include bower)
            scripts: {
                options: {
                    transform: function(filePath) {
                        var yoClient = grunt.config.get('yeoman.client');
                        filePath = filePath.replace('/' + yoClient + '/', '');
                        filePath = filePath.replace('/.tmp/', '');
                        return '<script src="' + filePath + '"></script>';
                    },
                    sort: function(a, b) {
                        var module = /\.module\.js$/;
                        var aMod = module.test(a);
                        var bMod = module.test(b);
                        // inject *.module.js first
                        return (aMod === bMod) ? 0 : (aMod ? -1 : 1);
                    },
                    starttag: '<!-- injector:js -->',
                    endtag: '<!-- endinjector -->'
                },
                files: {
                    '<%= yeoman.client %>/views/index.html': [
                        [
                            '.tmp/{scripts,components}/**/!(*.spec|*.mock).js',
                            '!{.tmp,<%= yeoman.client %>}/scripts/app.js'
                        ]
                    ]
                }
            },

            // Inject component scss into main.scss
            sass: {
                options: {
                    transform: function(filePath) {
                        var yoClient = grunt.config.get('yeoman.client');
                        filePath = filePath.replace('/' + yoClient + '/styles/sass/', '');
                        filePath = filePath.replace('/' + yoClient + '/bower_components/', '../../bower_components/');
                        return '@import \'' + filePath + '\';';
                    },
                    sort: function(a, b) {
                        var name = /variables\.scss$/;
                        var aMod = name.test(a);
                        var bMod = name.test(b);
                        // inject variables.scss first
                        return (aMod === bMod) ? 0 : (aMod ? -1 : 1);
                    },
                    starttag: '// injector',
                    endtag: '// endinjector'
                },
                files: {
                    '<%= yeoman.client %>/styles/sass/main.scss': [
                        '<%= yeoman.client %>/{styles,bower_components}/**/*.{scss,sass}',
                        '!<%= yeoman.client %>/{styles,bower_components}/**/_*.{scss,sass}',
                        '!<%= yeoman.client %>/styles/sass/main.{scss,sass}'
                    ]
                }
            },

            // Inject component css into index.html
            css: {
                options: {
                    transform: function(filePath) {
                        var yoClient = grunt.config.get('yeoman.client');
                        filePath = filePath.replace('/' + yoClient + '/', '');
                        filePath = filePath.replace('/.tmp/', '');
                        return '<link rel="stylesheet" href="' + filePath + '">';
                    },
                    starttag: '<!-- injector:css -->',
                    endtag: '<!-- endinjector -->'
                },
                files: {
                    '<%= yeoman.client %>/views/index.html': [
                        '<%= yeoman.client %>/{styles,bower_components}/**/*.css'
                    ]
                }
            }
        },
    });

    // Used for delaying livereload until after server has restarted
    grunt.registerTask('wait', function() {
        grunt.log.ok('Waiting for server reload...');

        var done = this.async();

        setTimeout(function() {
            grunt.log.writeln('Done waiting!');
            done();
        }, 1500);
    });

    grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
        this.async();
    });

    grunt.registerTask('serve', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'env:all', 'env:prod', 'express:prod', 'wait', 'open', 'express-keepalive']);
        }

        if (target === 'debug') {
            return grunt.task.run([
                'clean:server',
                'env:all',
                'concurrent:pre',
                'concurrent:server',
                'injector',
                'wiredep:client',
                'postcss',
                'concurrent:debug'
            ]);
        }

        grunt.task.run([
            'clean:server',
            'env:all',
            'concurrent:pre',
            'concurrent:server',
            'injector',
            'wiredep:client',
            'postcss',
            'shell:dev',
            'wait',
            'watch'
        ]);
    });

    grunt.registerTask('server', function() {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });

    grunt.registerTask('test', function(target, option) {
        if (target === 'server') {
            return grunt.task.run([
                'env:all',
                'env:test',
                'mochaTest:unit',
                'mochaTest:integration'
            ]);
        } else if (target === 'client') {
            return grunt.task.run([
                'clean:server',
                'env:all',
                'concurrent:pre',
                'concurrent:test',
                'injector',
                'postcss',
                'wiredep:test',
                'karma'
            ]);
        } else if (target === 'e2e') {

            if (option === 'prod') {
                return grunt.task.run([
                    'build',
                    'env:all',
                    'env:prod',
                    'express:prod',
                    'protractor'
                ]);
            } else {
                return grunt.task.run([
                    'clean:server',
                    'env:all',
                    'env:test',
                    'concurrent:pre',
                    'concurrent:test',
                    'injector',
                    'wiredep:client',
                    'postcss',
                    'shell:dev',
                    'protractor'
                ]);
            }
        } else if (target === 'coverage') {

            if (option === 'unit') {
                return grunt.task.run([
                    'env:all',
                    'env:test',
                    'mocha_istanbul:unit'
                ]);
            } else if (option === 'integration') {
                return grunt.task.run([
                    'env:all',
                    'env:test',
                    'mocha_istanbul:integration'
                ]);
            } else if (option === 'check') {
                return grunt.task.run([
                    'istanbul_check_coverage'
                ]);
            } else {
                return grunt.task.run([
                    'env:all',
                    'env:test',
                    'mocha_istanbul',
                    'istanbul_check_coverage'
                ]);
            }

        } else {
            return grunt.task.run([
                'test:server',
                'test:client'
            ]);
        }
    });

    grunt.registerTask('build', [
        'clean:dist',
        'concurrent:pre',
        'concurrent:dist',
        'injector',
        'wiredep:client',
        'useminPrepare',
        'postcss',
        'ngtemplates',
        'concat',
        'ngAnnotate',
        'copy:dist',
        'babel:server',
        'cdnify',
        'cssmin',
        'uglify',
        'filerev',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);
};
