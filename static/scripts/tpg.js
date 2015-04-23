
var app = angular.module('tpg', []);

app.controller('CodeController', ['$scope', function($scope) {
	this.init = function() {
		this.scriptDiv = $("#scripture")
		this.codeDiv = $("#code");
		this.cheat = false;
		this.initLevel(1);
	};

	this.initLevel = function(levelNum) {
		if (levelNum == 1) {
			this.lineLinks = genesisObj;
			this.initLines = genesisInitLines;
		}
	};

	this.initCodeLinks = function() {
		this.initCodeScreen();
		var lineLinks = this.lineLinks;
		var scriptParagraphs = $("p").html();
		for (id in lineLinks) {
			var linkObj = lineLinks[id];
			// look for code key in each paragraph
			$("p").each(function(index){
				var sp = $(this);
				var aTag = ("<a id='{0}'>{1}</a>");
				var key = linkObj["key"];
				var text = sp.html();
				if (text.indexOf(key) != -1) {
					aTag = aTag.format(id, key);
					text = text.replace(key, aTag);
					sp.html(text);
				};
			});
		};
		var self = this;
		$("#scripture p a").click(function() {
			var id = $(this).attr("id");
			self.addLinesForLink(id);
		});
		if (this.cheat) $("#scripture p a").css("color", "blue");
	};

	this.initCodeScreen = function() {
		// make the code a sortable list!!
		this.codeDiv.nestedSortable({
			handle: 'div',
			items: 'li',
			toleranceElement: '> div',
			tabSize: 10,
			cursor: "move",
			cursorAt: {top: 8},
			revert: 200,
			activate: function(event, ui) {
				ui.item.addClass("dragging");
			},
			deactivate: function(event, ui) {
				ui.item.removeClass("dragging");
			},
			// tricky bug where ol elems get deleted
			change: function(event, ui) {
				this.enforceOlNesting();
			}.bind(this),
			// other options
			forcePlaceholderSize: true,
			helper:	'clone',
			//opacity: .6,
			placeholder: 'placeholder',
			tolerance: 'pointer',
			maxLevels: 4,
		});
		var initLines = this.initLines;
		for (var i = 0; i < initLines.length; i++) {
			var line = initLines[i];
			var elemId = "li_init" + i.toString();
			this.addLine(line, elemId);
		}
	}
		

	this.addLine = function(line, elemId, appendElem) {
		// set up div with content
		var contentDiv = $("<div>");
		contentDiv.html(line.code);
		contentDiv.addClass("code-line-text");
		var newCodeElem = $("<li>");
		// statements with possible nested expressions
		if (line.hasOwnProperty("midCode") ||
				line.hasOwnProperty("endCode")) {
			newCodeElem.append(contentDiv);
			// add nested sub code if it exists
			var sublistOl = $("<ol>");
			if (line.hasOwnProperty("midCode")) {
				for (var i = 0; i < line.midCode.length; i++) {
					this.addLine(line.midCode[i], "li_"+elemId, sublistOl);
				}
			}
			newCodeElem.append(sublistOl);
			// add end code if it exists
			if (line.hasOwnProperty("endCode")) {
				var endDiv = $("<div>");
				endDiv.addClass("endCode");
				endDiv.html(line.endCode);
				newCodeElem.append(endDiv);
			}
			newCodeElem.addClass("has-nesting");
		}
		// non-nested statements
		else {
			newCodeElem.append(contentDiv);
			// TODO doesn't work!
			newCodeElem.addClass("mjs-nestedSortable-no-nesting");
		}
		// add id and class
		newCodeElem.attr("id", elemId);
		if (line.hasOwnProperty("id")) {
			newCodeElem.attr("id", "li_"+line.id);
		};
		newCodeElem.addClass("code-line");
		// add new elem to parent elem
		if (appendElem !== undefined) {
			appendElem.append(newCodeElem);
			console.log($("#code").sortable("toArray"));
		}
		else {
			this.codeDiv.append(newCodeElem);
		}		
	}

	this.addLinesForLink = function(id) {
		var linkObj = this.lineLinks[id];
		if (linkObj["placed"]) return;
		linkObj["placed"] = true;
		var line = linkObj["lineObj"];
		var elemId = "li_" + id;
		// add the line to the end of the main function
		this.addLine(line, elemId, $("#code #li_main > ol"));
	}

	// if statements that should have nesting get their
	// ol deleted when elements move out of it,
	// re-add the empty ol elements
	this.enforceOlNesting = function() {
		console.log("needs ol", $(".has-nesting:not(:has(ol)) .code-line-text:first"));
		$(".has-nesting:not(:has(ol)) .code-line-text:first")
			.after($("<ol>"));
		//.each(function(){
		// 	var numChildren = $(this).children().length;
		// 	console.log("numChildren", numChildren);
		// 	if (numChildren >= 1) {
		// 		console.log("CHILD 0", $(this).children()[0]);
		// 		$("ol").insertAfter($(this).children()[0]);
		// 	}
		// 	else {
		// 		$(this).append($("ol"));
		// 	}
		// });
		// $("ol").insertBefore($(".has-nesting:not(:has(ol))"));
	}

	this.checkForScripture = function() {
		return $("#scripture p").length > 0;
	}

	this.init();
}])
