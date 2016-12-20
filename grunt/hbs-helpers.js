/**
 * hbs-helpers.js
 */

var Handlebars = require('handlebars');

/**
 * getJsonContext
 *
 * return parsed JSON
 */
Handlebars.registerHelper('getJsonContext', function(data, options) {
   return options.fn(JSON.parse(data));
});
