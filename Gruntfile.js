module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      main: {
        options: {
          port: 9001,
          base: 'tmp/public'
        }
      }
    },

    watch: {
      files: ['src/**'],
      tasks: ['ember_handlebars', 'copy']
    },

    copy: {
      main: {
        files: [
          { expand: true, cwd: 'src', src: ['**'], dest: 'tmp/public/'}
        ]
      }
    },

    ember_handlebars: {
      compile: {
        options: {
          namespace: "Ember.TEMPLATES",
          processName: function(filename) {
            return filename.replace(/^src\/[^\/]+\/templates\//,'').replace(/\.handlebars$/,'');
          },
        },
        files: {
          "tmp/public/app/templates/all.js":          "src/app/templates/*.handlebars",
          "tmp/public/test_runner/templates/all.js":  "src/test_runner/templates/*.handlebars",
          "tmp/public/qunit_viewer/templates/all.js": "src/qunit_viewer/templates/*.handlebars",
        }
      }
    }
  })

  grunt.loadNpmTasks('grunt-ember-handlebars');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['ember_handlebars', 'copy', 'connect:main', 'watch']);
};
