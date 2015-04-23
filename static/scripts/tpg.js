
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
		$("#code").nestedSortable({
			handle: 'div',
			items: 'li',
			toleranceElement: '> div',
			tabSize: 10,
			cursor: "move",
			cursorAt: {top: 8},
			revert: true,
			activate: function(event, ui) {
				ui.item.addClass("dragging");
			},
			deactivate: function(event, ui) {
				ui.item.removeClass("dragging");
			},
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
			var elemId = "init-" + i.toString();
			this.addLine(line, elemId);
		}
	}
		

	this.addLine = function(line, elemId, appendElem) {
		// create li container
		var lineLi = $("<li>");
		lineLi.attr("id", elemId);
		if (line.hasOwnProperty("id")) {
			lineLi.attr("id", line.id);
		};
		lineLi.addClass("code-line");
		// set up div content
		var contentDiv = $("<div>");
		contentDiv.html(line.code);
		lineLi.append(contentDiv);
		// add nested sub code if it exists
		var sublistOl = $("<ol>");
		if (line.hasOwnProperty("midCode")) {
			for (var i = 0; i < line.midCode.length; i++) {
				this.addLine(line.midCode[i], elemId+"-"+i.toString, sublistOl);
			}
			lineLi.append(sublistOl);
		}
		// add end code if it exists
		if (line.hasOwnProperty("endCode")) {
			var endDiv = $("<div>");
			endDiv.addClass(".endCode");
			endDiv.html(line.endCode);
			// add sublist if no sublist already
			if (!line.hasOwnProperty("midCode")) lineLi.append(sublistOl);
			lineLi.append(endDiv);
		}
		if (appendElem !== undefined) {
			appendElem.append(lineLi);
		}
		else {
			this.codeDiv.append(lineLi);
		}
	}

	this.addLinesForLink = function(id) {
		var linkObj = this.lineLinks[id];
		if (linkObj["placed"]) return;
		linkObj["placed"] = true;
		var line = linkObj["lineObj"];
		var elemId = id;
		// add the line to the end of the main function
		this.addLine(line, elemId, $("#code #main > ol"));
	}

	this.checkForScripture = function() {
		return $("#scripture p").length > 0;
	}

	this.init();
}])
