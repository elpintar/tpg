
var rippleScriptureAnimation = function(scriptureId) {
	var scriptPs = $("#"+scriptureId+" p");
	var modClass = "lit-up";
	var timeStep = 150;
	var offDelay = 450;
	var ripple = function(index, shouldAdd) {
		if (index < scriptPs.length) {
			var elem = $(scriptPs[index]);
			if (shouldAdd) {
				elem.addClass(modClass);
				elem.children("a").addClass(modClass);
			}
			else {
				elem.removeClass(modClass);
				elem.children("a").removeClass(modClass);
			}
			setTimeout(function() {ripple(index+1, shouldAdd)}, timeStep);
		}
	}
	ripple(0, true);
	setTimeout(function() {ripple(0, false)}, offDelay);
}

