# Capitan ``form`` component

* [1. Component](#1-component)
* [2. Partials](#2-partials)
  * [Input Partial](#input-partial)
  * [Select Partial](#select-partial)
  * [Textarea Partial](#textarea-partial)
* [3. Template Example](#3-template-example)
* [4. Validation Plugin](#4-validation-plugin)

## 1. Component
First include component as followed and set the validation option if needed (Use handlebars 'inline partial'-syntax to overwrite default block content): 

```javascript
{{#> form }}
  	{{#*inline "form-block"}}
  	...
  	{{/inline}}
{{/form}}
```

#### Parameters

| Parameter | Value | Description |
| -------- | -------- | -------- |
| ``method`` | 'get' or 'post'| String: default value is 'get' |
| ``action`` | URL | String: default value is '/' |
| ``class``   | form--transition | String: Set ``label`` tags as placeholders and animate them on focus |
| ``validate`` | true | Boolean: If set, formfields with ``required`` attribute will be validate with client script |


## 2. Partials

### Input Partial
```javascript
{{> input class="col-md-6" id="text" label="Input label " placeholder="Placeholder Text" }}
```

#### Parameters

| Parameter | Value | Description |
| -------- | -------- | -------- |
| ``class`` | 'col-' + * | String: define the field width by 'col-' class selectors |
| ``type`` | text, date, email, password, number | String: default value ist type='text' |
| ``id`` | * | String |
| ``name`` | * | String |
| ``label`` | * | String |
| ``value`` | * | String |
| ``title`` | * | String |
| ``placeholder`` | * | String |
| ``disabled`` | true | Boolean: if set, input is disabled  |
| ``checked`` | true | Boolean: if set, input is checked  |
| ``required`` | true | Boolean: if set, input will be validate  |
| ``pattern`` | * | String: RegEx String for validation  |
| ``errorMsg``  | * | String: if set, individual error message can be set (no multiple messages possible. [See Validation Plugin](#4-validation-plugin)) |

### Select Partial
```
{{#getJsonContext
    '{
      "options": [
        {"text": "Bitte wählen", "selected": true},
        {"value": "0", "text": "Option 1"},
        {"value": "1", "text": "Option 2"}
      ]
    }'
}}
  {{> select this class="col-md-12" id="select" label="Select" }}
{{/getJsonContext}}
```
Info: Use capitan handlebars helper *getJsonContext* to set option values

#### Parameters

| Parameter | Value | Description |
| -------- | -------- | -------- |
| ``class`` | 'col-' + * | String: define the field width by 'col-' class selectors |
| ``id`` | * | String |
| ``name`` | * | String |
| ``label`` | * | String |
| ``title`` | * | String |
| ``disabled`` | true | Boolean: if set, input is disabled  |
| ``required`` | true | Boolean: if set, input will be validate  |
| ``errorMsg``  | * | String: if set, individual error message can be set (no multiple messages possible. [See Validation Plugin](#4-validation-plugin)) |
| ``selected`` | true | Boolean: only for ``option`` tag  |
| ``text`` | * | String: only for ``option`` tag  |
| ``value`` | * | String: only for ``option`` tag  |

### Textarea Partial
```
{{> textarea class="col-md-12" id="textarea" label="Textarea" placeholder="Placeholder Text" }}	
```

#### Parameters

| Parameter | Value | Description |
| -------- | -------- | -------- |
| ``class`` | 'col-' + * | String: define the field width by 'col-' class selectors |
| ``id`` | * | String |
| ``name`` | * | String |
| ``label`` | * | String |
| ``title`` | * | String |
| ``disabled`` | true | Boolean: if set, input is disabled  |
| ``required`` | true | Boolean: if set, input will be validate  |
| ``errorMsg``  | * | String: if set, individual error message can be set (no multiple messages possible. [See Validation Plugin](#4-validation-plugin)) |


## 3. Template Example:
```javascript
{{#> form class="form--transition" validate=true }}
  	{{#*inline "form-block"}}
    <div class="row">
        {{> input class="col-md-6" id="text" label="Input label" placeholder="Placeholder Text" required=true errorMsg="please fill this field correctly" }}
    </div>
    {{/inline}}
{{/form}}
```

## 4. Validation Plugin
Some short informations to handle the validation script. (``/js/libs/bra/bra_validate/validate.js``)
The script will only initialized, if ``data-validate`` attribute of the parent form container with class ``.form`` has been set to ``true``.

**Markup for error box**
* The markup for the *form__error* box will be automatically rendered by script into the template
* You have the chance to set the markup and error messages individual within the handlebars partial. If you use this method be sure you use the right marup (see below). The script then only show or hide the default error message.

*Generated error box (type => value is missing)*
```javascript
<div class="form__error" data-current-error-types="valueMissing">
  <small data-error-types="valueMissing" class="is-fallback-message">valueMissing | please fill this field correctly</small> 
</div>
```

*Markup for individual error box*
```javascript
<div class="form__error">
  <small>{{errorMsg}}<small/>
</div>
```

**Multiple Error Messages**
* It is possible to output multiple error messages. For example, if the pattern mismatch with the given value, an other error message will be shown as the one if the field is empty.
* These function only works, if no individual error messages is set at the handlebars partial (=> data-error-message="{{errorMsg}}")
* See the possible messages within the javascript object below:

```javascript
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
 }
```
