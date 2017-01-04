/**
 * CAPITAN's Gruntfile
 * https://github.com/brandung/capitan
 *
 * Created by
 * Simon Kemmerling and Philip Morkisch
 *
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de
 *
 * Licensed under MIT
 * https://github.com/brandung/capitan/blob/master/LICENSE
 */

'use strict';

module.exports = function (grunt) {

	/**
	 * Define our global vars
	 */
	var Config = {},
		configFile = './grunt/config.js',
		Helpers = require('./grunt/helpers'),
		_ = grunt.util._,
		path = require('path');


	/**
	 * Measures the time each task takes
	 *
	 * https://www.npmjs.com/package/time-grunt
	 */
	require("time-grunt")(grunt);


	/**
	 * Load the notification plugin
	 */
	grunt.loadNpmTasks('grunt-notify');


	/**
	 * Check if the Config.SYSTEM var is already set
	 * and load the config.js file.
	 */
	if (!Helpers.checkString('%%system%%', configFile)) {
		Config = require(configFile);
	}


	/**
	 * We have to bind the 'Config' object to our taskConfig,
	 * so we have access to the global vars for e.g. using `<% %>` template strings.
	 */
	var taskConfig = {
		Config: Config
	};


	/**
	 * Loads task options from 'grunt/tasks/' folder
	 * and loads tasks defined in `package.json`.
	 * Used jitGrunt to load only the modules that are currently needed
	 * instead of loading all modules on every build.
	 *
	 * https://www.npmjs.com/package/load-grunt-config
	 */
	taskConfig = _.extend(taskConfig,
		require('load-grunt-config')(grunt, {
			configPath: path.join(process.cwd(), 'grunt/tasks'),
			jitGrunt: {
				staticMappings: {
					bower: 'grunt-bower-task',
					replace: 'grunt-text-replace',
					htmlhintplus: 'grunt-htmlhint-plus'
				}
			},
			init: false
		})
	);


	/**
	 * Init our grunt config
	 */
	grunt.initConfig(taskConfig);


	/****************************************************************************
	 * App Main Tasks
	 ****************************************************************************/

	/**
	 * The 'default' task
	 */
	grunt.registerTask('default', 'Default tasks to compile assets', [
		'confReady',
		'sass',
		'postcss:CSS',
		'sassToHtml',
		'cap-buildIndex',
		'compile-handlebars',
		'copy:privateUtilToPublicFolder',
		'copy:privateHandlerToPublicFolder',
		'copy:privateFunctionToPublicFolder',
		'copy:privateComponentToPublicFolder',
		'copy:publicComponentVendorToPublicJSFolder',
		'concat:mainJS',
		'clean:globalJsInPublicFolder'
	]);


	/**
	 * The `project:init` task configures your project,
	 * move the boilerplate into the private folder
	 * and copy the assets into the given folder structure.
	 */
	grunt.registerTask('project:init', 'Start the initializing process', [
		'cap-msg:intro',
		'prompt:init',
		'replace:init',
		'confReady',
		'mkdir:projectStructure',
		'replace:pathPlaceholder',
		'replace:bowerPathPlaceholder',
		'bower:install',
		'copy:privateFontsToPublicFolder',
		'copy:privateRootFilesToRoot',
		'clean:gruntUpdateFolder',
		'clean:init',
		'concat:mainVendorJS',
		'default',
		'browserSync',
		'watch'
	]);


	/**
	 * The 'project:serve' task for developing
	 */
	grunt.registerTask('project:serve', 'Start the developing task', [
		'cap-msg:intro',
		'default',
		'browserSync',
		'watch'
	]);


	/**
	 * The 'project:lint' task for validating private files
	 */
	grunt.registerTask('project:lint', 'Lint your public JS and private SASS and HTML files', [
		'cap-msg:intro',
		'postcss:SASS',
		'htmlhintplus',
		'eslint'
	]);


	/**
	 * The 'project:finish' task prepares files for deployment
	 */
	grunt.registerTask('project:finish', 'Minify and concatenate files for live environment', [
		'cap-msg:intro',
		'default',
		'sub:finish',
		'notify:finish'
	]);


	/**
	 * The 'project:export' task prepare your project for a standalone version
	 */
	grunt.registerTask('project:export', 'Export project for a standalone version', [
		'cap-msg:intro',
		'default',
		'sub:finish',
		'sub:zip',
		'notify:export'
	]);


	/**
	 * ZIP the project
	 */
	grunt.registerTask('create:zip', 'Create a standalone version and zip it', [
		'cap-msg:intro',
		'sub:zip',
		'zip',
		'clean:zipFolder'
	]);


	/**
	 * Create 'styleguide'
	 */
	grunt.registerTask('create:styleguide', 'Update manually the styleguide.html', [
		'confReady',
		'sassToHtml'
	]);


	/**
	 * Create new component
	 */
	grunt.registerTask('create:component', 'Create new component', [
		'confReady',
		'file-creator:componentFiles',
		'replace:addNewComponentImport',
		'replace:includeSwigComponentPartial',
		'default',
		'project:serve'
	]);


	/**
	 * Update Grunt files
	 */
	grunt.registerTask('update:grunt', 'Update grunt assets from https://github.com/brandung/capitan', [
		'confReady',
		'bower:install',
		'copy:gruntUpdate',
		'clean:gruntUpdateFolder',
		'replace:bowerPathPlaceholder'
	]);


	/**
	 * Sub Tasks
	 */
	grunt.registerTask('sub:finish', [
		'replace:deleteCssBlock',
		'replace:importJsStorageKey',
		'replace:deleteJsBlock',
		'clean:bundleFolder',
		'uglify:component',
		'uglify:global',
		'uglify:bra',
		'assetBundle',
		'uglify:bundle',
		'uglify:mainJS',
		'cssmin'
	]);

	grunt.registerTask('sub:zip', [
		'confReady',
		'mkdir:zipFolder',
		'copy:publicFolderToZipFolder',
		'copy:templatesToZipFolder',
		'copy:rootFilesToZipFolder',
		'replace:zipFolderAssetPath',
		'replace:zipCSSPathComponents',
		'replace:zipCSSPathMain'
	]);
};
