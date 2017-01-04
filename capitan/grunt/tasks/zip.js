/**
 * Zips the project for external use
 *
 * https://npmjs.org/package/grunt-zip
 */
module.exports = {
	'<%= Config.PKG_NAME %>.zip': [
		'<%= Config.PKG_NAME %>/**'
	]
};