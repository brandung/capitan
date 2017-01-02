/**
 * Do the bower packaging stuff.
 *
 * https://www.npmjs.org/package/grunt-bower-task
 */
var grunt = require('grunt'),
	path = require('path');

module.exports = {
	install: {
		options: {
			targetDir: './',
			layout: 'byType',
			cleanTargetDir: false,
			cleanBowerDir: true,
			verbose: true
		}
	},
	fetchHtmlBoilerplate: {
		options: {
			targetDir: './',
			layout: function (type, component, src) {
				return path.join(grunt.config('Config.PRIVATE_DIR'));
			},
			cleanTargetDir: false,
			cleanBowerDir: true,
			verbose: true
		}
	}
};