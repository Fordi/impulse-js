/*jslint browser:true */
(function (iMpulse) {
	"use strict";
	iMpulse.PadEvent = function PadEvent(arrEventInfo) {
		this.key = arrEventInfo[0];
		this.event = arrEventInfo[1];
		this.impliedMode = arrEventInfo[2];
		this.handedness = arrEventInfo[3];
		this.player = arrEventInfo[4];
	};
}(this.iMpulse));