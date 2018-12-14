module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			sass: {
				files: ['src/sass/*.scss'],
				tasks: ['sass', 'cssmin', 'concat'],
			}
		},
		concat: {
			options: {
				banner: '/* Author: <%= pkg.author.name %> */\n' + '/* Created with love in <%= pkg.author.url %> */\n\n',
				footer: '\n/* Updated on: <%= grunt.template.today("dS mmm, h:MM:ss TT") %> */',
			},
			dist: {
				src: ['src/css/style.min.css'],
				dest: 'src/css/main.css'
			}
		},
		cssmin: {
			target: {
				files:{
					'src/css/style.min.css' : 'src/css/style.css'
				}
			}
		},
		sass: {
			compile: {
				files: {
					'src/css/style.css' : 'src/sass/style.scss'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['sass', 'cssmin', 'concat', 'watch']);
}