/**
 * hbs-helpers.js
 */

var Handlebars = require('handlebars');

/**
 * getJsonContext
 *
 * Parse string into JSON data
 *
 * @param data
 * @param options
 * @returns parsed JSON
 */
Handlebars.registerHelper('getJsonContext', function(data, options) {
   return options.fn(JSON.parse(data));
});


/**
 * ifCond
 *
 * If conditions with Handlebars
 *
 * @param condition 1
 * @param operator
 * @param condition 2
 * @param options
 * @returns boolean
 */
Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});
