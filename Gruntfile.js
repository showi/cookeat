/*global module:false*/
module.exports =
    function(grunt) {

      // Project configuration.
      grunt
          .initConfig({
              // Metadata.
              pkg : grunt.file.readJSON('package.json'),
              // banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %>
              // - ' +
              // '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
              // '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
              // '* Copyright (c) <%= grunt.template.today("yyyy") %> <%=
              // pkg.author.name %>;' +
              // ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>
              // */\n',
              // Task configuration.
              clean : {
                dist : [
                  'couch/cookeat/vendor/cookeat/_attachments/'
                ],
              },
              concat : {
                  options : {
                      banner : '<%= banner %>',
                      stripBanners : true,
                  },
                  dist : {
                      src : [
                          'app/component/**.js', 'app/module/angular.min.js',
                          'app/module/**.js', 'app/<%= pkg.name %>.js',
                      ],
                      dest : 'couch/cookeat/vendor/cookeat/_attachments/<%= pkg.name %>.min.js'
                  }
              },
              uglify : {
                  options : {
                    banner : '<%= banner %>'
                  },
                  dist : {
                      src : '<%= concat.dist.dest %>',
                      dest : 'couch/cookeat/vendor/cookeat/_attachments/<%= pkg.name %>.min.js'
                  }
              },
              copy : {
                  bower : {
                      src : [
                          'build/bower_components/**/*.min.js',
                          'build/bower_components/**/*.map',
                          'build/bower_components/**/*.min.css',
                          'build/bower_components/angular-xeditable/dist/css/xeditable.css'
                      ],
                      dest : 'app/component/',
                      flatten : true,
                      expand : true,
                  },
                  couch : {
                      cwd : 'app',
                      src : [
                          '**/*.html', '**/*.js', '**/*.css'
                      ],
                      dest : 'couch/cookeat/vendor/cookeat/_attachments/',
                      expand : true,
                  },
              },
              // jshint: {
              // options: {
              // curly: true,
              // eqeqeq: true,
              // immed: true,
              // latedef: true,
              // newcap: true,
              // noarg: true,
              // sub: true,
              // undef: true,
              // unused: true,
              // boss: true,
              // eqnull: true,
              // globals: {
              // jQuery: true
              // }
              // },
              // gruntfile: {
              // src: 'Gruntfile.js'
              // },
              // lib_test: {
              // src: ['lib/**/*.js', 'test/**/*.js']
              // }
              // },
              // nodeunit: {
              // files: ['test/**/*_test.js']
              // },
              watch : {
                lib_test : {
                    files : 'app/**/*',
                    tasks : [
                      'default'
                    ]
                }
              },
              shell : {
                  options : {
                    stderr : true
                  },
                  cookeat : {
                    command : 'couchapp push couch/cookeat http://sho:admin@localhost:5984/cookeat',
                  },
                  recipe : {
                    command : 'couchapp push --docid _design/recipe couch/recipe http://sho:admin@localhost:5984/cookeat',
                  },
                  ingredient : {
                    command : 'couchapp push --docid _design/ingredient couch/ingredient http://sho:admin@localhost:5984/cookeat',
                  },
                  tag : {
                    command : 'couchapp push --docid _design/tag couch/tag http://sho:admin@localhost:5984/cookeat',
                  }
              },
          });

      // These plugins provide necessary tasks.
      grunt.loadNpmTasks('grunt-contrib-concat');
      grunt.loadNpmTasks('grunt-contrib-copy');
      grunt.loadNpmTasks('grunt-contrib-clean');
      // grunt.loadNpmTasks('grunt-contrib-uglify');
      // grunt.loadNpmTasks('grunt-contrib-nodeunit');
      // grunt.loadNpmTasks('grunt-contrib-jshint');
      grunt.loadNpmTasks('grunt-contrib-watch');
      grunt.loadNpmTasks('grunt-shell');

      // Default task.
      grunt.registerTask('default', [
          'copy:bower', 'copy:couch', 'shell:cookeat', 'shell:recipe',
          'shell:ingredient', 'shell:tag',
      ]);

    };
