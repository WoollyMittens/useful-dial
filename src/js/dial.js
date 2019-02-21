/*
	Source:
	van Creij, Maurice (2018). "dial.js: A dial for setting a rotation property.", http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

// establish the class
var Dial = function (config) {

	// PROPERTIES

	this.angle = null;
	this.rotation = 0;
	this.frames = null;
	this.face = null;
	this.hub = null;
	this.hand = null;
	this.cover = null;
	this.interaction = false;

	// METHODS

	this.init = function (config) {
		// store the configuration
		this.config = config;
		this.element = config.element;
		// gather up the image frames
		this.frames = this.element.getElementsByTagName('img');
		// check the onrotation handler
		this.config.onrotate = this.config.onrotate || function () {};
		// construct the dial
		this.prepareDial();
		// initial redraw
		this.rotate(this.config.rotation || this.rotation);
		// return the object
		return this;
	};

	this.update = function () {
		// update the images
		this.redrawImages();
		// update the dial
		this.redrawDial();
		// run the change handler
		this.config.onrotate(this.rotation);
	};

	this.redrawImages = function () {
		var a, b, index;
		// for all images
		for (a = 0, b = this.frames.length; a < b; a += 1) {
			// hide the image
			this.frames[a].className = 'dial-passive';
		}
		// show the active frame
		index = Math.round(this.rotation / 360 * (this.frames.length - 1)) + this.config.offset;
		if (this.config.invert) { index = this.frames.length - 1 - index; }
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
		this.element.appendChild(this.face);
		// add the mouse event handlers
		this.face.addEventListener('mousedown', this.onStart.bind(this));
		this.face.addEventListener('mousemove', this.onMove.bind(this, this.face));
		window.addEventListener('mouseup', this.onEnd.bind(this));
		// add the touch event handlers
		this.face.addEventListener('touchstart', this.onStart.bind(this));
		this.face.addEventListener('touchmove', this.onMove.bind(this, this.face));
		window.addEventListener('touchend', this.onEnd.bind(this));
	};

	this.redrawDial = function () {
		// determine the horizontal and vertical component of the rotation
		var horizontal = Math.cos(this.angle) * 50 * this.config.radius + 50;
		var vertical = Math.sin(this.angle) * 50 * this.config.radius + 50;
		// position the dial accordion to the rotation
		this.hand.style.left = horizontal + '%';
		this.hand.style.top = vertical + '%';
	};

	// PUBLIC

	this.rotate = function (rotation) {
		// override the rotation
		this.rotation = rotation;
		this.angle = rotation / 180 * Math.PI;
		// trigger a redraw
		this.update();
	};

	// EVENTS

	this.onStart = function (evt) {
		var context = this;
		// cancel the click
		evt.preventDefault();
		// note the start of the interaction
		this.config.interaction = true;
	};

	this.onMove = function (target, evt) {
		var interaction = {}, center = {}, scrolled = {};
		// if there's interaction
		if (this.config.interaction) {
			// measure the positions
			interaction = positions.cursor(evt, target);
			scrolled = positions.document();
			center.x = target.offsetWidth / 2;
			center.y = target.offsetHeight / 2;
			// determine the relative rotation from the position
			this.angle = Math.atan2((interaction.y - center.y), (interaction.x - center.x));
			this.rotation = (this.angle) ? this.angle * 180 / Math.PI : 270;
			this.rotation = (this.rotation < 0) ? this.rotation + 360 : this.rotation;
			// cancel any dragging shenanigans
			evt.preventDefault();
			// redraw everything
			window.requestAnimationFrame(this.update.bind(this));
		}
	};

	this.onEnd = function (evt) {
		// note the end of the interaction
		this.config.interaction = false;
	};

	this.init(config);

};

// return as a require.js module
if (typeof define != 'undefined') define(['dial'], function () { return Dial });
if (typeof module != 'undefined') module.exports = Dial;
