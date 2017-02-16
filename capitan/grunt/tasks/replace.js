/**
 * Replaces a placeholder for the assets path relative to the project type.
 *
 * https://npmjs.org/package/grunt-text-replace
 *
 * init:
 * - the template string is set by the prompt:init task
 */

var grunt = require('grunt'),
	Helpers = require('../helpers'),
	component = grunt.option('name') || '';

module.exports = {
	init: {
		src: [
			'./grunt/config.js',
			'./grunt/systems/<%= grunt.config("initSystem") %>.json'
		],
		overwrite: true,
		replacements: [
			{
				from: '%%system%%',
				to: '<%= grunt.config("initSystem") %>'
			},
			{
				from: '%%repo%%',
				to: Helpers.getReponame()
			}
		]
	},
	pathPlaceholder: {
		src: [
			'<%= Config.PRIVATE_DIR %>/templates/**/*.hbs',
			'<%= Config.PRIVATE_DIR %>/js/global.js',
			'<%= Config.PRIVATE_DIR %>/sass/**/*.*'
		],
		overwrite: true,
		replacements: [
			{
				from: '%%public%%',
				to: '<%= Config.LIVE_URL %>'
			},
			{
				from: '%%private%%',
				to: '<%= Config.PRIVATE_DIR %>'
			},
			{
				from: '%%project%%',
				to: '<%= Config.PKG_NAME %>'
			},
			{
				from: '%%publicComponents%%',
				to: '<%= Config.systemPaths.liveURL %>' + '<%= Config.systemPaths.app %>'
			}
		]
	},
	bowerPathPlaceholder: {
		src: [
			'bower.json'
		],
		overwrite: true,
		replacements: [
			{
				from: '%%public%%',
				to: '<%= Config.PUBLIC_ASSETS %>'
			},
			{
				from: '%%private%%',
				to: '<%= Config.PRIVATE_DIR %>'
			}
		]
	},
	zipFolderAssetPath: {
		src: [
			'<%= Config.ZIP_PUBLIC_FOLDER %>/**/*.js',
			'<%= Config.ZIP_PUBLIC_FOLDER %>/**/*.html',
			'!<%= Config.ZIP_PUBLIC_FOLDER %>/**/*.css'
		],
		overwrite: true,
		replacements: [
			{
				from: '<%= grunt.config("Config.LIVE_URL") %>/',
				to: ''
			}
		]
	},
	zipCSSPathMain: {
		src: [
			'<%= Config.ZIP_PUBLIC_FOLDER %>/css/*.css'
		],
		overwrite: true,
		replacements: [
			{
				from: '<%= grunt.config("Config.LIVE_URL") %>',
				to: '..'
			}
		]
	},
	zipCSSPathComponents: {
		src: [
			'<%= Config.ZIP_PUBLIC_FOLDER %>/components/**/*.css'
		],
		overwrite: true,
		replacements: [
			{
				from: '<%= grunt.config("Config.LIVE_URL") %>',
				to: '<%= Config.PUBLIC_APP %>'
			}
		]
	},
	importJsStorageKey: {
		src: [
			'<%= Config.PUBLIC_ASSETS %>/js/main.js'
		],
		overwrite: true,
		replacements: [
			{
				from: /'<@unique@>'/g,
				to: Helpers.setTimestamp()
			}
		]
	},
	deleteCssBlock: {
		src: [
			'<%= Config.PUBLIC_ASSETS %>/css/*.css',
			'<%= Config.PUBLIC_APP %>/components/*.css'
		],
		overwrite: true,
		replacements: [
			{
				from: /\/\*\s?<@delete*(\S*)(\n|\r|.)*?\s?delete@>\s?\*\//igm,
				to: ''
			}
		]
	},
	deleteJsBlock: {
		src: [
			'<%= Config.PUBLIC_ASSETS %>/js/*.js',
			'<%= Config.PUBLIC_ASSETS %>/js/handle/*.js',
			'<%= Config.PUBLIC_APP %>/components/*.js',
			'<%= Config.PUBLIC_ASSETS %>/js/function/*.js',
			'<%= Config.PUBLIC_ASSETS %>/js/util/*.js'
		],
		overwrite: true,
		replacements: [
			{
				from: /\/\/\s?<@delete*(\S*)(\n|\r|.)*?\/\/\s?delete@>/igm,
				to: ''
			}
		]
	},
	addNewComponentImport: {
		src: [
			'<%= Config.PRIVATE_DIR %>/js/global.js'
		],
		overwrite: true,
		replacements: [
			{
				from: /\/\/\s?<@newComponent@>/ig,
				to: ",\n\t\t\t\t{" +
				"\n\t\t\t\t\tcondition: $('." + component + "')," +
				"\n\t\t\t\t\tfetch: [" +
				"\n\t\t\t\t\t\tCapitan.Vars.folderPath + 'components/" + component + "/" + component + ".css'" +
				"\n\t\t\t\t\t]," +
				"\n\t\t\t\t\tunique: '<@unique@>'" +
				"\n\t\t\t\t}// <@newComponent@>"
			}
		]
	},
	includeSwigComponentPartial: {
		src: [
			'<%= Config.PRIVATE_DIR %>/templates/views/styleguide.hbs'
		],
		overwrite: true,
		replacements: [
			{
				from: /<!--\s?<@newComponent@>\s?-->/ig,
				to: "\n\t\t\t\t<div data-role=\"sg\" data-type=\"sg__component\" data-name=\"" + component.charAt(0).toUpperCase() + component.slice(1) +  "\">\n" +
				"\t\t\t\t\t{{> " + component.toString() + " }}\n" +
				"\t\t\t\t</div>\n" +
				"\t\t\t\t<!-- <@newComponent@> -->"
			}
		]
	}
};
