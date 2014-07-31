# transcluder

> Another Angular directive to help with multiple transclusion within a single directive.

## Usage

You can install this plugin with either [Bower](http://bower.io/) or [NPM](https://www.npmjs.org/).

### Bower
```shell
bower install transcluder --save-dev
```

### NPM
```shell
npm install transcluder --save-dev
```

Then just include the *transcluder* module in your Angular application like so:

```js
angular.module('myAngularApp', ['transcluder']);
```

## Overview
The transcluder directive enables more powerful and better organized directive templates.

Consider the following 'foobar' directive template and its use of the transcluder:
```html
<div transcluder class="foobar">
  <div class="styled-header" transclude-header></div>
  <hr/>
  <transclude-content></transclude-content>
</div>
```

Assume that another component were to use the 'foobar' directive as follows:
```html
<foobar>
  <h1 transclude="foote-header">Foobar</h1>
  <p transclude="foote-content">Lorem ipsum.</p>
</foobar>
```

The transcluder would automatically convert the above into the following:
```html
<div transcluder class="foobar">
  <h1 class="styled-header">Foobar</h1>
  <hr/>
  <p>Lorem ipsum.</p>
</div>
```

Please note the parent directive must specific transclude:true flag or this directive will error. For the above example, that means the 'foobar' directive might look like this:
```js
angular.module('foobar', []).directive('foobar',
  function() {
    return {
      templateUrl: 'path/to/foobar.html',
      restrict: 'E',
      transclude: true
    };
  }
);
```
