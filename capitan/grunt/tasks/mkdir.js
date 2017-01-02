/**
 * Create folder structure specified in config.js.
 *
 * https://www.npmjs.com/package/grunt-mkdir
 */
module.exports = {
	projectStructure: { // create initial folder structure
		options: {
			create: '<%= Config.folderArr %>'
		}
	},
	zipFolder: {
		options: {
			create: ['<%= Config.ZIP_PUBLIC_FOLDER %>']
		}
	}
};