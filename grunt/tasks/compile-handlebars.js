/**
 * Compile handlebar templates, outputting static HTML
 *
 * https://www.npmjs.com/package/grunt-compile-handlebars
 */
module.exports = {
  globbedTemplateAndOutput: {
    files: [{
         expand: true,
         cwd: '<%= Config.PRIVATE_DIR %>/templates/views',
         src: '**/*.hbs',
         dest: '<%= Config.PRIVATE_DIR %>/templates/',
         ext: '.html'
     }],
	 helpers: './grunt/hbs-helpers.js',
     partials: [
       '<%= Config.PRIVATE_DIR %>/templates/partials/**/*.hbs',
       '<%= Config.PRIVATE_DIR %>/component/**/*.hbs'
     ]
   }
}
