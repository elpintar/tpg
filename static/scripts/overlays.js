// overlays.js

var genericOverlay = function(callback, fadeInTime, fadeOutTime, 
		stayTime, imageUrl, bgSize, showOverlay, hideOverlay) {
	var bigBangTime = stayTime - fadeOutTime;
	var overlayContainer = $("#overlay-container");
	if (showOverlay === undefined) showOverlay = true;
	if (hideOverlay === undefined) hideOverlay = true;
	if (showOverlay) overlayContainer.show();
	var image = $("<div>")
		.css("background-image", "url('"+imageUrl+"')")
		.css("background-size", bgSize)
		.hide();
	overlayContainer.append(image);
	image.fadeIn(fadeInTime);
	setTimeout(function() {
		image.fadeOut(fadeOutTime, function(){
			overlayContainer.empty();
			if (hideOverlay) {
				overlayContainer.hide();
			}
			callback();
		});
	}, bigBangTime);
}

var genericOverlayBgStr = function(callback, fadeInTime, fadeOutTime, 
		stayTime, backgroundStr, showOverlay, hideOverlay) {
	var bigBangTime = stayTime - fadeOutTime;
	var overlayContainer = $("#overlay-container");
	if (showOverlay === undefined) showOverlay = true;
	if (hideOverlay === undefined) hideOverlay = true;
	if (showOverlay) overlayContainer.show();
	var image = $("<div>")
		.css("background", backgroundStr)
		.hide();
	overlayContainer.append(image);
	image.fadeIn(fadeInTime);
	setTimeout(function() {
		image.fadeOut(fadeOutTime, function(){
			overlayContainer.empty();
			if (hideOverlay) {
				overlayContainer.hide();
			}
			callback();
		});
	}, bigBangTime);
}

// LEVEL 0

var bigBangOverlay = function(callback, showOverlay, hideOverlay) {
	var fadeInTime = 800;
	var fadeOutTime = 800;
	var stayTime = 2800;
	var imageUrl = 'static/pics/bigBang.gif';
	var bgSize = "cover";
	genericOverlay(function(){
		if (callback) callback();
	}, fadeInTime, fadeOutTime, stayTime, imageUrl, 
		 bgSize, showOverlay, hideOverlay);
}

var earthSpinOverlay = function(callback, showOverlay, hideOverlay) {
	var fadeInTime = 1400;
	var fadeOutTime = 1400;
	var stayTime = 4100;
	var imageUrl = 'static/pics/earthSpinSlower.gif';
	var bgSize = "contain";
	genericOverlay(function(){
		if (callback) callback();
	}, fadeInTime, fadeOutTime, stayTime, imageUrl, bgSize);
}

var originsTransition = function(callback) {
	var middleBlackPause = 600;
	var endFade = 100;
	// fade in the background
	$("#overlay-container").show();
	$("#overlay-container").css("background-color", "white");
	bigBangOverlay(function() {
		$("#overlay-container").show();
		$("#overlay-container").css("background-color", "black");
		setTimeout(function() {
			earthSpinOverlay(function() {
				if (callback) callback();
				// fade out the background
				$("#overlay-container").show();
				setTimeout(function() {
					$("#overlay-container").css("background-color", "transparent");
					setTimeout(function() {
						$("#overlay-container").hide();
					}, 1000);
				}, endFade);
			}, false, false);
		}, middleBlackPause);
	}, true, false);
}

// LEVEL 1

var appleOverlay = function(callback) {
	var fadeInTime = 400;
	var fadeOutTime = 200;
	var stayTime = 1200;
	var imageUrl = 'static/pics/apple-unbitten.png';
	var bgSize = "319px 338px";
	genericOverlay(function(){
		if (callback) callback();
	}, fadeInTime, fadeOutTime, stayTime, imageUrl, bgSize);
}

var bitAppleOverlay = function(callback, showOverlay, hideOverlay) {
	var fadeInTime = 100;
	var fadeOutTime = 200;
	var stayTime = 2000;
	var backgroundStr = 'url("static/pics/apple-bitten.png")'+
		' no-repeat scroll center, '+
		'url("static/pics/cracks.png") no-repeat center';
	genericOverlayBgStr(function(){
		if (callback) callback();
	}, fadeInTime, fadeOutTime, stayTime, backgroundStr, 
		 showOverlay, hideOverlay);
}

var sinEntersTheWorld = function(callback) {
	var crackDelay = 200;
	$("#overlay-container").show();
	$("#overlay-container").css("background-color", "#C10000")
		.css("transition-duration", "0."+crackDelay+"s");
	setTimeout(function() {
		$("#overlay-container").css("background-color", "transparent")
			.css("transition-duration", "1.0s");;
		bitAppleOverlay(function(){
			$("#overlay-container").hide();
			if (callback) callback();
		}, true, true);
	}, crackDelay);
}






