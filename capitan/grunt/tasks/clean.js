/**
 * Removes build folder after zipping it
 *
 * https://github.com/gruntjs/grunt-contrib-clean
 */
module.exports = {
	init: {
		options: {
			'force': true
		},
		src: [
			'<%= Config.PRIVATE_DIR %>/fonts/',
			'<%= Config.PUBLIC_DIR %>/capitan.png',
			'./tmp/',
			'../README.md',
			'../LICENSE'
		]
	},
	globalJsInPublicFolder: [
		'<%= Config.PUBLIC_DIR %>/js/global.js'
	],
	bundleFolder: [
		'<%= Config.PUBLIC_DIR %>/js/bundle/*',
		'<%= Config.PUBLIC_DIR %>/css/bundle/*'
	],
	zipTplFolder: [
		'<%= Config.PKG_NAME %>/tpl/'
	],
	zipFolder: [
		'<%= Config.PKG_NAME %>'
	],
	gruntUpdateFolder: [
		'./fe-workflow/'
	]
};
