/**
* brandung validate Plugin v0.9.1
*
* Copyright brandung GmbH & Co.KG
* http://www.brandung.de/
*
* Author: Felix Leupold
*
* Date: 2017-01-14
* MIT License (MIT)
*/

;(function ( $, window, document, undefined ) {
	"use strict";

	//plugin global / shared variables
	var pluginName = 'validate';
	var $window = $(window);
	var rAF = window.requestAnimationFrame || window.setTimeout;
	var cAF = window.cancelAnimationFrame || window.clearTimeout;

	//TODO
	// - pattern for safari http://caniuse.com/#feat=input-pattern
	// - set individual errorMessages object with data-attr

	//option defaults
	var defaults = {

		disableAutocompletion: false,
		disableSubmitButtons: false,
		sendFormViaAjax: false,

		errorMessages: {
			defaultMessage: 'defaultMessage | please fill this field correctly',
			badInput: 'badInput | please fill this field correctly',
			customError: 'customError | please fill this field correctly',
			patternMismatch: 'patternMismatch | please fill this field correctly',
			rangeOverflow: 'rangeOverflow | please fill this field correctly',
			rangeUnderflow: 'rangeUnderflow | please fill this field correctly',
			stepMismatch: 'stepMismatch | please fill this field correctly',
			tooLong: 'tooLong | please fill this field correctly',
			tooShort: 'tooShort | please fill this field correctly',
			typeMismatch: 'typeMismatch | please fill this field correctly',
			valueMissing: 'valueMissing | please fill this field correctly',
		},

		selectors: {
			inputBox: '.form__field-wrapper',
			inputErrorBox: '.form__error',
			errorMessages: 'small' //in inputErrorBox
		},

		classes: {
			userError: 'user-error',
			valid: 'is-valid',
			invalid: 'is-invalid',
			disabled: 'is-disabled',
			fallbackMessage: 'is-fallback-message'
		},

		callbacks: {
			init: function(data){},
			willDestory: function(data){},
			afterValidation: function(data){}
		},

		markup: {
			inputErrorBox: '<div class="form__error" />',
			errorMessage: '<small />'
		}
	};

	// default plugin constructor
	function Plugin( element, options ) {
		this.element = element;
		this.$el = $(this.element);

		//get options from html
		var optionsFromHTML = this.$el.data();

		//extend defaults with given options and optionsFromHTML
		this.options = $.extend( true, {}, defaults, options, optionsFromHTML ) ;

		this._defaults = defaults;
		this._name = pluginName;

		this.init();
	};

	// plugin implementation
	$.extend(Plugin.prototype, {

		// initialization logic
		init: function () {
			var self = this;
			var o    = self.options;

			// console.log('hello, it´s me', pluginName, self);

			// instance properties
			self.id = this.$el.prop('id') || self.getId();

			// instance layout properties

			// main DOM elements
			self._queryElements();

			//inital calls
			self._disableDefaultValidation();
			self._bindEvents();

			self._checkValidityStates();
			self._updateSubmitButtons();

			window.validationInstance = self;
			window.validationForm = self.element;

			// call callback from options
			self._callback('init');
		},

		/**
		 * Query important component elements from the DOM
		 *
		 * @private
		 */
		_queryElements: function(){
			var self = this;
			var o    = self.options;
			var selectors = o.selectors;

			// find the form element
			self.$form = self.$el.is('form') ? self.$el : $('form', self.$el).first();

			//get all input elements (select etc. needed to be added)
			self.inputElements = $('input, select, textarea', self.$el);

			//get the input and error wrappers
			self.inputBoxes = $(o.selectors.inputBox, self.$el);
			self.inputErrorBoxes = self._getOrCreateErrorBoxes();

			// filter the submit buttons from the forms elements
			self.submitButtons = $(self.$el[0].elements).filter(function(){
				return this.type === 'submit';
			});
		},

		_getOrCreateErrorBoxes: function(){
			var self = this;
			var o    = self.options;

			// parse the error boxes
			var inputErrorBoxes = self.inputBoxes.map(function(i, el){
				var $inputBox = $(el);
				var $inputErrorBox = $(o.selectors.inputErrorBox, el)[0] || $(o.markup.inputErrorBox).appendTo(el)[0];
				
				// create messages from data-attr if needed
				// only one message is possible
				var dataErrorMessage;
				var $errorMessages = $(o.selectors.errorMessages, $inputErrorBox || {});

				if($errorMessages.length === 0 && (dataErrorMessage = $('[data-error-message]', $inputBox).data('error-message')) ){
					$errorMessages = $(o.markup.errorMessage).appendTo($inputErrorBox).first();
					$errorMessages.text( dataErrorMessage );
				}
				return $inputErrorBox;
			});

			return inputErrorBoxes;
		},

		_getInvalidInputs: function(){
			var self = this;
			var o    = self.options;

			return self.inputElements.filter(function(){
				return !this.validity.valid;
			});
		},

		/**
		 * bind essential events for the component
		 * @return {[type]} [description]
		 */
		_bindEvents: function(){
			var self = this;
			var o    = self.options;
			var selectors = o.selectors;

			self.inputElements.on('focusin', function(e){
				self._setInputData(e.target, { userInteracted: true });
			});

			self.inputElements.on('input', function(e){
				self._checkValidityStates(this, e);
				self._updateSubmitButtons();
			});

			self.inputElements.on('change focusout', function(e){
				self._checkValidityStates(this, e);
				self._updateSubmitButtons();
			});

			self.$form.on('reset', function(e){
				self._setInputData(self.inputElements, { userInteracted: false });

				//needs to be checked, after initial values are restored
				setTimeout(function(){
					self._checkValidityStates(self.inputElements, e);
					self._updateSubmitButtons();
				});
			});

			self.$form.on('submit', function(e){
				// console.log(e.type, e);
				self._userSubmitIntent(e);
			});
		},

		_userSubmitIntent: function(e){
			var self = this;
			var o    = self.options;

			var formValid = self.$form[0].checkValidity();

			if( o.sendFormViaAjax ) {
				e.preventDefault();

				if (formValid) {
					self._callback('afterValidation', {validation: true})
				} else {
					self._callback('afterValidation', {validation: false})
				}

			} else {
				//prevent form from being submitted
				!formValid && e.preventDefault();
			}

			self._checkValidityStates(self.inputElements, e);
			self._updateSubmitButtons();

			//scroll first error into view
			self._getInvalidInputs()[0].focus();
		},

		_setInputData: function(_inputElement, setData){
			var self = this;
			var o    = self.options;

			var $inputElement = $(_inputElement);

			// why check for !_inputElement.tagName ??
			if(!_inputElement || (_inputElement.length > 1 && !_inputElement.tagName)){
				$inputElement = _inputElement || self.inputElements;
				$inputElement.each(function(i, el){
					self._setInputData(el, setData);
				});
				return;
			}

			var inputElement = $inputElement[0];
			var currentInputData = $inputElement.data(self.id) || {};

			$inputElement.data(self.id, $.extend(true, currentInputData, setData));
		},

		_checkValidityStates: function(_inputElement, _e){
			var self = this;
			var o    = self.options;

			var inputElement, $inputElement;
			var e = _e || {};

			if(!_inputElement || (_inputElement.length > 1 && !_inputElement.tagName)){
				$inputElement = _inputElement || self.inputElements;
				$inputElement.each(function(i, el){
					self._checkValidityStates(el, e);
				});
				return;
			}

			var $inputElement = $(_inputElement);
			var inputElement = $inputElement[0];
			var isValid = inputElement.validity.valid;

			//do not show error message, while the user is still typing
			if( (!e.type || e.type === 'input') && !isValid){
				// console.info('will NOT update validation UI (user is not done interacting) valid?', isValid, [inputElement], 'e', e.type );
				return
			}

			rAF(function(){
				self._updateValidationUI(inputElement, e);
			});
		},

		_updateValidationUI: function(_inputElement, _e){
			var self = this;
			var o    = self.options;

			var inputElement, $inputElement;
			var e = _e || {};

			if(!_inputElement || (_inputElement.length > 1 && !_inputElement.tagName)){
				$inputElement = _inputElement || self.inputElements;
				$inputElement.each(function(i, el){
					self._checkValidityStates(el, e);
				});
				return;
			}

			var $inputElement = $(_inputElement);
			var inputElement = $inputElement[0];
			var $inputBox = $inputElement.closest(o.selectors.inputBox);
			var $inputErrorBox = $(o.selectors.inputErrorBox, $inputBox || {});

			var index = self.inputBoxes.index($inputBox);
			var validityState = inputElement.validity;
			var isValid = validityState.valid;
			var currentInputData = $inputElement.data(self.id) || {};

			//show inline validation messages
			if(currentInputData.userInteracted || e.type === 'submit'){

				self._updateInputErrorBox($inputErrorBox, $.extend({}, validityState, {
					validationMessage: inputElement.validationMessage
				}));
				

				$inputBox
					.add($inputElement)
					.addClass(o.classes[isValid ? 'valid' : 'invalid'])
					.removeClass(o.classes[!isValid ? 'valid' : 'invalid'])
				;

			} else if(e.type === 'reset') {
				$inputErrorBox
					.attr('hidden', true)
				;

				$inputBox
					.add($inputElement)
					.removeClass(o.classes.invalid)
					.removeClass(o.classes.valid)
				;
			}
		},

		_updateInputErrorBox: function(_inputErrorBox, validityState){
			var self = this;
			var o    = self.options;

			var $errorMessagesToShow;
			var $inputErrorBox = $(_inputErrorBox);
			var $errorMessages = $(o.selectors.errorMessages, $inputErrorBox || {});
			var groupedValidityStates = self.getValidationStateGrouped(validityState);

			// hide old messages
			$errorMessages.attr('hidden', true);

			// filter messages to show by their given types and the currently "active" errors
			$errorMessagesToShow = $errorMessages.filter(function(){
				var errorMessageTypes = ($(this).data('errorTypes') || '').split(' ');
				var errorMessageWasMatched = false;
				
				errorMessageTypes.forEach(function(errorMessageType){
					errorMessageWasMatched = errorMessageWasMatched || groupedValidityStates.activeStates.indexOf(errorMessageType) !== -1
				});
				
				return errorMessageWasMatched
			});

			// if invalid and no matching message was found, show the last one as fallback
			if(!validityState.valid && $errorMessagesToShow.length === 0){
				$errorMessagesToShow = $errorMessages.last();

				if($errorMessagesToShow.length === 0 || $errorMessagesToShow.hasClass(o.classes.fallbackMessage) ) {
					var firstErrorType = groupedValidityStates.activeStates[0];

					$errorMessagesToShow = $(o.markup.errorMessage);

					$errorMessagesToShow
						.attr('data-error-types', firstErrorType)
						.addClass(o.classes.fallbackMessage)
						.prependTo($inputErrorBox)
						.text( o.errorMessages[firstErrorType] || o.errorMessages['defaultMessage'] || console.error('No Message found') )
					;
				}
			}

			// show matched error messages
			$errorMessagesToShow
				.first()
				.attr('hidden', false)
			;

			//hide/show box and render error types
			$inputErrorBox
				.attr('data-current-error-types', groupedValidityStates.activeStates.join(' '))
				.attr('hidden', validityState.valid)
			;
		},

		getValidationStateGrouped: function(validityState){
			var self = this;
			var o    = self.options;

			var groupedValidityStates = {
				valid: validityState.valid,
				activeStates: [],
				inactiveStates: []
			};

			for (var validityError in validityState) {
				if(validityState[validityError] === true){
					groupedValidityStates.activeStates.push(validityError);
				} else {
					groupedValidityStates.inactiveStates.push(validityError);
				}
			}

			return groupedValidityStates;
		},

		/**
		 * disables the default validation, to show custom error messages
		 * @return {[type]} [description]
		 */
		_disableDefaultValidation: function(){
			var self = this;
			var o    = self.options;

			self.$el.prop('noValidate', true);

			if(o.disableAutocompletion){
				self.$el.prop('autocomplete', 'off');
			}
		},

		_updateSubmitButtons: function(){
			var self = this;
			var o    = self.options;

			var formValid = self.$form[0].checkValidity();

			//disable the submit button (optional)
			if(o.disableSubmitButtons){
				self.submitButtons.prop('disabled', !formValid);
			}

			//set disabled class to disable the button visually
			self.submitButtons[!formValid ? 'addClass' : 'removeClass'](o.classes.disabled);
		},

		/**
		 * namespaces the event names (whitespace seperated)
		 * @public
		 * @return {string} namespaced events
		 */
		nsEvent: function(_events){
			var self = this;

			if(!_events) {
				return console.error('_namespacedEvents | events parameter was empty');
			}

			return _events.split(' ').map(function(eventName){
				return eventName + '.' + self.id
			}).join(' ');
		},

		/**
		 * calls callbacks from the options and checks their validity before
		 *
		 * @param  {String}	callbackName name of the callback function to call
		 * @return {Any}	returns what the callback returns
		 */
		_callback: function(callbackName, data){
			var self = this;
			var o    = self.options;

			//check if callback name is valid
			if(!(callbackName in this._defaults.callbacks)){
				return console.error(pluginName, "illegal callback name", callbackName);
			}

			//call and return callbacks return value
			return o.callbacks[callbackName](data);
		},

		destroy: function(){
			self._callback('willDestory');
		},

		//generates a random UUID in plugin namespace
		getId: (function(){
			function s4() {
				return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
			}
			return function(subNamespace){
				var namespace = subNamespace ? pluginName + '_' + subNamespace : pluginName;
				return [namespace, s4(),s4(),s4(),s4()].join('-');
			}
		}())
	});

	// lightweight plugin wrapper around the constructor, preventing against multiple instantiations
	$.fn[pluginName] = function ( options ) {
		return this.each(function () {
			//check if plugin was already initialized on this element
			if (!$.data(this, pluginName)) {
				// initialize plugin on this element and save reference to instance in data
				$.data(this, pluginName, new Plugin( this, options ));
			}
		});
	};

})( jQuery, window, document );