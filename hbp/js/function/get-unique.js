/**
 * Capitan
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 * Date: 19.08.2015
 * MIT License (MIT)
 *
 * Returns a static or dynamic based on the url, e.g.
 * kemmerling.localtunnel.me -> dynamic key
 * 192.168.32.20:3000 -> dynamic key
 * dev.somedomain.de -> dynamic key
 * www.somelivedomain.de -> static key
 *
 * @param {boolean} getProdUnique - If true, the static key will be returned
 * @return {number}
 */
Capitan.Function.getUnique = function (getProdUnique) {
	if (!window.location.origin) {
		window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
	}

	Capitan.Vars.isDev = /(^http(s)?:\/\/(dev\.|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})))|(localtunnel\.me)/ig.test(window.location.origin);

	if (Capitan.Vars.isDev && !getProdUnique) {
		return new Date().getTime();
	} else {
		return '<@unique@>';
	}
};