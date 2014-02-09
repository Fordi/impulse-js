iMpulseJS
=========

This is a small library to translate keyboard events from an iMpulse controller into something that would be usable by an HTML5 game.

[See a demo](http://fordi.github.io/impulse-js/demo/)

Usage:

	iMpulse.on(buttonName, eventType, [context], callback);
	iMpulse.off(buttonName, eventType, callback);

buttonName can be any of the following:

* REV
* FWD
* SCROLL<
* SCROLL>
* UP
* LEFT
* RIGHT
* DOWN
* A
* W
* V
* M
* N
* U
* PLAY
* ESC
* ENTER
* MUTE
* VOL+
* VOL-

eventType is either UP or DOWN.

There are some special values for buttonName and eventType:

* buttonName = MODE, eventType = SET - this event indicates that the user has changed the controller's mode.  Inspect iMpulse.state to see what changed.
* buttonName = ANY, eventType = ANY - indicates that the developer wants to be alerted of ALL events
	
callback is a function with three arguments: buttonName, eventType, and timestamp

### iMpulse.state:

* mode
	* one of UNIVERSAL, MEDIA, IOS, or TV
* handedness
	* LEFT or RIGHT
* player
	* P1 or P2
* REV
* FWD
* SCROLL<
* SCROLL>
* UP
* LEFT
* RIGHT
* DOWN
* A
* W
* V
* M
* N
* U
* PLAY
* ESC
* ENTER
* MUTE
* VOL+
* VOL-
	
NOTE: IOS buttons are not supported; they overlap incompatibly with universal buttons, and are harder to parse.  Since it would be redundant, I elected to skip them for now.

Building from source
--------------------

* If you've never built a grunt-based project:

	1. Install [NodeJS](http://nodejs.org)
	2. Install Grunt

		npm install -g grunt-cli

* First time:
		
	1. Change to your project's directory and pull down the needed modules

		npm install grunt grunt-contrib-uglify
		

* To build:

	grunt
	