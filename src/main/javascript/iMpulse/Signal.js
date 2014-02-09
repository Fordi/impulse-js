/*jslint browser:true */
(function (iMpulse) {
	"use strict";
	iMpulse.Signal = function Signal(event) {
		if (event.type === 'keydown') {
			this.pressed = true;
		}
		this.keyCode = event.keyCode;
		this.srcEvent = event;
	}
	iMpulse.Signal.prototype.toString = function () {
		return (this.pressed ? 'd' : 'u') + String(this.keyCode);
	};
}(this.iMpulse));