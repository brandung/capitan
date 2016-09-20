/**
 * Capitan
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 * Date: 24.08.2015
 * MIT License (MIT)
 *
 * @param {string} element - Element selector, e.g. 'body', '.foobar > p'
 * @param {string} pseudo - Pseudoelement, e.g. ':before', ':after'
 * @param {string} property - CSS property, e.g. 'content', 'font-size'
 * @returns {*} string - returns the property value
 */
Capitan.Function.getComputedStyle = function (element, pseudo, property) {
	'use strict';

	pseudo = pseudo || null;

	return window.getComputedStyle(document.querySelector(element), pseudo)
		.getPropertyValue(property)
		.replace(/\\/g, '')
		.replace(/(^("|')|("|')$)/g, '');
};