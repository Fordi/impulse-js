iMpulse.on('any', 'any', function (key, type, stamp) {
	if (type === 'DOWN') {
		$('.btn' + key).addClass('pressed').parent().addClass('pressed' + key);
	}
	if (type === 'UP') {
		$('.btn' + key).removeClass('pressed').parent().removeClass('pressed' + key);
	}
	$('.controller-group').removeClass('LEFT RIGHT IOS TV MEDIA UNIVERSAL').addClass(iMpulse.state.handedness + ' ' + iMpulse.state.mode);
});