/**
 * HTML Hinter
 *
 * https://www.npmjs.com/package/grunt-htmlhint-plus
 */
module.exports = {
	options: {
		htmlhintrc: process.cwd() + '/grunt/linter/.htmlhintrc'
	},
	files: {
		src: [
			'<%= Config.PRIVATE_DIR %>/templates/*.html',
			'!<%= Config.PRIVATE_DIR %>/templates/_modules.html'
		]
	}
};