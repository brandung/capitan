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
			'<%= Config.VIEWS_DIR %>/*.html',
			'!<%= Config.VIEWS_DIR %>/styleguide.html'
		]
	}
};