
/*
* Capitan formValidation v0.9.0
*
* Copyright Capitan GmbH & Co.KG
* http://www.Capitan.de/
*
* Date: 2016-04-21
* MIT License (MIT)
*/

Capitan.Component.formValidation = function ($) {

	// public methods / properties
	var self = {
		//...
	};

	//private functions / properties
	var _ = {
			defaults: {
				componentSelector: '.form[data-validate="true"]',
				pluginOptions: {
					selectors: {},
					classes: {},
					callbacks: {}
				}
			}
		}
	;

	/**
	 * Init component
	 *
	 * @public
	 * @param settings
	 */
	self.init = function (settings, context) {
		var componentElements;
		var initOptions = $.extend(true, {}, _.defaults, settings);

		if(!initOptions.componentSelector){
			return console.error('Capitan.Component.formValidation | componentSelector needed!');
		}

		//get component elements in context (whole document or just a fraction eg. ajax loaded content)
		componentElements = $(initOptions.componentSelector, context || document);

		//init the plugin
		componentElements.validate(initOptions.pluginOptions);
	};

	return self;
}(jQuery);

/**
 * init component
 */
Capitan.Component.formValidation.init({
    //init with defaults...
});
