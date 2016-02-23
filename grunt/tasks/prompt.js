/**
 * Interactive prompt for your Grunt config using console.
 *
 * https://www.npmjs.com/package/grunt-prompt
 */

var Helpers = require('../helpers'),
	files = Helpers.getFiles('./grunt/systems'),
	filenames = [];

// get all files and return only the name without suffix
for (var key in files) {
	if (files.hasOwnProperty(key)) {
		filenames.push(Helpers.getFilename(files[key]));
	}
}


module.exports = {
	init: {
		options: {
			questions: [
				{
					config: 'initSystem',
					type: 'list',
					message: 'Which system you want to initialize?',
					choices: filenames
				}
			]
		}
	}
};