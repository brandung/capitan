/**
 * Minifies all stylesheets
 *
 * https://github.com/gruntjs/grunt-contrib-cssmin
 */

module.exports = {
	minify: {
		expand: true,
		cwd: '<%= Config.PUBLIC_ASSETS %>/css/',
		src: [
			'**/*.css'
		],
		dest: '<%= Config.PUBLIC_ASSETS %>/css/',
		ext: '.css',
		options: {
			report: 'min'
		}
	},
	component: {
		expand: true,
		cwd: '<%= Config.PUBLIC_APP %>/components/',
		src: [
			'**/*.css'
		],
		dest: '<%= Config.PUBLIC_APP %>/components/',
		ext: '.css',
		options: {
			report: 'min'
		}
	}
};