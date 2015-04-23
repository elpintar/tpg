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
