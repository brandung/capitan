/**
 * Minify all js files (has no effect on vendor js files under js/vendor)
 *
 * https://npmjs.org/package/grunt-contrib-uglify
 */

var date = new Date();

module.exports = {
	options: {
		report: 'min',
		preserveComments: false,
		screwIE8: true,
		compress: {
			drop_console: true
		},
		banner: "/**\n" +
		" * Copyright brandung GmbH & Co.KG\n" +
		" * http://www.brandung.de/\n" +
		" *\n" +
		" * Date: " + date.toISOString().substring(0, 10) + "\n" +
		" * MIT License (MIT)\n" +
		" */\n"
	},
	component: {
		expand: true,
		cwd: '<%= Config.PUBLIC_DIR %>/component/',
		src: ['**/*.js'],
		dest: '<%= Config.PUBLIC_DIR %>/component/'
	},
	global: {
		expand: true,
		cwd: '<%= Config.PUBLIC_DIR %>/js/',
		src: ['**/*.js', '!bundle/*.js', '!**/main.js', '!libs/**/*.js'],
		dest: '<%= Config.PUBLIC_DIR %>/js/'
	},
	bra: {
		expand: true,
		cwd: '<%= Config.PUBLIC_DIR %>/js/libs/bra',
		src: ['**/*.js'],
		dest: '<%= Config.PUBLIC_DIR %>/js/libs/bra'
	},
	mainJS: {
		expand: true,
		cwd: '<%= Config.PUBLIC_DIR %>/js/',
		src: ['main.js'],
		dest: '<%= Config.PUBLIC_DIR %>/js/'
	}
};
