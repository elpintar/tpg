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
