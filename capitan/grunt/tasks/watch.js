/**
 * The awesome watch task which recognizes changes in the specified filetypes
 * and rebuilds the project after hitting strg + s
 *
 * https://npmjs.org/package/grunt-contrib-watch
 */

module.exports = {
	styles: {
		files: [
			'<%= Config.PRIVATE_DIR %>/sass/**/*.scss',
			'<%= Config.PRIVATE_DIR %>/components/**/*.scss'
		],
		tasks: [
			'sass',
			'postcss:CSS',
			'sassToHtml'
		]
	},
	scripts: {
		files: [
			'<%= Config.PRIVATE_DIR %>/js/**/*.js',
			'<%= Config.PRIVATE_DIR %>/components/**/*.js'
		],
		tasks: [
			'copy:privateHandlerToPublicFolder',
			'copy:privateUtilToPublicFolder',
			'copy:privateFunctionToPublicFolder',
			'copy:privateComponentToPublicFolder',
			'copy:publicComponentVendorToPublicJSFolder',
			'concat:mainJS',
			'clean:globalJsInPublicFolder'
		]
	},
	tpl: {
		files:  [
			'<%= Config.PRIVATE_DIR %>/templates/**/*.hbs',
			'<%= Config.PRIVATE_DIR %>/components/**/*.hbs'
		],
		tasks: [
			'cap-buildIndex',
			'compile-handlebars'
		]
	},
	html: {
		files:  [
			'<%= Config.PRIVATE_DIR %>/components/**/*.html'
		],
		tasks: [
			'copy:privateComponentToPublicFolder'
		]
	}
};
