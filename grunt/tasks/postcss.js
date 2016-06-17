/**
 * Apply several post-processors to your CSS using PostCSS.
 *
 * https://github.com/nDmitry/grunt-postcss
 */

module.exports = {
	options: {
		processors: [
			// add fallbacks for rem units
			require('pixrem')(),
			// add vendor prefixes
			// specifies the last two versions of any mainstream browser,
			// or any exceeding 2% market share
			require('autoprefixer')({
				browsers: ['last 3 versions', '> 2%']
			})
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