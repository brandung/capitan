/**
 * Validate files with ESLint
 *
 * https://www.npmjs.com/package/grunt-eslint
 */
module.exports = {
	options: {
		configFile: process.cwd() + '/grunt/linter/.eslintrc'
	},
	target: [
		'<%= Config.PRIVATE_DIR %>/component/**/*.js',
		'<%= Config.PRIVATE_DIR %>/js/**/*.js',
		'!<%= Config.PRIVATE_DIR %>/component/**/vendor/**/*.js'
	]
};