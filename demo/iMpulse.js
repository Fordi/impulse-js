/*jslint browser:true */
var iMpulse = (function () {
	"use strict";
	var state = {
			mode: null
		},
		impulse = {
			state: state,
			handedness: 'RIGHT',
			player: 'P1'
		},
		events = {},
		stream;
	function Signal(event) {
		if (event.type === 'keydown') {
			this.pressed = true;
		}
		this.keyCode = event.keyCode;
		this.srcEvent = event;
	}
	Signal.prototype.toString = function () {
		return (this.pressed ? 'd' : 'u') + new String(this.keyCode);
	};
	function Stream() {
		this.state = {};
	}
	Stream.prototype = [];
	Stream.prototype.addEvent = function (event) {
		this.push(new Signal(event));
	};
	Stream.prototype.toString = function () {
		var i, k,
			t = [],
			state = window.jQuery.extend({}, this.state);
		for (i = 0; i < this.length; i += 1) {
			k = this[i].keyCode;
			if (!!this[i].pressed !== !!state[k]) {
				state[k] = this[i].pressed;
				t.push(this[i].toString());
			}
		}
		return t.join('');
	};
	function PadEvent(arrEventInfo) {
		this.key = arrEventInfo[0];
		this.event = arrEventInfo[1];
		this.impliedMode = arrEventInfo[2];
		this.handedness = arrEventInfo[3];
		this.player = arrEventInfo[4];
	}
	Stream.prototype.flushEvents = function () {
		/*jslint continue:true  */
		var sequence, next, event, i,
			hlEvents = [],
			events = this.toString()
		// Translate event sequences to high-level events
outerLoop:
		while (events.length) {
			for (sequence in Stream.streams) {
				if (Stream.streams.hasOwnProperty(sequence)) {
					if (events.substr(0, sequence.length) === sequence) {
						hlEvents.push(new PadEvent(Stream.streams[sequence]));
						events = events.substr(sequence.length);
						continue outerLoop;
					}
				}
			}
			next = events.match(/^([ud])(\d+)/);
			if (!next) {
				throw new Error('Weird stuff in the event stream' + events);
			}
			//hlEvents.push(new PadEvent([ 'UNK' + next[2], next[1] === 'd' ? 'DOWN' : 'UP', null]));
			events = events.substr(next[0].length);
		}
		//Update state object and clear
		for (i = 0; i < this.length; i += 1) {
			this.state[this[i].keyCode] = this[i].pressed;
		}
		this.length = 0;
		return hlEvents;
	};
	(function () {
		/*jslint white:true */
		Stream.streams = {
			// Mode changes
			'd16d51d54d50d220u16u51u54u50u220' : ['MODE', 'SET', 'UNIVERSAL', 'RIGHT', 'P1'],
			'd16d51d54d49d220u16u51u54u49u220' : ['MODE', 'SET', 'UNIVERSAL', 'RIGHT', 'P2'],
			'd16d51d53d50d220u16u51u53u50u220' : ['MODE', 'SET', 'UNIVERSAL', 'LEFT' , 'P1'],
			'd16d51d53d49d220u16u51u53u49u220' : ['MODE', 'SET', 'UNIVERSAL', 'LEFT' , 'P2'],
			'd16d55d54d50d220u16u55u54u50u220' : ['MODE', 'SET', 'MEDIA'],
			'd16d52d54d50d220u16u52u54u50u220' : ['MODE', 'SET', 'IOS'],
			'd16d56d54d50d220u16u56u54u50u220' : ['MODE', 'SET', 'TV'],
			// Media mode buttons
			'd177'		: ['REV',		'DOWN'],
			'u177'		: ['REV',		'UP'],
			'd176'		: ['FWD',		'DOWN'],
			'u176'		: ['FWD',		'UP'],
			'd16d37'	: ['SCROLL<',	'DOWN'],
			'u16u37'	: ['SCROLL<',	'UP'],
			'd16d39'	: ['SCROLL>',	'DOWN'],
			'u16u39'	: ['SCROLL>',	'UP'],
			// Universal mode buttons.  Do not imply a mode, since we don't get paw information.
			'd38'		: ['UP',		'DOWN'],
			'u38'		: ['UP',		'UP'	],
			'd37'		: ['LEFT',		'DOWN'],
			'u37'		: ['LEFT',		'UP'	],
			'd39'		: ['RIGHT',		'DOWN'],
			'u39'		: ['RIGHT',		'UP'	],
			'd40'		: ['DOWN',		'DOWN'],
			'u40'		: ['DOWN',		'UP'	],
			'd65'		: ['A',			'DOWN'],
			'u65'		: ['A',			'UP'	],
			'd87'		: ['W',			'DOWN'],
			'u87'		: ['W',			'UP'	],
			'd86'		: ['V',			'DOWN'],
			'u86'		: ['V',			'UP'	],
			'd77'		: ['M',			'DOWN'],
			'u77'		: ['M',			'UP'	],
			'd78'		: ['N',			'DOWN'],
			'u78'		: ['N',			'UP'	],
			'd85'		: ['U',			'DOWN'],
			'u85'		: ['U',			'UP'	],
			// TV Mode
			'd27'		: ['ESC',		'DOWN'],
			'u27'		: ['ESC',		'UP'	],
			'd13'		: ['ENTER',		'DOWN'],
			'u13'		: ['ENTER',		'UP'	],
			//Controls shared between TV and Media modes
			'd179'		: ['PLAY',		'DOWN'],
			'u179'		: ['PLAY',		'UP'	],
			'd173'		: ['MUTE',		'DOWN'],
			'u173'		: ['MUTE',		'UP'	],
			'd175'		: ['VOL+',		'DOWN'],
			'u175'		: ['VOL+',		'UP'	],
			'd174'		: ['VOL-',		'DOWN'],
			'u174'		: ['VOL-',		'UP'	]
		};
	}());
	impulse.state = {
		mode: null
	};
	impulse.on = function (key, type, context, callback) {
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
	impulse.off = function (key, type, callback) {
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
	impulse.trigger = function (key, type, timestamp) {
		var cbid, call,
			id = key.toLowerCase() + ':' + type.toLowerCase();
		timestamp = timestamp || +new Date();
		if (false === triggerInternal(id, key, type, timestamp)) { return; }
		if (false === triggerInternal('any:' + type, key, type, timestamp)) { return; }
		if (false === triggerInternal('any:any', key, type, timestamp)) { return; }
	};
	stream = new Stream();
	function poll() {
		if (!stream.length && impulse.pollingHandle) {
			clearInterval(impulse.pollingHandle);
			impulse.pollingHandle = null;
			return;
		}
		var i, setMode,
			events = stream.flushEvents();
		for (i = 0; i < events.length; i += 1) {
			
			if (events[i].impliedMode && impulse.state.mode !== events[i].impliedMode) {
				impulse.state.mode = events[i].impliedMode;
				setMode = true;
			}
			if (events[i].handedness && impulse.state.handedness !== events[i].handedness) {
				impulse.state.handedness = events[i].handedness;
				setMode = true;
			}
			if (events[i].player && impulse.state.player !== events[i].player) {
				impulse.state.player = events[i].player;
				setMode = true;
			}			
			if (setMode) {
				impulse.trigger('MODE', 'SET');
			}
			if (events[i].event === "UP") {
				delete impulse.state[events[i].key];
			}
			if (events[i].event === "DOWN") {
				impulse.state[events[i].key] = true;
			}
			impulse.trigger(events[i].key, events[i].event, +new Date());
		}
	}
	function handleKeyEvents(event) {
		stream.addEvent(event);
		if (!impulse.pollingHandle) {
			impulse.pollingHandle = setInterval(poll, 33);
		}
	}
	impulse.start = function () {
		window.jQuery(window).on('keyup keydown', handleKeyEvents);
	};
	impulse.stop = function () {
		window.jQuery(window).off('keyup keydown', handleKeyEvents);
	};
	impulse.start();
	return impulse;
}());