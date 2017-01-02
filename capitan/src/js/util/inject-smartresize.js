/**
 * Capitan
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 * Date: 19.08.2015
 * MIT License (MIT)
 *
 * Resize handler with debounce, should be used for resize handling purposes instead of e.g. $(window).on('resize', ...)
 */
Capitan.Util.injectSmartResize = function ($, sr) {
	'use strict';

	// debouncing function from John Hann
	// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	var debounce = function (func, threshold, execAsap) {
		var timeout = null;

		return function debounced () {
			var _this = this,
				args = arguments;

			if (timeout) {
				clearTimeout(timeout);
			} else if (execAsap) {
				func.apply(_this, args);
			}

			timeout = setTimeout(function () {
				if (!execAsap) {
					func.apply(_this, args);
				}

				timeout = null;
			}, threshold || 100);
		};
	};

	// smartresize
	$.fn[sr] = function (fn) {
		return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
	};
}(jQuery, 'smartresize');