/**
 * Capitan
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 * Date: 24.08.2015
 * MIT License (MIT)
 *
 * Sets the breakpoint variable by parsing a json object inside of a pseudo element of the body (checkout layout.scss for more information)
 */
Capitan.Util.setBreakpoints = function () {
	'use strict';

	Capitan.Vars.breakpoints = JSON.parse(Capitan.Function.getComputedStyle('body', ':before', 'content'));
}();