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
			'<%= Config.PRIVATE_DIR %>/templates/tpl/**/*.tpl',
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
				to: '<%= Config.PUBLIC_DIR %>'
			},
			{
				from: '%%private%%',
				to: '<%= Config.PRIVATE_DIR %>'
			}
		]
	},
	zipFolderAssetPath: {
		src: [
			'<%= Config.PKG_NAME %>/**/*.js',
			'<%= Config.PKG_NAME %>/**/*.html',
			'!<%= Config.PKG_NAME %>/**/*.css'
		],
		overwrite: true,
		replacements: [
			{
				from: '<%= grunt.config("Config.LIVE_URL") %>',
				to: '<%= grunt.config("Config.PUBLIC_DIR") %>'
			}
		]
	},
	zipCSSPathMain: {
		src: [
			'<%= Config.PKG_NAME %>/<%= Config.PUBLIC_DIR %>/css/*.css'
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
			'<%= Config.PKG_NAME %>/<%= Config.PUBLIC_DIR %>/component/**/*.css'
		],
		overwrite: true,
		replacements: [
			{
				from: '<%= grunt.config("Config.LIVE_URL") %>',
				to: '<%= Config.PUBLIC_DIR %>'
			}
		]
	},
	importJsStorageKey: {
		src: [
			'<%= Config.PUBLIC_DIR %>/js/function/get-unique.js'
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
			'<%= Config.PUBLIC_DIR %>/css/*.css',
			'<%= Config.PUBLIC_DIR %>/component/*.css'
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
			'<%= Config.PUBLIC_DIR %>/js/*.js',
			'<%= Config.PUBLIC_DIR %>/js/handle/*.js',
			'<%= Config.PUBLIC_DIR %>/component/*.js',
			'<%= Config.PUBLIC_DIR %>/js/function/*.js',
			'<%= Config.PUBLIC_DIR %>/js/util/*.js'
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
				"\n\t\t\t\t\t\tCapitan.Vars.folderPath + 'component/" + component + "/" + component + ".css'" +
				"\n\t\t\t\t\t]," +
				"\n\t\t\t\t\tunique: Capitan.Function.getUnique()" +
				"\n\t\t\t\t}// <@newComponent@>"
			}
		]
	},
	includeSwigComponentPartial: {
		src: [
			'<%= Config.PRIVATE_DIR %>/templates/tpl/_modules.tpl'
		],
		overwrite: true,
		replacements: [
			{
				from: /<!--\s?<@newComponent@>\s?-->/ig,
				to: "\n\t\t\t\t<div data-role=\"sg\" data-type=\"sg__component\" data-name=\"" + component.charAt(0).toUpperCase() + component.slice(1) +  "\">\n" +				
				"\t\t\t\t\t{# " + component.toString() + ".tpl #}\n" +
				"\t\t\t\t\t{% include \"../../component/" + component.toString() + "/" + component.toString() + ".tpl\" %} \n" +				
				"\t\t\t\t</div>\n" +
				"\t\t\t\t<!-- <@newComponent@> -->"
			}
		]
	}/*,
	includeSwigViewPartial: {
		src: [
			'<%= Config.PRIVATE_DIR %>/templates/tpl/_modules.tpl'
		],
		overwrite: true,
		replacements: [
			{
				from: /<!--\s?<@newView@>\s?-->/ig,
				to: "<h3 class=\"mod-headline\">" +
				component.charAt(0).toUpperCase() + component.slice(1) +
				"</h3>\n" +
				"\t\t\t{% include \"./partials/views/" + component.toString() + ".tpl\" %} \n\n" +
				"\t\t\t<!-- <@newView@> -->"
			}
		]
	}*/
};
