/**
 * Capitan
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 * Date: 20.08.2015
 * MIT License (MIT)
 *
 * Checks if the current breakpoint matches the given condition, e.g.
 * Capitan.Vars.currentBreakpoint is 'sm', then Capitan.Functions.assertBreakpoint('lt', 'lg')
 * would return true
 *
 * @param {string} operator - lt (lower than), eq (equal), ht (higher than)
 * @param {string} breakpoint - xs, sm, md, lg, xl
 * @return {boolean}
 */
Capitan.Function.assertBreakpoint = function (operator, breakpoint) {
	var breakpoints = Object.keys(Capitan.Vars.breakpoints),
		curBreakpointIndex = breakpoints.indexOf(Capitan.Vars.currentBreakpoint),
		conditionalBreakpointIndex = breakpoints.indexOf(breakpoint);

	switch (operator) {
		case 'eq':
			return curBreakpointIndex === conditionalBreakpointIndex;
			break;
		case 'lt':
			return curBreakpointIndex < conditionalBreakpointIndex;
			break;
		case 'ht':
			return curBreakpointIndex > conditionalBreakpointIndex;
			break;
		default:
			return false;
			break;
	}
};