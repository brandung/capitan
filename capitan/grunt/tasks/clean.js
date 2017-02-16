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
			'<%= Config.PUBLIC_ASSETS %>/capitan.png',
			'./temp/',
			'../README.md',
			'../LICENSE'
		]
	},
	globalJsInPublicFolder: [
		'<%= Config.PUBLIC_ASSETS %>/js/global.js'
	],
	bundleFolder:  {
		options: {
			'force': true
		},
		src: [
			'<%= Config.PUBLIC_ASSETS %>/js/bundle/*',
			'<%= Config.PUBLIC_ASSETS %>/css/bundle/*'
		]
	},
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
