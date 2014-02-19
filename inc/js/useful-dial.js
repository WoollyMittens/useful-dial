/*
	Source:
	van Creij, Maurice (2012). "useful.polyfills.js: A library of useful polyfills to ease working with HTML5 in legacy environments.", version 20121126, http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

(function (useful) {

	// Invoke strict mode
	"use strict";

	// private functions
	var polyfills = polyfills || {};

	// enabled the use of HTML5 elements in Internet Explorer
	polyfills.html5 = function () {
		var a, b, elementsList;
		elementsList = ['section', 'nav', 'article', 'aside', 'hgroup', 'header', 'footer', 'dialog', 'mark', 'dfn', 'time', 'progress', 'meter', 'ruby', 'rt', 'rp', 'ins', 'del', 'figure', 'figcaption', 'video', 'audio', 'source', 'canvas', 'datalist', 'keygen', 'output', 'details', 'datagrid', 'command', 'bb', 'menu', 'legend'];
		if (navigator.userAgent.match(/msie/gi)) {
			for (a = 0 , b = elementsList.length; a < b; a += 1) {
				document.createElement(elementsList[a]);
			}
		}
	};

	// allow array.indexOf in older browsers
	polyfills.arrayIndexOf = function () {
		if (!Array.prototype.indexOf) {
			Array.prototype.indexOf = function (obj, start) {
				for (var i = (start || 0), j = this.length; i < j; i += 1) {
					if (this[i] === obj) { return i; }
				}
				return -1;
			};
		}
	};

	// allow document.querySelectorAll (https://gist.github.com/connrs/2724353)
	polyfills.querySelectorAll = function () {
		if (!document.querySelectorAll) {
			document.querySelectorAll = function (a) {
				var b = document, c = b.documentElement.firstChild, d = b.createElement("STYLE");
				return c.appendChild(d), b.__qsaels = [], d.styleSheet.cssText = a + "{x:expression(document.__qsaels.push(this))}", window.scrollBy(0, 0), b.__qsaels;
			};
		}
	};

	// allow addEventListener (https://gist.github.com/jonathantneal/3748027)
	polyfills.addEventListener = function () {
		!window.addEventListener && (function (WindowPrototype, DocumentPrototype, ElementPrototype, addEventListener, removeEventListener, dispatchEvent, registry) {
			WindowPrototype[addEventListener] = DocumentPrototype[addEventListener] = ElementPrototype[addEventListener] = function (type, listener) {
				var target = this;
				registry.unshift([target, type, listener, function (event) {
					event.currentTarget = target;
					event.preventDefault = function () { event.returnValue = false; };
					event.stopPropagation = function () { event.cancelBubble = true; };
					event.target = event.srcElement || target;
					listener.call(target, event);
				}]);
				this.attachEvent("on" + type, registry[0][3]);
			};
			WindowPrototype[removeEventListener] = DocumentPrototype[removeEventListener] = ElementPrototype[removeEventListener] = function (type, listener) {
				for (var index = 0, register; register = registry[index]; ++index) {
					if (register[0] == this && register[1] == type && register[2] == listener) {
						return this.detachEvent("on" + type, registry.splice(index, 1)[0][3]);
					}
				}
			};
			WindowPrototype[dispatchEvent] = DocumentPrototype[dispatchEvent] = ElementPrototype[dispatchEvent] = function (eventObject) {
				return this.fireEvent("on" + eventObject.type, eventObject);
			};
		})(Window.prototype, HTMLDocument.prototype, Element.prototype, "addEventListener", "removeEventListener", "dispatchEvent", []);
	};

	// allow console.log
	polyfills.consoleLog = function () {
		if (!window.console) {
			window.console = {};
			window.console.log = function () {
				// if the reporting panel doesn't exist
				var a, b, messages = '', reportPanel = document.getElementById('reportPanel');
				if (!reportPanel) {
					// create the panel
					reportPanel = document.createElement('DIV');
					reportPanel.id = 'reportPanel';
					reportPanel.style.background = '#fff none';
					reportPanel.style.border = 'solid 1px #000';
					reportPanel.style.color = '#000';
					reportPanel.style.fontSize = '12px';
					reportPanel.style.padding = '10px';
					reportPanel.style.position = (navigator.userAgent.indexOf('MSIE 6') > -1) ? 'absolute' : 'fixed';
					reportPanel.style.right = '10px';
					reportPanel.style.bottom = '10px';
					reportPanel.style.width = '180px';
					reportPanel.style.height = '320px';
					reportPanel.style.overflow = 'auto';
					reportPanel.style.zIndex = '100000';
					reportPanel.innerHTML = '&nbsp;';
					// store a copy of this node in the move buffer
					document.body.appendChild(reportPanel);
				}
				// truncate the queue
				var reportString = (reportPanel.innerHTML.length < 1000) ? reportPanel.innerHTML : reportPanel.innerHTML.substring(0, 800);
				// process the arguments
				for (a = 0, b = arguments.length; a < b; a += 1) {
					messages += arguments[a] + '<br/>';
				}
				// output the queue to the panel
				reportPanel.innerHTML = messages + reportString;
			};
		}
	};

	// allows Object.create (https://gist.github.com/rxgx/1597825)
	polyfills.objectCreate = function () {
		if (typeof Object.create !== "function") {
			Object.create = function (original) {
				function Clone() {}
				Clone.prototype = original;
				return new Clone();
			};
		}
	};

	// allows String.trim (https://gist.github.com/eliperelman/1035982)
	polyfills.stringTrim = function () {
		if (!String.prototype.trim) {
			String.prototype.trim = function () { return this.replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, ''); };
		}
		if (!String.prototype.ltrim) {
			String.prototype.ltrim = function () { return this.replace(/^\s+/, ''); };
		}
		if (!String.prototype.rtrim) {
			String.prototype.rtrim = function () { return this.replace(/\s+$/, ''); };
		}
		if (!String.prototype.fulltrim) {
			String.prototype.fulltrim = function () { return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, '').replace(/\s+/g, ' '); };
		}
	};

	// for immediate use
	polyfills.html5();
	polyfills.arrayIndexOf();
	polyfills.querySelectorAll();
	polyfills.addEventListener();
	polyfills.consoleLog();
	polyfills.objectCreate();
	polyfills.stringTrim();

}(window.useful = window.useful || {}));

/*
	Source:
	van Creij, Maurice (2012). "useful.positions.js: A library of useful functions to ease working with screen positions.", version 20121126, http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

(function (useful) {

	// Invoke strict mode
	"use strict";

	// private functions
	var positions = positions || {};

	// find the dimensions of the window
	positions.window = function (parent) {
		// define a position object
		var dimensions = {x : 0, y : 0};
		// if an alternative was given to use as a window
		if (parent && parent !== window) {
			// find the current dimensions of surrogate window
			dimensions.x = parent.offsetWidth;
			dimensions.y = parent.offsetHeight;
		} else {
			// find the current dimensions of the window
			dimensions.x = window.innerWidth || document.body.clientWidth;
			dimensions.y = window.innerHeight || document.body.clientHeight;
		}
		// return the object
		return dimensions;
	};

	// find the scroll position of an element
	positions.document = function (parent) {
		// define a position object
		var position = {x : 0, y : 0};
		// find the current position in the document
		if (parent && parent !== window) {
			position.x = parent.scrollLeft;
			position.y = parent.scrollTop;
		} else {
			position.x = (window.pageXOffset) ?
				window.pageXOffset :
				(document.documentElement) ?
					document.documentElement.scrollLeft :
					document.body.scrollLeft;
			position.y = (window.pageYOffset) ?
				window.pageYOffset :
				(document.documentElement) ?
					document.documentElement.scrollTop :
					document.body.scrollTop;
		}
		// return the object
		return position;
	};

	// finds the position of the element, relative to the document
	positions.object = function (node) {
		// define a position object
		var position = {x : 0, y : 0};
		// if offsetparent exists
		if (node.offsetParent) {
			// add every parent's offset
			while (node.offsetParent) {
				position.x += node.offsetLeft;
				position.y += node.offsetTop;
				node = node.offsetParent;
			}
		}
		// return the object
		return position;
	};

	// find the position of the mouse cursor relative to an element
	positions.cursor = function (event, parent) {
		// get the event properties
		event = event || window.event;
		// define a position object
		var position = {x : 0, y : 0};
		// find the current position on the document
		position.x = event.pageX || event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		position.y = event.pageY || event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		// if a parent was given
		if (parent) {
			// retrieve the position of the parent
			var offsets = positions.object(parent);
			// adjust the coordinates to fit the parent
			position.x -= offsets.x;
			position.y -= offsets.y;
		}
		// return the object
		return position;
	};

	// public functions
	useful.positions = useful.positions || {};
	useful.positions.window = positions.window;
	useful.positions.document = positions.document;
	useful.positions.object = positions.object;
	useful.positions.cursor = positions.cursor;

}(window.useful = window.useful || {}));

/*
	Source:
	van Creij, Maurice (2012). "useful.dial.js: A dial for setting a rotation property.", version 20130510, http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.

	Prerequisites:
	<!--[if IE]>
		<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
	<![endif]-->
*/

