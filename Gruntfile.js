// Generated on 2015-02-18 using
// generator-webapp 0.5.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Configurable paths
  var config = {
    app: 'app',
    dist: 'dist'
  };

  var rewrite = require('connect-modrewrite');

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= config.app %>/scripts/**/*.js'],
        tasks: ['jshint', 'injector'],
        options: {
          livereload: true
        }
      },
      jstest: {
        files: ['test/spec/**/*.js'],
        tasks: ['test:watch']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      sass: {
        files: ['<%= config.app %>/styles/**/*.{scss,sass}'],
        tasks: ['sass:server', 'autoprefixer']
      },
      styles: {
        files: ['<%= config.app %>/styles/**/*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      images: {
        files: ['<%= config.app %>/images/**/*.*'],
        tasks: ['sprite:icons2x', 'sprite:icons', 'newer:copy:styles', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.app %>/**/*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= config.app %>/images/**/*.*'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          middleware: function (connect, options) {
            var middleware = [];

            // 1. mod-rewrite behavior
            var rules = [
              '!\\.html|\\.js|\\.css|\\.svg|\\.jp(e?)g|\\.png|\\.gif|\\.ttf|\\.eot|\\.woff|\\.otf$ /index.html'
            ];
            middleware.push(rewrite(rules));

            // 2. original middleware behavior
            var base = options.base;
            if (!Array.isArray(base)) {
              base = [base];
            }

            middleware.push(connect.static('.tmp'));
            middleware.push(connect().use('/bower_components', connect.static('./bower_components')));
            middleware.push(connect.static(config.app));

            return middleware;
          }
        }
      },
      test: {
        options: {
          open: false,
          port: 9001,
          middleware: function (connect, options) {
            var middleware = [];

            // 1. mod-rewrite behavior
            var rules = [
              '!\\.html|\\.js|\\.css|\\.svg|\\.jp(e?)g|\\.png|\\.gif|\\.ttf|\\.eot|\\.woff|\\.otf$ /index.html'
            ];
            middleware.push(rewrite(rules));

            // 2. original middleware behavior
            var base = options.base;
            if (!Array.isArray(base)) {
              base = [base];
            }

            middleware.push(connect.static('.tmp'));
            middleware.push(connect.static('test'));
            middleware.push(connect().use('/bower_components', connect.static('./bower_components')));
            middleware.push(connect.static(config.app));

            return middleware;
          }
        }
      },
      dist: {
        options: {
          base: '<%= config.dist %>',
          livereload: false
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
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= config.app %>/scripts/{,*/}*.js',
        '!<%= config.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },

    // Mocha testing framework configuration options
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
        }
      }
    },

    // Generates sprites using icons and icons2x folders
    sprite: {
      icons2x: {
        src: ['<%= config.app %>/images/icons/*-2x.png'],
        dest: '.tmp/images/icons@2x.png',
        destCss: '.tmp/styles/_sprite-generated.scss',
        padding: 20,
        algorithm: 'top-down',
        algorithmOpts: {sort: false}
      },
      icons: {
        src: ['<%= config.app %>/images/icons/*.png', '!<%= sprite.icons2x.src %>'],
        // dest should be same as in sprite:icons2x task, but without -2x
        dest: '.tmp/images/icons.png',
        // padding should be twice smaller, than padding in sprite:icons2x task
        padding: 10,
        // path to template
        cssTemplate: '<%= config.app %>/styles/sprite.mustache',
        destCss: '<%= sprite.icons2x.destCss %>',
        algorithm: 'top-down',
        algorithmOpts: {sort: false}
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    sass: {
      options: {
        loadPath: ['bower_components', '.tmp']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      },
      server: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the HTML file
    wiredep: {
      app: {
        ignorePath: /^\/|\.\.\//,
        src: ['<%= config.app %>/index.html'],
        exclude: ['bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js']
      },
      sass: {
        src: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= config.dist %>/scripts/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '<%= config.dist %>/images/{,*/}*.*',
            //'<%= config.dist %>/styles/fonts/{,*/}*.*',
            '<%= config.dist %>/*.{ico,png}'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%= config.dist %>'
      },
      html: '<%= config.app %>/index.html'
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: [
          '<%= config.dist %>',
          '<%= config.dist %>/images',
          '<%= config.dist %>/styles'
        ]
      },
      html: ['<%= config.dist %>/{,*/}*.html'],
      css: ['<%= config.dist %>/styles/{,*/}*.css']
    },

    // The following *-min tasks produce minified files in the dist folder
    //imagemin: {
    //  dist: {
    //    files: [{
    //      expand: true,
    //      cwd: '<%= config.app %>/images',
    //      src: '{,*/}*.{gif,jpeg,jpg,png}',
    //      dest: '<%= config.dist %>/images'
    //    }]
    //  }
    //},
    //
    //svgmin: {
    //  dist: {
    //    files: [{
    //      expand: true,
    //      cwd: '<%= config.app %>/images',
    //      src: '{,*/}*.svg',
    //      dest: '<%= config.dist %>/images'
    //    }]
    //  }
    //},

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: '{,*/}*.html',
          dest: '<%= config.dist %>'
        }]
      }
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care
    // of minification. These next options are pre-configured if you do not
    // wish to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%= config.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/scripts/scripts.js': [
    //         '<%= config.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            'images/{,*/}*.webp',
            '{,*/}*.html',
            'styles/fonts/{,*/}*.*',
            'views/**/*.html'
          ]
        }, {
          src: 'node_modules/apache-server-configs/dist/.htaccess',
          dest: '<%= config.dist %>/.htaccess'
        }, {
          expand: true,
          dot: true,
          cwd: '.',
          src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
          dest: '<%= config.dist %>'
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },
      sprites: {
        expand: true,
        dot: true,
        cwd: '.tmp',
        dest: '<%= config.dist %>',
        src: 'images/**/*.*'
      }
    },

    ngAnnotate: {
      options: {
        singleQuotes: true
      },
      dist: {
        files: [
          {
            expand: true,
            src: [
              '.tmp/concat/scripts/main.js',
              '.tmp/concat/scripts/stubs.js'
            ]
          }
        ]
      }
    },

    injector: {
      options: {
        addRootSlash: false,
        relative: true,
        destFile: '<%= config.app %>/index.html'
      },
      app: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>',
          src: ['scripts/**/*.js', '!scripts/**/*.stub.js', '!scripts/app.js']
        }]
      },
      stubs: {
        options: {
          starttag: '<!-- injector:stubs -->',
          endtag: '<!-- endinjector -->'
        },
        files: [{
          expand: true,
          cwd: '<%= config.app %>',
          src: ['scripts/**/*.stub.js']
        }]
      }
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [
        'sass:server',
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'sass',
        'copy:styles',
        'copy:sprites'
        //'imagemin',
        //'svgmin'
      ]
    }
  });


  grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function (target) {
    if (grunt.option('allow-remote')) {
      grunt.config.set('connect.options.hostname', '0.0.0.0');
    }
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'injector',
      'sprite:icons2x',
      'sprite:icons',
      'wiredep',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('test', function (target) {
    if (target !== 'watch') {
      grunt.task.run([
        'clean:server',
        'concurrent:test',
        'autoprefixer'
      ]);
    }

    grunt.task.run([
      'connect:test',
      'mocha'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'injector',
    'sprite:icons2x',
    'sprite:icons',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'cssmin',
    'ngAnnotate:dist',
    'uglify',
    'copy:dist',
    'rev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
