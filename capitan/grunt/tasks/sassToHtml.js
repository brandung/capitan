/**
 * Creating markup out of sass variables
 * for Styleguide
 * 
 * @param grunt
 */
module.exports = function (grunt) {
	grunt.registerTask('sassToHtml', 'Creating markup out of sass variables', function (n) {
		var variablesFile = grunt.file.read(grunt.config('Config.PRIVATE_DIR') + '/sass/partials/_variables.scss'),
			getMarkup = function (type) {
				var typeObj = {
						colors: {
							blockRegex: /\/\*\s?<@colors*(\S*)(\n|\r|.)*?\s?colors@>\s?\*\//igm,
							mapItemRegex: /\'([a-z0-9]-*)+\':\s?#[a-fA-F0-9]{3,6}/g,
							html: function (key, value) {
								return "\t<div class='col-xs-6 col-md-2'>\n" +
									"\t\t<div style='background: " + value + "; padding: 15px; width: 100%; border: solid 1px black; height: 100px;'>" +
									"\t\t</div>\n" +
									"\t\t<b>" + key + ":</b> " + value + "\n" +
									"\t</div>\n";
							}
						},
						icons: {
							blockRegex: /\/\*\s?<@icons*(\S*)(\n|\r|.)*?\s?icons@>\s?\*\//igm,
							mapItemRegex: /([a-zA-Z0-9]-*)+:\s?('|")\\[a-z0-9]+('|")/g,
							html: function (key, value) {
								return "\t<div class='col-xs-6 col-md-2'>\n" +
									"\t\t<div class='util-icon--before util-icon--" + key + "' style='text-align:center; font-family: \"icomoon\"; padding: 15px; width: 100%; border: solid 1px black; height: 75px; color: black; line-height:40px; font-size:40px;'>" +
									"\t\t</div>\n" +
									"\t\t<b>.util-icon--" + key + ":</b> " + value + "\n" +
									"\t</div>\n";
							}
						},
						breakpoints: {
							blockRegex: /\/\*\s?<@breakpoints*(\S*)(\n|\r|.)*?\s?breakpoints@>\s?\*\//igm,
							mapItemRegex: /\$([a-zA-Z0-9]-*)+:\s?[0-9]{3,4}/g,
							html: function (key, value) {
								key = key.toUpperCase();
								key = key.replace('$', '');

								return "<div style='width: " + value + "px; background: black; box-sizing: border-box; padding: 0 15px; height:40px; line-height: 40px; color:white; margin-bottom: 20px;'>" + key + "<span class='util-right'>" + value + "px</span></div>\n";
							}
						}
					},
					html = '',
					count = 0,
					map,
					string;

				map = variablesFile.match(typeObj[type].blockRegex)[0];
				map = map.match(typeObj[type].mapItemRegex);

				if(type === 'colors' || type === 'icons') {
					html =  "<div class='row'>\n";
				}

				for(var i = 0, len = map.length; i < len; i += 1) {
					string = map[i].replace(/\s/g, '');
					string = string.split(':');

					html += typeObj[type].html(string[0], string[1]);

					count += 1;

					if(count === 6) {
						if(type === 'colors' || type === 'icons') {
							html +=  "</div>\n<div class='row'>\n";
						}

						count = 0;
					}
				}

				if(type === 'colors' || type === 'icons') {
					html +=  "</div>";
				}

				return html;
			};

		console.log('Updated styleguide files');

		grunt.file.write(grunt.config('Config.PRIVATE_DIR') + '/templates/partials/includes/colors.hbs', getMarkup('colors'));
		grunt.file.write(grunt.config('Config.PRIVATE_DIR') + '/templates/partials/includes/icons.hbs', getMarkup('icons'));
		grunt.file.write(grunt.config('Config.PRIVATE_DIR') + '/templates/partials/includes/breakpoints.hbs', getMarkup('breakpoints'));
	});
};