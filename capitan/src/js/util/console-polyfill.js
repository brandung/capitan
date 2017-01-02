/**
 * Capitan
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 * Date: 19.08.2015s
 * MIT License (MIT)
 *
 * Polyfill for console methods
 */
Capitan.Util.consolePolyfill = function () {
	'use strict';

	if (!(window.console && console.log)) {
		(function () {
			var noop = function () {
					// do nothing
				},
				methods = [ 'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn' ],
				length = methods.length,
				console = window.console = {};

			while (length) {
				console[methods[length]] = noop;

				length -= 1;
			}
		}());
	}
}();