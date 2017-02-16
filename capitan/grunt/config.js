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
Config.ROOT_DIR = Config.systemPaths.root;
Config.PRIVATE_DIR = Config.systemPaths.private;
Config.PUBLIC_DIR = Config.ROOT_DIR + Config.systemPaths.public;
Config.PUBLIC_APP = Config.PUBLIC_DIR + Config.systemPaths.app;
Config.PUBLIC_ASSETS = Config.PUBLIC_DIR + Config.systemPaths.assets;
Config.VIEWS_DIR = Config.systemPaths.views;
Config.LIVE_URL = Config.systemPaths.liveURL + Config.systemPaths.assets;
Config.SRC_DIR = Config.PRIVATE_DIR + '/';
Config.ZIP_PUBLIC_FOLDER = '_' + Config.PKG_NAME + '_';
Config.PRIVATE_JS_VENDOR = Config.PRIVATE_DIR + '/js/libs/vendor';


/**
 * Define our default required JS files.
 * The concatenated file will be load via basket in our global.js. *
 *
 * @type {*[]}
 */
Config.requiredVendorJSArr = [
	Config.PRIVATE_JS_VENDOR + '/jquery/jquery.min.js',
	Config.PRIVATE_JS_VENDOR + '/modernizr/modernizr.custom.min.js',
	Config.PRIVATE_JS_VENDOR + '/picturefill/picturefill.min.js',
	Config.PRIVATE_JS_VENDOR + '/import/jquery.import.min.js'
];

module.exports = Config;
