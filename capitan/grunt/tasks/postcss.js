/**
 * Apply several post-processors to your CSS using PostCSS.
 *
 * https://github.com/nDmitry/grunt-postcss
 */

module.exports = {

	// Post actions for SASS files
	SASS: {
		options: {
			processors: [
				// css linter
				require('stylelint')({
					configFile: process.cwd() + '/grunt/linter/.stylelintrc'
				}),
				// for a nicer output
				require('postcss-reporter')({
					clearMessages: true,
					throwError: true
				})
			],
			syntax: require('postcss-scss')
		},
		files: [
			{
				src: [
					'<%= Config.PRIVATE_DIR %>/components/**/*.scss',
					'<%= Config.PRIVATE_DIR %>/sass/**/*.scss',
					'!<%= Config.PRIVATE_DIR %>/sass/vendor/**/*.scss'
				]
			}
		]
	},


	// Post actions for CSS
	CSS: {
		options: {
			processors: [
				// add fallbacks for rem units
				require('pixrem')(),
				// add vendor prefixes
				// specifies the last two versions of any mainstream browser,
				// or any exceeding 2% market share
				require('autoprefixer')({
					browsers: ['last 2 versions', '> 2%']
				})
			]
		},
		default: {
			expand: true,
			cwd: '<%= Config.PUBLIC_ASSETS %>/css/',
			src: [
				'**/*.css'
			],
			dest: '<%= Config.PUBLIC_ASSETS %>/css/',
			ext: '.css'
		},
		component: {
			expand: true,
			cwd: '<%= Config.PUBLIC_APP %>/components/',
			src: [
				'**/*.css'
			],
			dest: '<%= Config.PUBLIC_APP %>/components/',
			ext: '.css'
		}
	}

};