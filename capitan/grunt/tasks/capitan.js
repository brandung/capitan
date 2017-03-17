/**
 * Capitan tasks
 *
 * @param grunt
 */
module.exports = function(grunt) {

	var Helpers = require('../helpers.js'),
		Msg = require('../msg.js'),
		fs = require('fs'),
		path = require('path');

	/**
	 * Show Capitan Banner
	 *
	 * @param a
	 * @param b
	 */
	grunt.registerTask('cap-msg', 'CAPITAN worker', function(a, b) {
		/**
		 * Task for intro banner
		 */
		if (a === 'intro') {
			Msg.intro();
		}
	});


	/**
	 * Creating index.html from handlebar views
	 */
	grunt.registerTask ('cap-buildIndex', 'Update index.html', function () {

		var viewFolder =  grunt.config('Config.PRIVATE_DIR') + '/templates/views',
			templates = Helpers.getFilesByFilter(viewFolder, '.hbs'),
			indexHbsFile = grunt.file.read(viewFolder + '/index.hbs'),
			viewsRegex = /{{!--\s?<@views*(\S*)(\n|\r|.)*?{{!--\s?views@>\s--}}/igm,
			html = '';

		// break if only index.hbs and styleguide.hbs exist
		if (templates.length <= 2) {
			console.log('No views available');
			return;
		}

		html += '{{!-- <@views --}}\n' +
			'\t\t\t<h2>Templates</h2>\n' +
			'\t\t\t<ul>\n';

		for (var key in templates) {
			if (templates.hasOwnProperty(key)) {

				var templateName = Helpers.getFilename(templates[key]);
				// exclude 'index' and 'styleguide'
				if (templateName !== 'index' && templateName !== 'styleguide' ) {
					html += '\t\t\t\t<li><a href="' + templateName + '.html">' + templateName + '.html</a></li>\n';
				}
			}
		}

		html += '\t\t\t</ul>\n' +
			'\t\t\t{{!-- views@> --}}';

		indexHbsFile = indexHbsFile.replace(indexHbsFile.match(viewsRegex), html);

		grunt.file.write(viewFolder + '/index.hbs', indexHbsFile);

		console.log('Update index.html');
	});
};
