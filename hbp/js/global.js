/**
 * Define Global Namespace
 */
var Capitan = function (out) {
	'use strict';

	out = out || {};

	for (var i = 1; i < arguments.length; i++) {
		if (!arguments[i]) {
			continue;
		}

		for (var key in arguments[i]) {
			if (arguments[i].hasOwnProperty(key)) {
				out[key] = arguments[i][key];
			}
		}
	}

	return out;
}({}, (Capitan || {}), {
	Vars: {
		// path to assets folder
		folderPath: '%%public%%/',
		// standard breakpoints
		breakpoints: {},
		// mobile first (xs, sm, md, lg, xl)
		currentBreakpoint: 'xs',
		// portrait first (portrait, landscape)
		currentOrientation: 'portrait',
		isIE: isIE: window.navigator.userAgent.indexOf('MSIE ') > 0 || // IE <= 10
			window.navigator.userAgent.indexOf('Trident/') > 0 || // IE 11
			window.navigator.userAgent.indexOf('Edge/') > 0  // IE 12
	},
	// CSS components script namespace
	Component: {},
	// functions must return something
	Function: {},
	// everything that has to do with event handling
	Handle: {},
	// Should be used for scripts that have nothing to do with components, e.g. placeholder polyfills, plugins, etc.
	Util: {}
});

// <@delete
// clear basket in develop mode
basket.clear();
// delete@>

// abortion timeout for asset fetching, default 5000ms
basket.timeout = 60000;

/**
 * Load main plugins via basket.js
 */
basket.require(
	{
		url: Capitan.Vars.folderPath + 'js/cap.required-vendor.min.js',
		unique: 0
	}
).then(function () {
	'use strict';

	(function ($) {
		// store commonly used jQuery objects to Vars object
		Capitan.Vars = $.extend(Capitan.Vars, {
			$html: $('html'),
			$body: $('body'),
			$window: $(window),
			$doc: $(document)
		});

		// Assets that are necessary globally and on every page, can and will be loaded here (DOM not ready)
		Capitan.Util.fetchBeforeRender = function () {
			return $.import([
				{
					condition: true,
					order: 0,
					fetch: [
						// <@bundle#before-render
						Capitan.Vars.folderPath + 'js/util/console-polyfill.js',
						Capitan.Vars.folderPath + 'js/util/inject-smartresize.js',
						Capitan.Vars.folderPath + 'js/function/assert-breakpoint.js',
						Capitan.Vars.folderPath + 'js/function/get-breakpoint.js',
						Capitan.Vars.folderPath + 'js/function/get-orientation.js',
						Capitan.Vars.folderPath + 'js/function/get-computed-style.js',
						Capitan.Vars.folderPath + 'js/util/set-breakpoints.js',
						Capitan.Vars.folderPath + 'js/handle/set-event-class.js',
						Capitan.Vars.folderPath + 'js/handle/resize-handler.js'
						// bundle@>
					],
					callback: [
						{
							method: function () {
								// load components when DOM is ready
								$(function(){
									Capitan.Util.loadComponents();
								})
							}
						}
					],
					unique: '<@unique@>'
				}
			], false);
		};

		// Component loader (DOM is ready)
		Capitan.Util.loadComponents = function () {
			$.import([
				{
					condition: $('[data-role="sg"]'),
					fetch: [
						Capitan.Vars.folderPath + 'js/libs/bra/bra_styleguide-widget/bra_styleguide-widget.js',
						Capitan.Vars.folderPath + 'js/libs/bra/bra_styleguide-widget/bra_styleguide-widget.css'
					],
					unique: '<@unique@>'
				},
				{
					condition: Capitan.Function.assertBreakpoint('lt', 'md'),
					fetch: [
						// <@bundle#h5bp-helper
						Capitan.Vars.folderPath + 'js/libs/vendor/h5bp/helper.js',
						Capitan.Vars.folderPath + 'js/util/h5bp-helper.js'
						// bundle@>
					],
					unique: '<@unique@>'
				},
				{
					// load always and always from server
					condition: true,
					fetch: [
						Capitan.Vars.folderPath + 'js/hotfix.js',
						Capitan.Vars.folderPath + 'css/hotfix.css'
					],
					unique: new Date().getTime()
				},
				{
					condition: $('.alert'),
					fetch: [
						Capitan.Vars.folderPath + 'component/alert/alert.css'
					],
					unique: '<@unique@>'
				},
				{
					condition: $('form'),
					fetch: [
						Capitan.Vars.folderPath + 'component/forms/forms.css'
					],
					unique: '<@unique@>'
				},
				{
					condition: $('.btn'),
					fetch: [
						Capitan.Vars.folderPath + 'component/buttons/buttons.css'
					],
					unique: '<@unique@>'
				}// <@newComponent@>
			], true);
		};

		// snippets placeholder
		// --- start|bra-pb: js ---
		// --- end|bra-pb: js ---

		// load before-render bundle before DOM ready
		Capitan.Util.fetchBeforeRender();

		/**
		 * document ready call
		 */
		$(function () {
			// ...
		});
		
	})(jQuery);
}, function () {
	'use strict';

	// <@delete
	console.error('main.js: fetching of scripts and initialization failed');
	// delete@>
});
