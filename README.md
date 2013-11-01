# useful.dial.js: A Rotating Dial

A dial for setting a rotation property.

Try the <a href="http://www.woollymittens.nl/useful/default.php?url=useful-dial">demo</a>.

## How to use the script

The stylesheet is best included in the header of the document.

```html
<link rel="stylesheet" href="./css/dial.css"/>
```

This include can be added to the header or placed inline before the script is invoked.

```html
<script src="./js/dial.min.js"></script>
```

To enable the use of HTML5 tags in Internet Explorer 8 and lower, include *html5.js*. To provide an alternative for *document.querySelectorAll* and CSS3 animations in Internet Explorer 8 and lower, include *jQuery*.

```html
<!--[if lte IE 9]>
	<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<![endif]-->
```

## How to start the script

This is the safest way of starting the script, but allows for only one target element at a time.

```javascript
var dial = new useful.Dial( document.getElementById('exampleDial'), {
	'offset' : 13,
	'invert' : true,
	'radius' : 0.77,
	'onrotate' : function (rotation) {}
});
dial.start();
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

## License
This work is licensed under a Creative Commons Attribution 3.0 Unported License. The latest version of this and other scripts by the same author can be found at http://www.woollymittens.nl/
