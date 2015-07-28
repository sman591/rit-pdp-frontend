module.exports = function(grunt){
  grunt.initConfig({
    connect: {
      server: {
        options: {
          base: './public',
          port: '4000',
          host: '*'
        }
      }
    },
    clean: {
      build: {
        src: ['public/javascripts', 'public/stylesheets']
      }
    },
    coffee: {
      compile: {
        options: {
          bare: true
        },
        files: [{
          expand: true,
          cwd: 'app/coffeescript',
          src: ['**/*.coffee', '**/*.js'],
          dest: 'public/javascripts',
          ext: '.js'
        }]
      }
    },
    compass: {
      dist: {
        options: {
          bundleExec: true,
          sassDir: 'app/stylesheets',
          cssDir: 'public/stylesheets',
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
          cwd: 'app/views',
          src: ['**/*.jade'],
          dest: 'public',
          ext: '.html'
        }]
      }
    },
    watch: {
      coffee: {
        files: ['app/coffeescript/**/*.coffee'],
        tasks: ['coffee'],
        options: {
          livereload: true,
        }
      },
      styles: {
        files: ['app/stylesheets/**/*.sass'],
        tasks: ['compass'],
        options: {
          livereload: true,
        }
      },
      jade: {
        files: ['app/views/**/*.jade'],
        tasks: ['jade'],
        options: {
          livereload: true,
        }
      }
    },
    'gh-pages': {
      options: {
        base: 'public'
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
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-sftp-deploy');

  grunt.registerTask('build', ['clean', 'coffee', 'compass']);
  grunt.registerTask('deploy', ['build', 'sftp-deploy']);
  grunt.registerTask('default', ['build', 'connect', 'watch']);
};
