/**
 * Swig template engine plugin
 *
 * https://www.npmjs.com/package/grunt-tasty-swig
 */

module.exports = {
	options: {
		extension: '.tpl'
	},
	index: {
		src: ['<%= Config.PRIVATE_DIR %>/templates/tpl/**.tpl'],
		dest: '<%= Config.PRIVATE_DIR %>/templates'
	}
};