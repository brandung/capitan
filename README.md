# capitan
Capitan is a Grunt-based, system independent Frontend-Workflow that is built on a flexible component system.

**The main features are:**
* System independent
* Components are self-contained
* Separation between private and public assets

## Short installation guide
1. Copy the repo to your local folder
2. ``npm install``
3. For first initialisation of your project type:
``grunt project:init``
4. Choose your destination system (per default *TYPO3* or *web applikation*)
5. Start your work...

## More *capitan* Tasks
Task | Desc
--- | ---
grunt project:serve | Task for your daily work (after initialisation)
grunt project:lint | Lint your html, sass and private js files
grunt project:finish | Uglify and concatenate your private assest
grunt create:zip | Zip your applikation
grunt create:component --name=[COMPNAME] | Insert new component
