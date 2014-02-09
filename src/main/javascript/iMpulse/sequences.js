/*jslint browser:true */
(function (iMpulse) {
	"use strict";
	/*jslint white:true */
	iMpulse.sequences = {
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
}(this.iMpulse));