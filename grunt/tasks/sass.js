/**
 * Compiles sass files using libsass (damn fast!)
 *
 * https://www.npmjs.org/package/grunt-sass
 */

module.exports = {
	files: {
		expand: true,
		cwd: '<%= Config.PRIVATE_DIR %>/sass',
		src: ['**/*.scss'],
		dest: '<%= Config.PUBLIC_DIR %>/css',
		ext: '.css'
	},
	component: {
		expand: true,
		cwd: '<%= Config.PRIVATE_DIR %>/component',
		src: ['**/*.scss'],
		dest: '<%= Config.PUBLIC_DIR %>/component',
		ext: '.css'
	}
};