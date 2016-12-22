![GitHub Logo](/hbp/capitan.png)

# Introduction
## What is capitan?
Capitan is a Grunt-based, system independent Frontend-Workflow that is built on a flexible component system.

The main features are:

* System independent
* Components are self-contained
* Separation between private and public assets
* Mobile first
* loading assets on demand for better performance
* Automatically generated styleguide

Frontend Stack:

* nodejs
* Grunt
* Vanilla JS
* swig or handlebars.js (Template-Engine)
* basket.js (Store files in localstorage)
* importer.js (Load components on demand)
* AngularJS
* jQuery
* SASS
* BEM (CSS naming convention)
* PostCSS (grunt task for post processing CSS e.g. autoprefixer, pixrem, stylelint)
* BrowserSync (syncronised browser testing)
* ESLinter (Javascript linter)
* HTMLHint (validate HTML markup)

# Getting started

## Installation

1. Copy repository from https://github.com/brandung/capitan to your local folder
2. run ```npm install```

## Start a new project

1. For first initialization of your project type: **```grunt project:init```**
2. Choose your destination system (standardized structure with "src" and "dist" folders is the default system)
3. Browsersync opens up the components page ([styleguide](#styleguide))
4. Start your work

## Start working on an existing project

1. To start Browsersync type: **```grunt project:serve```**
2. Browser Sync opens up the components page
3. Start your work

# Tasks

These are the most common capitan tasks

Task | Description
------------ | -------------
grunt project:init | Initialize project
grunt project:serve | Task for your daily work (after initialisation)
grunt project:finish | Uglify and concatenate your private assets
grunt create:component --name=[COMPNAME] | Create new component
grunt create:zip | Zip your application
grunt create:styleguide | Reads the variables from the Sass Variables-Partial and transports them into the template partials that are part of the components page
grunt project:lint | Lint your html, sass and private js files
grunt update:grunt | <p>Donwloads the latest workflow files from github and copies them into the corresponding folders. Excluding the following folders:</p><ul><li>hbp</li><li>.gitignore</li><li>LICENSE</li><li>README.md</li><li>grunt/*.js</li><li>grunt/systems"</li></ul>

# Folder structure

Folder name | Description
------------ | -------------
component | Your project components
js | Global javascript files
sass | Global sass files
templates | Global template files

## *component*

All your components will be placed here. Components are **self-contained**, meaning that the component folder contains everything the component needs to be displayed correctly.

When you run the create component task a folder with the name you specified will be created inside the component folder. The created folder will look like this:  

```
[COMPNAME]
├──[COMPNAME].tpl 
├──[COMPNAME].scss
```

Furthermore this task will append the component template to the components page and create an Importer entry in the global.js file (see [Global JS](#globaljs)).

A more complex component including JS and 3rd party files can look like this:

```
[COMPNAME]
├──[COMPNAME].tpl 
├──[COMPNAME].scss
├──[COMPNAME].js
├──js
├────libs
├──────vendor
├────────[LIBNAME]
├──────────[LIBNAME].min.css
├──────────[LIBNAME].min.js
```

If you have a component JS file or additional vendor files, you have to add them to the Importer entry.
The compiled component files will be placed in the directory that is specified in the global.js file. Vendor files will be copied to that directory (see [Global JS](#globaljs)):

* ```[PUBLIC-PATH] + 'components/[COMPONENT-NAME]/component.js'```
* ```[PUBLIC-PATH] + 'components/[COMPONENT-NAME]/component.css'```
* ```[PUBLIC-PATH] + 'js/libs/vendor/[LIBNAME]/[LIBNAME].min.js'```
* ```[PUBLIC-PATH] + 'js/libs/vendor/[LIBNAME]/[LIBNAME].min.css'```

Components are bringing several advantages:

**dependency injection**
* only use component if needed

**portability**
* can be copied over to another project

**overview**
* all relevant files are in one place
* dependency on third party or global files

## *js*

The global.js file and the function, util, handle folders are located here. Functions, Utils and Handles are Scripts that are not bound to a specific component.

They are stored in the Capitan.Function, Capitan.Util and Capitan.Handle objects and can be used globally. The getBreakpoint-Function for example, returns the current breakpoint based on the window with (Capitan.Function.getBreakpoint()).

```
function
├──...
util
├──...
handle
├──...
global.js
```

## *sass*

The core Sass files folder. Beside others the Variables Sass-File is part of the partials folder. Capitan uses the normalize, html5 boilerplate and bootstrap grid system libraries which are placed inside the vendor folder. Styles that should be loaded on every page are defined inside the main.scss file.
  
Most of the time you should include your components through the importer to keep the main.css file size low. But if you have a component that needs to be styled right from the start (like the main navigation), you can add it to the main.css file and remove it from the global.js. This way its styles will not be loaded asynchronously, but compiled into the main.css file.

This makes sense if you have a component that is visible above the fold and you want its styles to be applied instantly.

```
partials
├──...
vendor
├──...
main.scss
```

## *templates*

```
tpl
├──partials
├──modules.tpl

_modules.html
```

# <a name="styleguide">Styleguide</a>

Capitan generates a styleguide for you. Colors, breakpoints and icons that are defined in the Sass Variables-Partial (sass/partials/_variables.scss) will be generated into your styleguide.

This process is part of the ```grunt project:init``` and ```grunt project:serve``` tasks. It reads the variables and transports them into the template partials that are part of the components page. While running the ```grunt project:serve``` task, your styleguide will automatically be updated if changes are made.

If you just want to generate the styleguide you can use the ```grunt create:styleguide``` Task.
 
## Widget

The Styleguide-Widget is located at the right side of the components page and provides a better overview of your components. Its features are:

* Hide/ show components (all at once or one by one)
* Display a grid overlay
* List all your components inside a sidebar

For further information and functionality visit: https://github.com/brandung/bra_styleguide-widget

# <a name="globaljs">Global JS</a>

## Importer
The importer inserts your components into the page based on the conditions you set for your component. 
```
Capitan.Util.loadComponents = function () {
    $.import([
        {
            condition: true,
            order: 0,
            fetch: [
                [PUBLIC-PATH] + 'components/[COMPONENT-NAME]/component.js',
                [PUBLIC-PATH] + 'components/[COMPONENT-NAME]/component.css'
            ],
            callback: [
                {
                    method: function () {
                        console.log('All dependencies have been loaded');
                    }
                }
            ],
            unique: '<@unique@>'
        }
    ]);
}
```

Option | Description | Possible Values
------------ | ------------- | ------------- 
condition | Condition that defines if a component should be imported | **true**: always import component<br>**jQuery Object**:<br>import component if specific element is present<br>**custom function:**<br>import component if function returns true
order | defines in which order the components should be loaded | Number
fetch | all the files that should be imported | Array
callback | fires when all component files have been successfully imported |
unique | timestamp for the component | Number

The import.js Github Repository: https://github.com/Webastronaut/import

## Bundles
The importer loads JS and CSS files on demand, so if you have components that depend on multiple files it is a good idea to combine those files into a bundle. This **reduces the amount of requests**.

Bundles are generated through the ```grunt project:finish``` task.

Example bundle:
```
// <@bundle#before-render
Capitan.Vars.folderPath + 'js/util/console-polyfill.js',
Capitan.Vars.folderPath + 'js/util/inject-smartresize.js',
Capitan.Vars.folderPath + 'js/function/assert-breakpoint.js',
Capitan.Vars.folderPath + 'js/function/get-breakpoint.js',
Capitan.Vars.folderPath + 'js/function/get-orientation.js',
Capitan.Vars.folderPath + 'js/function/get-computed-style.js',
Capitan.Vars.folderPath + 'js/function/get-browser-version.js',
Capitan.Vars.folderPath + 'js/function/get-viewport.js',
Capitan.Vars.folderPath + 'js/util/set-breakpoints.js',
Capitan.Vars.folderPath + 'js/handle/set-event-class.js',
Capitan.Vars.folderPath + 'js/handle/resize-handler.js'
// bundle@>
```

In this example the bundle file will be placed under
```
[PUBLIC]
├──js
├────bundle
├──────before-render-bundle.js
```
and the requests are reduced from two to one single request.

**IMPORTANT:** A bundle can not contain JS and CSS files at the same time. Those have to be put into separate bundles. 

## Recurring dependencies
If you have components that share the same dependencies you can add an import to the *fetchBeforeRender* method.

```
Capitan.Util.fetchBeforeRender = function () {
    return $.import([
        {
            ...
        },
        {
            condition: [$('.need-component-1'), $('.need-component-2'), $('.need-component-3')],
            fetch: [
                [PUBLIC-PATH] + 'components/[COMPONENT-NAME]/component.js',
                [PUBLIC-PATH] + 'components/[COMPONENT-NAME]/component.css'
            ],
            unique: '<@unique@>'
        }
    ], false);
};
```

# Functions, Utils and Handles
Functions, Utils and Handles are the first scripts loaded by the Importer in the fetchBeforeRender-Function (before the DOM is ready). This makes sure that they are available within our components. These scripts will be loaded globally on every page.
 
 * **Functions:** Function-Scripts are small modules with only one task and a single return value
 * **Utils:** A Util can be used for the initialisation of polyfills or plugins that are needed globally 
 * **Handles:** They handle global events like window resize or scroll events inside the document 

# Annotations
The following annotation can be used as a marker or to run additional actions within a task.

Annotation | File type | Connected task | Description
------------ | ------------- | ------------ | -------------
<@delete/<br>delete@> | js<br>scss | grunt project:finish | deletes the code within these annotation   
<@unique@> | js | grunt project:finish | gets replaced by a timestamp for the importer     
<@bundle#[BUNDLE_NAME]/<br>bundle@>  | js | grunt project:finish | combines JS or CSS files into a bundle file under the given name and includes it in the main.js file     
<@newComponent@> | tpl<br>js | grunt create:component | marker to insert new component into global.js and _modules.tpl

# Systems
For every system like Wordpress or Magento a custom JSON-file can be applied. All systems are located in the **grunt/systems/** folder. The default, TYPO3 and ZEND system are already part of the capitan workflow.

## Add a new system
If you want to add your own system file you can take one of the existing systems as a starting point.

```
{
    "folder": [
        "src/private/frontend",
        "src/public/component",
        "src/public/css",
        "src/public/fonts",
        "src/public/img/",
        "src/public/js/libs/bra",
        "src/public/js/libs/vendor"
    ],
    "private": "src/private/frontend",
    "public": "src/public",
    "liveURL": "",
    "route": {}
}
```

### System folders
Inside the folder array you can specify the folders that should be created when running the init task.

```
{
    "folder": []
}
```

### Private folder
The folder where your private files should be placed. The init task will copy the default workflow files and folders here. 

```
{
    "private": ""
}
```

### Public folder
The folder where your compiled private files will be generated. 

```
{
    "public": ""
}
```

### Live URL
Here you can set the project path for the live server.

```
{
    "liveURL": ""
}
```

### Route
If your live server paths differ from your local project paths, you can set routes to map those paths correctly.

```
{
    "route": {
        "[LOCALPATH]/Resources": "Resources/"
    }
}
```
