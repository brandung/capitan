/**
 * Concats specified js files in a given order
 *
 * https://npmjs.org/package/grunt-contrib-concat
 */

module.exports = {
	mainJS: {
		src: [
			'<%= Config.PUBLIC_DIR %>/js/libs/vendor/basket/basket.full.custom.min.js',
			'<%= Config.PRIVATE_DIR %>/js/global.js'
		],
		dest: '<%= Config.PUBLIC_DIR %>/js/main.js'
	}
};