/**
 * Creates files
 *
 * https://www.npmjs.com/package/grunt-file-creator
 */

var grunt = require('grunt'),
	component = grunt.option('name') || '',
	date = new Date().toISOString().substring(0, 10);

module.exports = {
	componentFiles: [
		{
			file: '<%= Config.PRIVATE_DIR %>/components/' + component + '/' + component + '.scss',
			method: function (fs, fd, done) {
				var content = "@charset \"utf-8\";\n" +
					"/**\n" +
					" * Capitan " + component + ".scss v1.0.0\n" +
					" *\n" +
					" * Copyright brandung GmbH & Co.KG\n" +
					" * http://www.brandung.de/\n" +
					" *\n" +
					" * Date: " + date + "\n" +
					" * MIT License (MIT)\n" +
					" */\n" +
					"\n" +
					"@import '../../sass/partials/functions';\n" +
					"@import '../../sass/partials/variables';\n" +
					"@import '../../sass/partials/mixins';\n" +
					"\n" +
					"$component: '" + component + "';\n"+
					"\n" +
					"// block\n" +
					"%#{$component} {\n" +
					"\t@include clearfix();\n"+
					"}\n\n\n"+
					"// element\n\n\n" +
					"// modifier\n\n" +
					"\n\n" +
					"// component class selector\n" +
					".#{$component} {\n" +
					"\t@extend %#{$component};\n"+
					"}\n";

				fs.writeSync(fd, content);

				done();
			}
		},
		{
			file: '<%= Config.PRIVATE_DIR %>/components/' + component + '/' + component + '.hbs',
			method: function (fs, fd, done) {
				var content = "<!--\n" +
					" Capitan " + component + ".hbs v1.0.0\n" +
					"\n" +
					" Copyright brandung GmbH & Co.KG\n" +
					" http://www.brandung.de/\n" +
					"\n" +
					" Date: " + date + "\n" +
					" MIT License (MIT)\n" +
					" -->\n" +
					"<div class=\"" + component + "\"></div>";

				fs.writeSync(fd, content);

				done();
			}
		}
	]
};