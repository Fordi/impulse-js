/*jslint browser:true */
var iMpulse = (function () {
	"use strict";
	if (!window.jQuery) {
		throw new Error("iMpulseJS requires jQuery 1.9 or greater");
	}
	var iMpulse = {},
		events = {},
		stream = null;
	iMpulse.state = {
		mode: null
	};
	iMpulse.init = function () {
		if (stream) return;
		stream = new iMpulse.Stream();
		iMpulse.start();
	};
	iMpulse.on = function (key, type, context, callback) {
		if (!callback) {
			callback = context;
			context = window;
		}
		var id = key.toLowerCase() + ':' + type.toLowerCase();
		if (!events[id]) {
			events[id] = {};
		}
		events[id][callback] = [context, callback];
	};
	iMpulse.off = function (key, type, callback) {
		var id = key.toLowerCase() + ':' + type.toLowerCase();
		if (!callback) {
			events[id] = {};
		} else {
			delete events[id][callback];
		}
	};
	function triggerInternal(id, key, type) {
		var cbid, call;
		if (!events[id]) { return; }
		for (cbid in events[id]) {
			if (events[id].hasOwnProperty(cbid)) {
				call = events[id][cbid];
				if (false === call[1].call(call[0], key, type, new Date())) { return false; }
			}
		}
	}
	iMpulse.trigger = function (key, type, timestamp) {
		var cbid, call,
			id = key.toLowerCase() + ':' + type.toLowerCase();
		timestamp = timestamp || +new Date();
		if (false === triggerInternal(id, key, type, timestamp)) { return; }
		if (false === triggerInternal('any:' + type, key, type, timestamp)) { return; }
		if (false === triggerInternal('any:any', key, type, timestamp)) { return; }
	};
	function poll() {
		if (!stream.length && iMpulse.pollingHandle) {
			clearInterval(iMpulse.pollingHandle);
			iMpulse.pollingHandle = null;
			return;
		}
		var i, setMode,
			events = stream.flushEvents();
		for (i = 0; i < events.length; i += 1) {

			if (events[i].impliedMode && iMpulse.state.mode !== events[i].impliedMode) {
				iMpulse.state.mode = events[i].impliedMode;
				setMode = true;
			}
			if (events[i].handedness && iMpulse.state.handedness !== events[i].handedness) {
				iMpulse.state.handedness = events[i].handedness;
				setMode = true;
			}
			if (events[i].player && iMpulse.state.player !== events[i].player) {
				iMpulse.state.player = events[i].player;
				setMode = true;
			}
			if (setMode) {
				iMpulse.trigger('MODE', 'SET');
			}
			if (events[i].event === "UP") {
				delete iMpulse.state[events[i].key];
			}
			if (events[i].event === "DOWN") {
				iMpulse.state[events[i].key] = true;
			}
			iMpulse.trigger(events[i].key, events[i].event, +new Date());
		}
	}
	function handleKeyEvents(event) {
		stream.addEvent(event);
		if (!iMpulse.pollingHandle) {
			iMpulse.pollingHandle = setInterval(poll, 33);
		}
	}
	iMpulse.start = function () {
		window.jQuery(window).on('keyup keydown', handleKeyEvents);
	};
	iMpulse.stop = function () {
		window.jQuery(window).off('keyup keydown', handleKeyEvents);
	};
	return iMpulse;
}());