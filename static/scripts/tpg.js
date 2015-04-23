
var app = angular.module('tpg', []);

app.controller('CodeController', ['$scope', function($scope) {
	this.init = function() {
		this.scriptDiv = $("#scripture")
		this.codeDiv = $("#code");
		this.placedLines = [];
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
		var initLines = this.initLines;
		for (var i = 0; i < initLines.length; i++) {
			var line = initLines[i];
			this.addLine(line);
		}
	}

	this.addLine = function(line) {
		var lineTag = "<p>{0}</p>";
		var codeStr = line.code;
		var lineCount = this.placedLines.length;
		if (lineCount > 0 && 
				this.placedLines[lineCount-1]["indent_post"] > 0) {
			var indent_post = this.placedLines[lineCount-1]["indent_post"];
			var indent_pre = line["indent_pre"];
			var indentSpaces = this.indentSize * (indent_post - indent_pre);
			codeStr = "&nbsp;".repeat(indentSpaces) + codeStr;
		}
		tempLineTag = lineTag.format(codeStr);
		this.codeDiv.append(tempLineTag);
		this.placedLines.push(line);
	}

	this.addLinesForLink = function(id) {
		var linkObj = this.lineLinks[id];
		if (linkObj["placed"]) return;
		linkObj["placed"] = true;
		var lineObjs = linkObj["lineObjs"];
		for (var i = 0; i < lineObjs.length; i++) {
			var line = lineObjs[i];
			this.addLine(line);
		}
	}

	this.checkForScripture = function() {
		return $("#scripture p").length > 0;
	}

	this.init();
}])
