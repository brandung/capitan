# Capitan linter
Linitng your private assets.

## ESLint
Linting your JavaScript files with ESLinter.  

|   |   |
|---|---|
Task | grunt/tasks/eslint.js
Rules | grunt/linter/.eslintrc
Used Plugin | https://www.npmjs.com/package/grunt-eslint
Rule List| http://eslint.org/docs/rules/

## HMTL Hint
Linting your generated HTML files **except** the _modules.html.  

|   |   |
|---|---|
Task | grunt/tasks/htmlhintplus.js
Rules | grunt/linter/.htmlhintrc
Used Plugin | https://github.com/poppinlp/grunt-htmlhint-plus
Rule List| https://github.com/yaniswang/HTMLHint/wiki/Rules

## Stylelint
Linting SASS Files via postcss task.

|   |   |
|---|---|
Task | grunt/tasks/postcss.js
Rules | grunt/linter/.stylelintrc
Used Plugins | https://github.com/poppinlp/grunt-htmlhint-plus, https://www.npmjs.com/package/stylelint-scss, https://github.com/postcss/postcss-scss, https://github.com/postcss/postcss-reporter
Rule List| https://github.com/stylelint/stylelint/blob/master/docs/user-guide/rules.md