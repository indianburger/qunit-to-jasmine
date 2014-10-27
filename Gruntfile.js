module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      files: ['es6/*.js'],
      tasks: ['traceur']
    },
    traceur: {
      options: {
        script: true,
        experimental: true
      // traceur options here
      },
      custom: {
        files: [{
          expand: true,
          cwd: 'es6',
          src: ['*.js'],
          dest: 'es5'
        }]
      },
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-traceur');
};