(function (useful) {

	// invoke strict mode
	"use strict";

	// private functions
	useful.Dial = function (obj, cfg) {
		// properties
		this.obj = obj;
		this.cfg = cfg;
		this.angle = null;
		this.rotation = 0;
		this.frames = null;
		this.face = null;
		this.hub = null;
		this.hand = null;
		this.cover = null;
		this.interaction = false;
		// methods
		this.start = function () {
			// gather up the image frames
			this.frames = this.obj.getElementsByTagName('img');
			// check the onrotation handler
			this.cfg.onrotate = this.cfg.onrotate || function () {};
			// construct the dial
			this.prepareDial();
			// initial redraw
			this.rotate(this.cfg.rotation || this.rotation);
		};
		this.update = function () {
			// update the images
			this.redrawImages();
			// update the dial
			this.redrawDial();
			// run the change handler
			this.cfg.onrotate(this.rotation);
		};
		this.redrawImages = function () {
			var a, b, index;
			// for all images
			for (a = 0, b = this.frames.length; a < b; a += 1) {
				// hide the image
				this.frames[a].className = 'dial-passive';
			}
			// show the active frame
			index = Math.round(this.rotation / 360 * (this.frames.length - 1)) + this.cfg.offset;
			if (this.cfg.invert) { index = this.frames.length - 1 - index; }
			if (index < 0) { index += this.frames.length; }
			if (index >= this.frames.length) { index -= this.frames.length; }
			if (this.frames[index]) { this.frames[index].className = 'dial-active'; }
		};
		this.prepareDial = function () {
			// create a container
			this.face = document.createElement('div');
			this.face.className = 'dial-face';
			// create the hub
			this.hub = document.createElement('div');
			this.hub.className = 'dial-hub';
			// create the hand
			this.hand = document.createElement('div');
			this.hand.className = 'dial-hand';
			// put together the parts
			this.face.appendChild(this.hub);
			this.face.appendChild(this.hand);
			this.obj.appendChild(this.face);
			// add the mouse event handlers
			this.face.addEventListener('mousedown', this.onStart());
			this.face.addEventListener('mousemove', this.onMove(this.face));
			window.addEventListener('mouseup', this.onEnd());
			// add the touch event handlers
			this.face.addEventListener('touchstart', this.onStart());
			this.face.addEventListener('touchmove', this.onMove(this.face));
			window.addEventListener('touchend', this.onEnd());
		};
		this.redrawDial = function () {
			// determine the horizontal and vertical component of the rotation
			var horizontal = Math.cos(this.angle) * 50 * this.cfg.radius + 50;
			var vertical = Math.sin(this.angle) * 50 * this.cfg.radius + 50;
			// position the dial accordion to the rotation
			this.hand.style.left = horizontal + '%';
			this.hand.style.top = vertical + '%';
		};
		// events
		this.onStart = function () {
			var context = this;
			return function (event) {
				// note the start of the interaction
				context.cfg.interaction = true;
				event.preventDefault();
			};
		};
		this.onMove = function (target) {
			var context = this;
			return function (event) {
				var interaction = {}, center = {}, scrolled = {};
				// if there's interaction
				if (context.cfg.interaction) {
					// measure the positions
					interaction = useful.positions.cursor(event, target);
					scrolled = useful.positions.document();
					center.x = target.offsetWidth / 2;
					center.y = target.offsetHeight / 2;
					// determine the relative rotation from the position
					context.angle = Math.atan2((interaction.y - scrolled.y - center.y), (interaction.x - scrolled.x - center.x));
					context.rotation = (context.angle) ? context.angle * 180 / Math.PI : 270;
					context.rotation = (context.rotation < 0) ? context.rotation + 360 : context.rotation;
					// cancel any dragging shenanigans
					event.preventDefault();
					// redraw everything
					context.update();
				}
			};
		};
		this.onEnd = function () {
			var context = this;
			return function (event) {
				// note the end of the interaction
				context.cfg.interaction = false;
			};
		};
		// external API
		this.rotate = function (rotation) {
			// override the rotation
			this.rotation = rotation;
			this.angle = rotation / 180 * Math.PI;
			// trigger a redraw
			this.update();
		};
	};

}(window.useful = window.useful || {}));