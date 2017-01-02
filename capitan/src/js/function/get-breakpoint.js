/**
 * Capitan
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 * Date: 19.08.2015
 * MIT License (MIT)
 *
 * Gets and returns the current breakpoint based on the window width
 *
 * @return {string} - One of the breakpoints: xs, sm, md, lg, xl
 */
Capitan.Function.getBreakpoint = function () {
	'use strict';

	var windowWidth = window.innerWidth,
		breakpoints = Object.keys(Capitan.Vars.breakpoints),
		breakpoint = '';

	for (var i = breakpoints.length - 1; i >= 0; i -= 1) {
		breakpoint = Capitan.Vars.breakpoints[breakpoints[i]];

		if (windowWidth >= breakpoint) {
			return breakpoints[i];
		} else if (i === 0 && windowWidth < breakpoint) {
			return breakpoints[i];
		}
	}
};