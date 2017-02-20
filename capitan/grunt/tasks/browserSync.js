/**
 * The magical sync task executes the watch task
 * after one of the specified file types change
 * and reloads the browser
 *
 * https://npmjs.org/package/grunt-browser-sync
 * https://www.npmjs.com/package/connect-history-api-fallback
 * Middleware to proxy requests through a specified index page, useful for
 * Single Page Applications that utilise the HTML5 History API.
 */

var grunt = require('grunt');
var historyApiFallback = require('connect-history-api-fallback');

module.exports = {
	bsFiles: {
		src: [
			'<%= Config.VIEWS_DIR %>/styleguide.html',
			'<%= Config.PUBLIC_ASSETS %>/js/main.js'
		]
	},
	options: {
		watchTask: true,
		open: 'external',
		notify: false,
		injectChanges: false,
		reloadDelay: 1000,
		server: {
			baseDir: '<%= Config.CWD %>/<%= Config.VIEWS_DIR %>/',
			index: 'index.html',
			routes: '<%= Config.syncRoutes %>',
			middleware: [ historyApiFallback() ]
		},
		ghostMode: {
			clicks: true,
			forms: true,
			scroll: true
		}
	}
};
