/**
 * Apply several post-processors to your CSS using PostCSS.
 *
 * https://github.com/nDmitry/grunt-postcss
 */

module.exports = {
	options: {
		processors: [
			require('pixrem')(), // add fallbacks for rem units
			require('autoprefixer')({browsers: 'last 2 versions'}) // add vendor prefixes
		]
	},
	default: {
		expand: true,
		cwd: '<%= Config.PUBLIC_DIR %>/css/',
		src: [
			'**/*.css'
		],
		dest: '<%= Config.PUBLIC_DIR %>/css/',
		ext: '.css'
	},
	component: {
		// src: 'css/*.css'
		expand: true,
		cwd: '<%= Config.PUBLIC_DIR %>/component/',
		src: [
			'**/*.css'
		],
		dest: '<%= Config.PUBLIC_DIR %>/component/',
		ext: '.css'
	}
};