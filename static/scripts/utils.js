// helpers.js

// allows for basic string formatting, used like:
// "{0} is dead, but {1} is alive! {0} {2}".format("ASP", "ASP.NET")
// from: http://stackoverflow.com/questions/610406/
// javascript-equivalent-to-printf-string-format
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

// from: http://stackoverflow.com/questions/202605/repeat-string-javascript
String.prototype.repeat = function( num )
{
    return new Array( num + 1 ).join( this );
}

// from http://stackoverflow.com/questions/10780087/getting-integer-
// value-from-a-string-using-javascript-jquery
var extractNumFromString = function(s) {
	digitStr = s.replace( /[^\d.]/g, '' );
	return parseInt(digitStr);
}

// custom show that uses visibility and opacity
// used in conjunction with the sass mixin "hiddenTransition"
var customShow = function(elem) {
	elem.css("opacity", 1).css("visibility", "visible");
}

// custom hide that uses visibility and opacity
// used in conjunction with the sass mixin "hiddenTransition"
var customHide = function(elem) {
  elem.css("opacity", 0).css("visibility", "hidden");
}

// for weird id number bug!
var numberString = function(n) {
	var numberDict = {
		0: "zeo",
		1: "onn",
		2: "too",
		3: "tee",
		4: "for",
		5: "fie",
		6: "sic",
		7: "sen",
		8: "eht",
		9: "nin"
	}
	if (n < 10 && n >= 0) {
		return numberDict[n]
	}
	else {
		var divide = Math.floor(n/10);
		var digit = Math.round(n % 10)
		return numberString(divide) + numberDict[digit]
	}
}

/**
 * Randomize array element order in-place.
 * Using Fisher-Yates shuffle algorithm.
 * from http://stackoverflow.com/questions/2450954/
 *      how-to-randomize-shuffle-a-javascript-array
 */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
};

// Prevent the backspace key from navigating back.
// http://stackoverflow.com/questions/1495219/how-can-i-prevent-the-backspace-key-from-navigating-back
$(document).unbind('keydown').bind('keydown', function (event) {
    var doPrevent = false;
    if (event.keyCode === 8) {
        var d = event.srcElement || event.target;
        if ((d.tagName.toUpperCase() === 'INPUT' && 
             (
                 d.type.toUpperCase() === 'TEXT' ||
                 d.type.toUpperCase() === 'PASSWORD' || 
                 d.type.toUpperCase() === 'FILE' || 
                 d.type.toUpperCase() === 'EMAIL' || 
                 d.type.toUpperCase() === 'SEARCH' || 
                 d.type.toUpperCase() === 'DATE' )
             ) || 
             d.tagName.toUpperCase() === 'TEXTAREA') {
            doPrevent = d.readOnly || d.disabled;
        }
        else {
            doPrevent = true;
        }
    }

    if (doPrevent) {
        event.preventDefault();
    }
});
