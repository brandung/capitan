module.exports = function(grunt) {
	grunt.registerTask('capitan', 'CAPITAN worker', function(a, b) {

		var Helpers = require('../helpers.js'),
			Msg = require('../msg.js'),
			configFile = './grunt/config.js';


		/**
		 * Task for intro banner
		 */
		if (a === 'intro') {
			Msg.intro();
		}
	});
};
