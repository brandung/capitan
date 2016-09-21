/**
 * config.js
 *
 * The 'Config' object contains all our system configurations for our build tasks.
 * In the 'SystemPath' object we will store the folder paths of the selected system.
 */

var grunt = require('grunt'),
	path = require('path'),
	Config = {};

/**
 * Our init System
 */
Config.SYSTEM = '%%system%%';

/**
 * Define our global configuration vars
 */
Config.systemPaths =  grunt.file.readJSON('./grunt/systems/' + Config.SYSTEM + '.json');
// Folder structure of the given system
Config.folderArr = Config.systemPaths.folder;
// The `src` folder contains all production assets, like js, scss und tpl files
Config.srcFolderName = 'src';
// Into the `build` folder our build process will copy the dev assets
Config.buildFolderName = 'build';
// Get project name from package.json
Config.PKG_NAME = require('../package.json')['name'];
// Get user profile name (OSX/Windows)
if(process.env.LOGNAME) {
	Config.USER = process.env['LOGNAME'];
} else {
	Config.USER = process.env['USERNAME'];
}
// Set local path
Config.CWD = path.resolve(process.cwd(), '');
// Route object for the browserSync
Config.syncRoutes = Config.systemPaths.route;

/**
 * Define our global directory paths
 */
Config.PRIVATE_DIR = Config.systemPaths.private;
Config.PUBLIC_DIR = Config.systemPaths.public;
Config.LIVE_URL = Config.systemPaths.liveURL + '/' + Config.PUBLIC_DIR;
Config.SRC_DIR = Config.systemPaths.private + '/' + Config.srcFolderName;
Config.BUILD_DIR = Config.systemPaths.private + '/' + Config.buildFolderName;
Config.ZIP_PUBLIC_FOLDER = Config.PKG_NAME + '/' + Config.PUBLIC_DIR;
Config.PUBLIC_JS_VENDOR = Config.PUBLIC_DIR + '/js/libs/vendor';

/**
 * This is a collection of file patterns that refer to our app code (the
 * stuff in `src/`). These file paths are used in the configuration of
 * build tasks.
 *
 * @type {{js: *[], scss: *[]}}
 */
Config.app_files = {
	js: [Config.SRC_DIR + '/**/*.js'],
	scss: [Config.SRC_DIR +'/**/*.scss']
};

/**
 * Define our default required JS files.
 * The concatenated file will be load via basket in our global.js. *
 *
 * @type {*[]}
 */
Config.requiredVendorJSArr = [
	Config.PUBLIC_JS_VENDOR + '/jquery/jquery.min.js',
	Config.PUBLIC_JS_VENDOR + '/modernizr/modernizr.custom.min.js',
	Config.PUBLIC_JS_VENDOR + '/picturefill/picturefill.min.js',
	Config.PUBLIC_JS_VENDOR + '/import/jquery.import.min.js'
];

module.exports = Config;
