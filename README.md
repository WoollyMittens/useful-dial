# useful.dial.js: A Rotating Dial

A dial for setting a rotation property.

Try the <a href="http://www.woollymittens.nl/default.php?url=useful-dial">demo</a>.

## How to include the script

The stylesheet is best included in the header of the document.

```html
<link rel="stylesheet" href="./css/useful-dial.css"/>
```

This include can be added to the header or placed inline before the script is invoked.

```html
<script src="./js/useful-dial.js"></script>
```

To enable the use of HTML5 tags in Internet Explorer 8 and lower, include *html5.js*.

```html
<!--[if lte IE 9]>
	<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
```

## How to start the script

```javascript
var dial = new useful.Dial().init({
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
+ `gulp prod` - Builds the project for deployment purposes.
+ `gulp watch` - Continuously recompiles updated files during development sessions.
+ `gulp serve` - Serves the project on a temporary web server at http://localhost:8000/ .

## License

This work is licensed under a Creative Commons Attribution 3.0 Unported License. The latest version of this and other scripts by the same author can be found at http://www.woollymittens.nl/
