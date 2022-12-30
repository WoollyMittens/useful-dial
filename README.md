# dial.js: A Rotating Dial

A dial for setting a rotation property.

## How to include the script

The stylesheet is best included in the header of the document.

```html
<link rel="stylesheet" href="./css/dial.css"/>
```

This include can be added to the header or placed inline before the script is invoked.

```html
<script src="lib/positions.js"></script>
<script src="js/dial.js"></script>
```

Or use [Require.js](https://requirejs.org/).

```js
requirejs([
	'lib/positions.js',
	'js/dial.js'
], function(positions, Dial) {
	...
});
```

Or import into an MVC framework.

```js
var positions = require('lib/positions.js');
var Dial = require('js/dial.js');
```

## How to start the script

```javascript
var dial = new Dial({
	'element' : document.getElementById('exampleDial'),
	'offset' : 13,
	'invert' : true,
	'radius' : 0.77,
	'onrotate' : function (rotation) {}
});
```

**offset : {integer}** - An offset to fine-tune the animation frames to the dial.

**invert : {boolean}** - Controls if the rotation is clockwise or anti-clockwise.

**radius : {float}** - The distance of the hand of the dial to the centre the face.

**onrotate : {function}** - A function that is run whenever the control is rotated.

## How to control the script

### Update

```javascript
dial.rotate(angle);
```

**angle : {degrees}** - The desired rotation in degrees.

Adjust the rotation frame.

## How to build the script

This project uses node.js from http://nodejs.org/

This project uses gulp.js from http://gulpjs.com/

The following commands are available for development:
+ `npm install` - Installs the prerequisites.
+ `gulp import` - Re-imports libraries from supporting projects to `./src/libs/` if available under the same folder tree.
+ `gulp dev` - Builds the project for development purposes.
+ `gulp dist` - Builds the project for deployment purposes.
+ `gulp watch` - Continuously recompiles updated files during development sessions.
+ `gulp serve` - Serves the project on a temporary web server at http://localhost:8500/.
+ `gulp php` - Serves the project on a temporary php server at http://localhost:8500/.

## License

This work is licensed under a [MIT License](https://opensource.org/licenses/MIT). The latest version of this and other scripts by the same author can be found on [Github](https://github.com/WoollyMittens) and at [WoollyMittens.nl](https://www.woollymittens.nl/).
