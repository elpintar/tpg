
var app = angular.module('tpg', []);

app.controller('CodeController', ['$scope', function($scope) {
	// vm = "view-model" as shortcut for "this"
	var vm = $scope;

	vm.init = function() {
		vm.o = {};
		vm.o.level = 2;
		vm.initCodeFor = vm.o.level;
		//vm.cheat = true;
		//vm.o.startConvoNow = true;
		vm.initLevel();
	};

	vm.initLevel = function() {
		console.log("initLevel", vm.o.level);
		vm.codeCompiles = false;
		vm.sectionLinkCounts = {};
		vm.sectionLinksFound = {};
		$("#full-screen-container").hide();
		if (vm.o.level == 0) {
			$("#full-screen-container").show();
			vm.scriptureId = "scripture-full-screen";
			vm.scriptDiv = $("#"+vm.scriptureId);
			vm.codeId = "code-full-screen";
			vm.codeDiv = $("#"+vm.codeId);
			vm.codeAddToSelector = "#"+vm.codeId;
			vm.codeRunId = "code-run-area-full-screen";
			vm.errorMsgContainer = $("#error-message-full-screen");
			vm.lineLinks = originsObj;
			vm.initLines = originsInitLines;
			vm.fileName = "earth.c";
			vm.rules = originsRules;
			// special tutorial hint if they don't do anything for 5s
			setTimeout(function() {
				if ($("#section-0-2").css("visibility") === "hidden") {
					var helpfulText = "Read with your cursor to expand your sight.";
					vm.addPtoElem(helpfulText, vm.errorMsgContainer);
					customShow(vm.errorMsgContainer);
				}
			}, 5000);
		}
		else if (vm.o.level == 1) {
			vm.scriptureId = "scripture";
			vm.scriptDiv = $("#"+vm.scriptureId);
			vm.codeId = "code";
			vm.codeDiv = $("#"+vm.codeId);
			vm.codeAddToSelector = "#"+vm.codeId+" #li_main > ol";
			vm.codeRunId = "code-run-area";
			vm.errorMsgContainer = $("#prompt-error-message");
			vm.lineLinks = genesisObj;
			vm.initLines = genesisInitLines;
			vm.fileName = "eden.c";
			vm.rules = genesisRules;
		}
		else if (vm.o.level == 2) {
			vm.scriptureId = "scripture";
			vm.scriptDiv = $("#"+vm.scriptureId);
			vm.codeId = "code";
			vm.codeDiv = $("#"+vm.codeId);
			vm.codeAddToSelector = "#"+vm.codeId;
			vm.codeRunId = "code-run-area";
			vm.errorMsgContainer = $("#prompt-error-message");
			vm.lineLinks = passoverObj;
			vm.initLines = passoverInitLines;
			vm.fileName = "egypt.c";
			vm.rules = passoverRules;
		}
		// if we need to init the code for this level, do so
		if (vm.initCodeFor !== vm.o.level)
			vm.initCodeLinks();
	};

	vm.initCodeLinks = function() {
		vm.initCodeScreen();
		var lineLinks = vm.lineLinks;
		for (var id in lineLinks) {
			var linkObj = lineLinks[id];
			// look for code key in each paragraph
			var foundKey = false;
			$("#"+vm.scriptureId+" p").each(function(index){
				var sp = $(this);
				var aTag = ("<a id='{0}'>{1}</a>");
				var key = linkObj["key"];
				var text = sp.html();
				// key is in this paragraph
				if (text.indexOf(key) != -1 && !foundKey) {
					foundKey = true;
					aTag = aTag.format(id, key);
					text = text.replace(key, aTag);
					sp.html(text);
				}
			});
			// count how many code links in each section
			$("#"+vm.scriptureId+" .section").each(function(index){
				var sectionId = $(this).attr("id");
				vm.sectionLinkCounts[sectionId] = $("#"+sectionId+" a").length;
				vm.sectionLinksFound[sectionId] = [];
				var firstSectionId = "section-"+vm.o.level.toString()+"-1";
				if (sectionId === firstSectionId) {
					customShow($(this));
				}
			});
		}
		// CLICK a key phrase
		$("#"+vm.scriptureId+" p a").click(function() {
			var id = $(this).attr("id");
			vm.addLinesForLink(id);
			$("#li_"+id).addClass("isHighlighted");
		});
		// HOVER over a key phrase
		$("#"+vm.scriptureId+" p a").mouseenter(function() {
			$(this).addClass("found");
			var id = $(this).attr("id");
			// add it to the code when you mouse over it
			//vm.addLinesForLink(id);
			$("#li_"+id).addClass("isHighlighted");
			// mark down that we found this id
			var sectionId = $(this).parent().parent().attr("id");
			var secFoundIds = vm.sectionLinksFound[sectionId];
			if (secFoundIds.indexOf(id) === -1) {
				secFoundIds.push(id);
				// reveal next section if all in this one found
				console.log(sectionId, vm.sectionLinkCounts[sectionId]);
				if (secFoundIds.length === vm.sectionLinkCounts[sectionId]) {
					var secIdEnd = sectionId.substring(
						"section-0-".length, sectionId.length);
					var secNum = extractNumFromString(secIdEnd);
					var nextSectionId = "section-" + vm.o.level.toString() +
						"-" + (secNum + 1).toString();
					customShow($("#"+nextSectionId));
					// all words are uncovered - ripple effect
					if ($("#"+nextSectionId).length === 0) {
						rippleScriptureAnimation(vm.scriptureId);
						// show code button 2 sec later
						setTimeout(function() {
							customShow($("#"+vm.codeRunId));
							// tutorial hint to click code if no code!
							if (vm.o.level == 0 && 
									$(vm.codeAddToSelector).children().length == 0)
								vm.errorMsgContainer.append($("<p>").html(
								"Click key phrases to generate code."));
								customShow(vm.errorMsgContainer);
						}, 2000);
					}
				}
			}
		});
		// LEAVE HOVER on a key phrase
		$("#"+vm.scriptureId+" p a").mouseleave(function() {
			var id = $(this).attr("id");
			$("#li_"+id).removeClass("isHighlighted");
		});
		if (vm.cheat) $("#"+vm.scriptureId+" p a").css("color", "gray");
		// mark completed
		vm.initCodeFor = vm.o.level;
	};

	vm.initCodeScreen = function() {
		// make the code a sortable list!!
		vm.codeDiv.empty();
		$("#conversation-content").empty();
		$("#pre-input-content").empty();
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
		// actually show the scripture!
		vm.showRightScripture();
		// show code, fade in
		setTimeout(function() {
			customShow(vm.codeDiv);
		}, 1000);
	}

	vm.showRightScripture = function() {
		$(".scripture-partial").each(function(index) {
			$(this).hide();
		});
		if (vm.o.level == 0) {
			$("#origins-scripture").show();
		}
		else if (vm.o.level == 1) {
			$("#genesis-scripture").show();
		}
		else if (vm.o.level == 2) {
			$("#passover-scripture").show();
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
		console.log("adding", line, elemId, vm.codeAddToSelector);
		vm.addLine(line, elemId, $(vm.codeAddToSelector));
	}

	// if statements that should have nesting get their
	// ol deleted when elements move out of it,
	// re-add the empty ol elements
	vm.enforceOlNesting = function() {
		$(".has-nesting:not(:has(ol)) .code-line-text:first").after($("<ol>"));
	}

	vm.checkForScripture = function() {
		return $("#"+vm.scriptureId+" p").length > 0;
	}

	vm.addPtoElem = function(s, elem) {
		var newP = $("<p>");
		newP.html(s);
		elem.append(newP);
	}

	vm.runCode = function() {
		var codeTree = vm.codeDiv.sortable("toArray");
		if (!codeTree) return;
		var curDepth = 0;
		var prevDepth = 0;
		var seenIds = [];
		var hasIds = [];
		var errors = $("<div>");
		errors.attr("id", "errors");
		var missingError = false;
		// get all codeIds
		var codeIds = [];
		for (lineId in vm.lineLinks) {codeIds.push(lineId)};
		// get all ids code has
		for (var i = 0; i < codeTree.length; i++) {
			hasIds.push(codeTree[i].item_id);
		}
		// check if rule has both ids
		var missingRuleIds = function(rule) {
			if (hasIds.indexOf(rule.preId) !== -1 &&
				  hasIds.indexOf(rule.postId) !== -1)
				return "";
			else if (hasIds.indexOf(rule.preId) === -1)
				return rule.preId;
			else return rule.postId;
		}
		// get rid of previous error highlighting
		$(".hasError").removeClass("hasError");
		// check for errors
		for (var i = 0; i < codeTree.length; i++) {
			var codeLine = codeTree[i];
			var curId = codeLine.item_id;
			var parentId = codeLine.parent_id;
			curDepth = codeLine.depth;
			// do checks here
			for (var j = 0; j < vm.rules.length; j++) {
				var rule = vm.rules[j];
				// check if any rule is broken
				if ((rule.rule == "before" && 
						 rule.postId == curId && seenIds.indexOf(rule.preId) == -1) ||
						(rule.rule == "hasChild" &&
					  rule.postId == curId && rule.preId != parentId)) {
					if (missingRuleIds(rule) === "") {
						var errStr = (vm.fileName + ": error: " + rule.error);
					}
					else {
						var errStr = (vm.fileName + ": error: missing " +
						              missingRuleIds(rule) + " line in file.");
						missingError = true;
					}
					vm.addPtoElem(errStr, errors);
				}
			}
			seenIds.push(curId);
			prevDepth = curDepth;
			// found error(s) on this line! code crashes and breaks
			if (errors.contents().length > 0) {
				$("#li_"+curId).addClass("hasError");
				break;
			}
		}
		// check for missing elements if everything else is good
		var shuffledLineLinks = shuffleArray(codeIds);
		if (errors.children().length == 0) {
			for (var i = shuffledLineLinks.length - 1; i >= 0; i--) {
				lineId = shuffledLineLinks[i];
				if (seenIds.indexOf(lineId) == -1) {
					var errStr = (vm.fileName + ":" + " error: missing " +
						lineId + " line in file.");
					missingError = true;
					vm.addPtoElem(errStr, errors);
					break;
				}
			}
		}
		vm.errorMsgContainer.empty();
		$("#conversation-content").empty();
		if (errors.children().length == 0) {
			vm.codeCompiles = true;
		}
		else {
			vm.errorMsgContainer.append(errors);
			// tutorial text for level 0
			if (vm.o.level == 0 && !missingError) {
				var helpfulText = "(Reorder code so that the code compiles.)";
				vm.addPtoElem(helpfulText, vm.errorMsgContainer);
			}
		}
	}

	vm.init();
}])
