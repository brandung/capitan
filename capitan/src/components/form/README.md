# Capitan ``form`` component

* [1. Component](#1-component)
* [2. Partials](#2-partials)
  * [Input Partial](#input-partial)
  * [Select Partial](#select-partial)
  * [Textarea Partial](#textarea-partial)
* [3. Template Example](#3-template-example)
* [4. Validation Script](#4-validation-script)

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
| ``errorMsg``  | * | String: if set, individual error message can be set (only works with ``validate.js`` |

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
| ``errorMsg``  | * | String: if set, individual error message can be set (only works with ``validate.js`` |
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
| ``errorMsg``  | * | String: if set, individual error message can be set (only works with ``validate.js`` |


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

## 4. Validation Script
Some short informations to handle the validation script. (``/js/libs/bra/bra_validate/validate.js``)
The script will only initialized, if ``date-validate`` attribute of the parent form container with class ``.form`` has been set to ``true``.

**Markup for error box**
* The markup for the *form__error* box will be automatically rendered by script into the template
* you have the chance to set the markup and error messages individual within the handlebars partial. If you use this method be sure you use the right marup (see below). The script then only show or hide the default error message.

```
<div class="form__error">
  <small>{{errorMsg}}<small/>
</div>
```


