module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    project: {
      app: ['app'],
      public: ['public'],
      src: {
        bower: ['<%= project.app %>/bower_components'],
        assets: ['<%= project.app %>/assets'],
        css: ['<%= project.src.assets %>/stylesheets'],
        js: ['<%= project.src.assets %>/javascripts'],
        views: ['<%= project.app %>/views'],
        images: ['<%= project.src.assets %>/images'],
        files: ['<%= project.src.assets %>/files']
      },
      build: {
        assets: ['<%= project.public %>/assets'],
        css: ['<%= project.build.assets %>'],
        js: ['<%= project.build.assets %>'],
        views: ['<%= project.public %>'],
        images: ['<%= project.build.assets %>'],
        fonts: ['<%= project.build.assets[0] %>/fonts'],
        files: ['<%= project.build.assets[0] %>/files']
      }
    },
    connect: {
      server: {
        options: {
          base: './<%= project.public[0] %>',
          port: '4000',
          host: '*'
        }
      }
    },
    clean: {
      build: {
        src: ['<%= project.public %>']
      }
    },
    coffee: {
      compile: {
        options: {
          bare: true
        },
        files: [{
          expand: true,
          cwd: '<%= project.src.js[0] %>',
          src: ['**/*.coffee', '**/*.js'],
          dest: '<%= project.build.js[0] %>',
          ext: '.js'
        }]
      }
    },
    compass: {
      dist: {
        options: {
          bundleExec: true,
          sassDir: '<%= project.src.css %>',
          cssDir: '<%= project.build.css %>',
          environment: 'production'
        }
      }
    },
    jade: {
      compile: {
        options: {
          data: {
            debug: false
          }
        },
        files: [{
          expand: true,
          cwd: '<%= project.src.views[0] %>',
          src: ['**/*.jade'],
          dest: '<%= project.build.views[0] %>',
          ext: '.html'
        }]
      }
    },
    copy: {
      images: {
        expand: true,
        cwd: '<%= project.src.images[0] %>',
        src: '**',
        dest: '<%= project.build.images[0] %>/',
      },
      fontawesome: {
        expand: true,
        cwd: '<%= project.src.bower[0] %>/font-awesome/fonts/',
        src: '**',
        dest: '<%= project.build.fonts[0] %>/',
      },
      files: {
        expand: true,
        cwd: '<%= project.src.files[0] %>',
        src: '**',
        dest: '<%= project.build.files[0] %>/',
      }
    },
    watch: {
      coffee: {
        files: ['<%= project.src.js %>/**/*.coffee'],
        tasks: ['coffee'],
        options: {
          livereload: true,
        }
      },
      styles: {
        files: ['<%= project.src.css %>/**/*.sass'],
        tasks: ['compass'],
        options: {
          livereload: true,
        }
      },
      jade: {
        files: ['<%= project.src.views %>/**/*.jade'],
        tasks: ['jade'],
        options: {
          livereload: true,
        }
      },
      images: {
        files: ['<%= project.src.images %>/**/*'],
        tasks: ['copy:images'],
        options: {
          livereload: true,
        }
      },
      files: {
        files: ['<%= project.src.files %>/**/*'],
        tasks: ['copy:files'],
        options: {
          livereload: true,
        }
      },
      configFiles: {
        files: [ 'Gruntfile.js', 'config/*.js' ],
        tasks: ['build'],
        options: {
          reload: true
        }
      }
    },
    'gh-pages': {
      options: {
        base: '<%= project.public[0] %>'
      },
      src: ['**']
    },
    'sftp-deploy': {
      build: {
        auth: {
          host: 'athena.csh.rit.edu',
          port: 22,
          authKey: 'pdp'
        },
        // cache: 'sftpCache.json',
        src: './public/',
        dest: '/home/daspdp/project/pdp-backend/daspdpsite/static/',
        exclusions: ['/path/to/source/folder/**/.DS_Store', '/path/to/source/folder/**/Thumbs.db', 'dist/tmp'],
        serverSep: '/',
        concurrency: 4,
        progress: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-sftp-deploy');

  grunt.registerTask('build', ['clean', 'jade', 'compass', 'coffee', 'copy']);
  grunt.registerTask('deploy', ['build', 'sftp-deploy']);
  grunt.registerTask('default', ['build', 'connect', 'watch']);
};
