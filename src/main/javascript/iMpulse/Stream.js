/*jslint browser:true */
(function (iMpulse) {
	"use strict";
	iMpulse.Stream = function Stream() {
		this.state = {};
	};
	iMpulse.Stream.prototype = window.jQuery.extend([], {
		addEvent: function (event) {
			this.push(new iMpulse.Signal(event));
		},
		toString: function () {
			var i, k,
				t = [],
				state = window.jQuery.extend({}, this.state);
			for (i = 0; i < this.length; i += 1) {
				k = this[i].keyCode;
				if (Boolean(this[i].pressed) !== Boolean(state[k])) {
					state[k] = this[i].pressed;
					t.push(this[i].toString());
				}
			}
			return t.join('');
		},
		flushEvents: function () {
			var sequence, next, i,
				hlEvents = [],
				events = this.toString();
			// Translate event sequences to high-level events
outerLoop:
			while (events.length) {
				for (sequence in iMpulse.sequences) {
					if (iMpulse.sequences.hasOwnProperty(sequence)) {
						if (events.substr(0, sequence.length) === sequence) {
							hlEvents.push(new iMpulse.PadEvent(iMpulse.sequences[sequence]));
							events = events.substr(sequence.length);
							continue outerLoop;
						}
					}
				}
				next = events.match(/^([ud])(\d+)/);
				if (!next) {
					throw new Error('Weird stuff in the event stream: ' + events);
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
		}
	});
}(this.iMpulse));