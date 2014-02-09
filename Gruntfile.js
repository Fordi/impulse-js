module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/* <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				compress: {
					drop_console: true,
					dead_code: true
				}
			},
			build: {
				files: {
					'dest/<%= pkg.name %>.js' : [
						'src/main/javascript/iMpulse.js',
						'src/main/javascript/iMpulse/sequences.js',
						'src/main/javascript/iMpulse/PadEvent.js',
						'src/main/javascript/iMpulse/Signal.js',
						'src/main/javascript/iMpulse/Stream.js',
						'src/main/javascript/main.js'
					]
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['uglify']);
};