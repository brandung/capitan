/**
 * msg.js
 */

var grunt = require('grunt'),
	Msg = {};


Msg.warnConfig = function () {
	grunt.log.writeln('\n**************************************'['red']);
	grunt.log.writeln('***              ERROR             ***'['red']);
	grunt.log.writeln('**************************************'['red']);
	grunt.log.error(['Project has been not initialized!'['red']]);
	grunt.log.error(['Please run the init task and choose'['red']]);
	grunt.log.error(['your system: `grunt project:init`'['red']]);
	grunt.log.writeln('**************************************\n'['red']);
	grunt.fail.warn('No \'system\' defined!');
};

module.exports = Msg;