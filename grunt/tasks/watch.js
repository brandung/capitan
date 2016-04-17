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
			'<%= Config.PRIVATE_DIR %>/component/**/*.scss'
		],
		tasks: [
			'sass',
			'postcss',
			'sassToHtml'
		]
	},
	scripts: {
		files: [
			'<%= Config.PRIVATE_DIR %>/js/**/*.js',
			'<%= Config.PRIVATE_DIR %>/component/**/*.js'
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
			'<%= Config.PRIVATE_DIR %>/templates/tpl/**/*.tpl',
			'<%= Config.PRIVATE_DIR %>/component/**/*.tpl'
		],
		tasks: [
			'tasty_swig'
		]
	}
};
