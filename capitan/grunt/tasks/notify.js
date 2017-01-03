/**
 * Automatic desktop notifications for Grunt errors and warnings
 *
 * https://github.com/dylang/grunt-notify
 */
module.exports = {
	finish: {
		options: {
			title: 'DEPLOY Task finished!',
			message: 'Nice Job, dude'
		}
	},
	export: {
		options: {
			title: 'EXPORT Task finished!',
			message: 'Please upload to server'
		}
	}
};