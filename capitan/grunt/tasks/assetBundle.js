/**
 * Build bundels of JS and CSS files
 *
 * @param grunt
 */
module.exports = function(grunt) {
	grunt.registerTask('assetBundle', '', function (n) {
		var mainJS = grunt.file.read(grunt.config('Config.PUBLIC_DIR') + '/js/main.js'),
			bundleRegex = /\/\/\s?<@bundle*(\S*)(\n|\r|.)*?\/\/\s?bundle@>/igm,
			bundleBlocks = mainJS.match(bundleRegex),
			block,
			assets,
			path,
			bundleName,
			bundleFileType,
			bundleFileName,
			bundleFilePath,
			bundleFile,
			mainJSAssetPath;

		for (var res = 0, lenBlocks = bundleBlocks.length; res < lenBlocks; res += 1) {
			block = bundleBlocks[res];

			// get bundlename
			bundleName = block.match(/(\/\/\s?<@bundle)(#)([a-zA-Z0-9\-_]+)/)[3];

			// get files
			assets = block.match(/(Capitan\.Vars\.folderPath(\s)*\+(\s)*)?('|")[a-zA-Z0-9\/\.\-\_]*(\.js|\.css)('|")/igm);

			// get filetype, name and path
			bundleFileType = /.css('|")(,)?$/ig.test(assets[0]) ? 'css' : 'js';
			bundleFileName = bundleName + '-bundle.' + bundleFileType;
			bundleFilePath = bundleFileType + '/bundle/' + bundleFileName;

			// replace bundle in main.js
			mainJS = mainJS.replace(block, ('Capitan.Vars.folderPath + \'' + bundleFilePath + '\''));

			bundleFile = '';

			for (var asset = 0, lenAssets = assets.length; asset < lenAssets; asset += 1) {
				// clean filename
				mainJSAssetPath = assets[asset].replace(/(\'|")/g, '');

				if(!/\/\//.test(mainJSAssetPath)) {
					mainJSAssetPath = mainJSAssetPath.replace(/(Capitan\.Vars\.folderPath(\s)*\+(\s)*)/g, grunt.config('Config.PUBLIC_DIR') + '/');
					mainJSAssetPath = mainJSAssetPath.replace(/^\//g, '');

					// get file and add to bundle
					bundleFile += grunt.file.read(mainJSAssetPath);
				}
			}

			// write file
			grunt.file.write((grunt.config('Config.PUBLIC_DIR') + '/' + bundleFilePath), bundleFile);
			console.log('Created bundle file', bundleFileName);
		}

		grunt.file.write(grunt.config('Config.PUBLIC_DIR') + '/js/main.js', mainJS);
	});
};
