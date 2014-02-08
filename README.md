iMpulseJS
=========

This is a small library to translate keyboard events from an iMpulse controller into something that would be usable by an HTML5 game.

Usage:

	iMpulse.on(buttonName, eventType, [context], callback)
	iMpulse.off(buttonName, eventType, callback)

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
	