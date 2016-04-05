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
					replace: 'grunt-text-replace'
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
	grunt.registerTask('default', 'Desc', [
		'confReady',
		'sass',
		'sassToHtml',
		'tasty_swig',
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
		'prompt:init',
		'replace:init',
		'confReady',
		'mkdir:projectStructure',
		'copy:htmlBoilerplateToPrivate',
		'replace:pathPlaceholder',
		'replace:bowerPathPlaceholder',	
		'bower:install',
		'copy:privateFontsToPublicFolder',
		'copy:privateLibsToPublicFolder',
		'copy:privateRootFilesToRoot',
		'clean:gruntUpdateFolder',
		'clean:htmlBoilerplateFolder',
		'clean:privateRootFiles',
		'copy:hotfixjsToPublicFolder',
		'copy:hotfixcssToPublicFolder',
		'clean:rootFilesInPrivateFolder',
		'default',
		'project:serve'
	]);


	/**
	 * The 'project:serve' task for developing
	 */
	grunt.registerTask('project:serve', [
		'default',
		'browserSync',
		'watch'
	]);


	/**
	 * The 'project:finish' task prepares files for deployment
	 */
	grunt.registerTask('project:finish', [
		'default',
		'replace:deleteCssBlock',
		'replace:importJsStorageKey',
		'replace:deleteJsBlock',
		'clean:bundleFolder',
		'uglify:component',
		'uglify:global',
		'assetBundle',
		'uglify:mainJS',
		'cssmin',
		'notify:finish'
	]);


	/**
	 * ZIP the project
	 */
	grunt.registerTask('create:zip', [
		'confReady',
		'mkdir:zipFolder',
		'copy:publicFolderToZipFolder',
		'copy:templatesToZipFolder',
		'copy:rootFilesToZipFolder',
		'replace:zipFolderAssetPath',
		'replace:zipCSSPath',
		'clean:zipTplFolder',
		'zip',
		'clean:zipFolder'
	]);


	/**
	 * Create 'styleguide'
	 */
	grunt.registerTask('create:styleguide', [
		'confReady',
		'sassToHtml'
	]);


	/**
	 * Create new component
	 */
	grunt.registerTask('create:component', [
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
	grunt.registerTask('update:grunt', [
		'confReady',
		'bower:install',
		'copy:gruntUpdate',
		'clean:gruntUpdateFolder',
		'replace:bowerPathPlaceholder'
	]);
};
