
var app = angular.module('tpg', []);

app.controller('CodeController', ['$scope', function($scope) {
	// vm = "view-model" as shortcut for "this"
	var vm = $scope;

	vm.init = function() {
		vm.scriptDiv = $("#scripture");
		vm.codeDiv = $("#code");
		vm.cheat = false;
		vm.level = 1;
		vm.initLevel(vm.level);
	};

	vm.initLevel = function(levelNum) {
		if (levelNum == 1) {
			vm.lineLinks = genesisObj;
			vm.initLines = genesisInitLines;
			vm.fileName = "eden.c";
			vm.rules = genesisRules;
		}
	};

	vm.initCodeLinks = function() {
		vm.initCodeScreen();
		var lineLinks = vm.lineLinks;
		var scriptParagraphs = $("p").html();
		for (var id in lineLinks) {
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
				}
			});
		};
		$("#scripture p a").click(function() {
			var id = $(this).attr("id");
			vm.addLinesForLink(id);
		});
		if (vm.cheat) $("#scripture p a").css("color", "gray");
	};

	vm.initCodeScreen = function() {
		// make the code a sortable list!!
		vm.codeDiv.nestedSortable({
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
				vm.enforceOlNesting();
			},
			// other options
			forcePlaceholderSize: true,
			helper:	'clone',
			//opacity: .6,
			placeholder: 'placeholder',
			tolerance: 'pointer',
			maxLevels: 0,
		});
		var initLines = vm.initLines;
		for (var i = 0; i < initLines.length; i++) {
			var line = initLines[i];
			var elemId = "li_init" + i.toString();
			vm.addLine(line, elemId);
		}
	}
		

	vm.addLine = function(line, elemId, appendElem) {
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
					vm.addLine(line.midCode[i], "li_"+elemId, sublistOl);
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
		}
		else {
			vm.codeDiv.append(newCodeElem);
		}		
	}

	vm.addLinesForLink = function(id) {
		var linkObj = vm.lineLinks[id];
		if (linkObj["placed"]) return;
		linkObj["placed"] = true;
		var line = linkObj["lineObj"];
		var elemId = "li_" + id;
		// add the line to the end of the main function
		vm.addLine(line, elemId, $("#code #li_main > ol"));
	}

	// if statements that should have nesting get their
	// ol deleted when elements move out of it,
	// re-add the empty ol elements
	vm.enforceOlNesting = function() {
		$(".has-nesting:not(:has(ol)) .code-line-text:first").after($("<ol>"));
	}

	vm.checkForScripture = function() {
		return $("#scripture p").length > 0;
	}

	vm.runCode = function() {
		var codeTree = $("#code").sortable("toArray");
		var curDepth = 0;
		var prevDepth = 0;
		var seenIds = [];
		var errors = $("<div>");
		errors.attr("id", "errors");
		console.log("running", codeTree);
		if (!codeTree) return;
		for (var i = 0; i < codeTree.length; i++) {
			var codeLine = codeTree[i];
			var curId = codeLine.item_id;
			var parentId = codeLine.parent_id;
			curDepth = codeLine.depth;
			// do checks here
			for (var j = 0; j < vm.rules.length; j++) {
				var rule = vm.rules[j];
				if (rule.rule == "before" && 
						rule.postId == curId && seenIds.indexOf(rule.preId) == -1) {
					var errStr = (vm.fileName + ": error: " + rule.error);
					var newErr = $("<p>").html(errStr);
					errors.append(newErr);
				}
				if (rule.rule == "hasChild" &&
					  rule.postId == curId && rule.preId != parentId) {
					console.log("hasChild rule", curId, "not inside", parentId);
					var errStr = (vm.fileName + ": error: " + rule.error);
					var newErr = $("<p>").html(errStr);
					errors.append(newErr);
				}
			}
			seenIds.push(curId);
			prevDepth = curDepth;
		}
		// check for missing elements if everything else is good
		var codeIds = [];
		for (lineId in vm.lineLinks) {codeIds.push(lineId)};
		var shuffledLineLinks = shuffleArray(codeIds);
		if (errors.children().length == 0) {
			for (var i = shuffledLineLinks.length - 1; i >= 0; i--) {
				lineId = shuffledLineLinks[i];
				if (seenIds.indexOf(lineId) == -1) {
					var errStr = (vm.fileName + ":" + " error: missing " +
						lineId + " line in file.");
					var newErr = $("<p>");
					newErr.html(errStr);
					errors.append(newErr);
					break;
				}
			}
		}
		$("#prompt-error-message").empty();
		$("#conversation-content").empty();
		console.log($("#command-input").val());
		$("#command-input").val("");
		if (errors.children().length == 0) {
			var winStr = "Compilation successful...<br>That's all for now!";
			var winP = $("<p>").html(winStr);
			$("#prompt-error-message").append(winP);
		}
		else {
			$("#prompt-error-message").append(errors);
		}
	}

	vm.init();
}])
