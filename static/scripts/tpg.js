
var app = angular.module('tpg', []);

app.controller('CodeController', ['$scope', function($scope) {
	this.init = function() {
		this.scriptDiv = $("#scripture")
		this.codeDiv = $("#code");
		this.placedLines = {};
		this.indentSize = 2;
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
	};

	this.initCodeScreen = function() {
		// make the code a sortable list!!
		$("#code").sortable({
			cursor: "move",
			axis: "y",
			revert: true,
			activate: function(event, ui) {
				ui.item.addClass("dragging");
			},
			deactivate: function(event, ui) {
				ui.item.removeClass("dragging");
			}
		});
		// initialize the lines inside
		var initLines = this.initLines;
		for (var i = 0; i < initLines.length; i++) {
			var line = initLines[i];
			var elemId = "init-" + i.toString();
			this.addLine(line, elemId);
		}
	}

	this.addLine = function(line, elemId) {
		var lineP = $("<li>");
		lineP.attr("id", elemId);
		lineP.addClass("code-line");
		lineP.addClass("ui-widget-content");
		var codeStr = line.code;
		// var lineCount = this.placedLines.length;
		// var indentSpaces = 0;
		// if (lineCount > 0 && 
		// 		this.placedLines[lineCount-1]["indent_post"] > 0) {
		// 	var indent_post = this.placedLines[lineCount-1]["indent_post"];
		// 	var indent_pre = line["indent_pre"];
		// 	indentSpaces = this.indentSize * (indent_post - indent_pre);
		// 	codeStr = "&nbsp;".repeat(indentSpaces) + codeStr;
		// }
		// line["indent"] = indentSpaces;
		lineP.html(codeStr);
		this.codeDiv.append(lineP);
		this.placedLines[elemId] = line;
		console.log(this.codeDiv.sortable("toArray"));
	}

	this.addLinesForLink = function(id, num) {
		var linkObj = this.lineLinks[id];
		if (linkObj["placed"]) return;
		linkObj["placed"] = true;
		var lineObjs = linkObj["lineObjs"];
		for (var i = 0; i < lineObjs.length; i++) {
			var line = lineObjs[i];
			var elemId = id + "-" + i.toString();
			this.addLine(line, elemId);
		}
	}

	this.checkForScripture = function() {
		return $("#scripture p").length > 0;
	}

	this.init();
}])
