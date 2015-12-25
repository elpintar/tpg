
var app = angular.module('tpg', []);

app.controller('CodeController', ['$scope', function($scope) {
	// vm = "view-model" as shortcut for "this"
	var vm = $scope;

	vm.init = function() {
		// vm.o is an object to be shared across controllers
		vm.o = {};
		vm.o.level = vm.getLevelFromURL();
		vm.o.conversationHappening = false;
		vm.initCodeFor = vm.o.level;
		vm.initLevel();
		// "cheat codes"
		vm.cheat = false; // displays all key phrases
	};

	vm.initLevel = function() {
		console.log("initLevel", vm.o.level);
		vm.updateLevelInURL(vm.o.level.toString());
		vm.o.codeCompiles = false;
		if (vm.codeRunId) customHide($("#"+vm.codeRunId));
		vm.o.conversationHappening = false;
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
			vm.scriptureName = "Genesis";
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
			vm.scriptureName = "Genesis";
			vm.rules = genesisRules;
		}
		else if (vm.o.level == 2) {
			$("#code-full-screen").append($('<li class="mjs-nestedSortable-no-nesting code-line" id="li_God"><div class="code-line-text">&lt;#include God.h&gt;</div></li><li class="mjs-nestedSortable-no-nesting code-line" id="li_heavens"><div class="code-line-text">God-&gt;create(heavens);</div></li><li class="mjs-nestedSortable-no-nesting code-line" id="li_time"><div class="code-line-text">God-&gt;init(time);</div></li><li class="mjs-nestedSortable-no-nesting code-line hasError" id="li_void"><div class="code-line-text">assert(typeof(earth)<br>&nbsp;== void);</div></li><li class="mjs-nestedSortable-no-nesting code-line" id="li_light" style="display: list-item;"><div class="code-line-text">God-&gt;init(light);</div></li>'));
			vm.scriptureId = "scripture";
			vm.scriptDiv = $("#"+vm.scriptureId);
			vm.codeId = "code";
			vm.codeDiv = $("#"+vm.codeId);
			vm.codeAddToSelector = "#"+vm.codeId;
			vm.codeRunId = "code-run-area";
			vm.errorMsgContainer = $("#prompt-error-message");
			vm.lineLinks = passoverObj;
			vm.initLines = passoverInitLines;
			vm.fileName = "egypt.py";
			vm.scriptureName = "Exodus";
			vm.rules = passoverRules;
		}
		if (vm.o.level == 3) {
			vm.initProphecyLevel();
			vm.scriptureId = "old-t-scripture";
			vm.scriptDiv = $("#"+vm.scriptureId);
			vm.codeId = "links-made";
			vm.codeDiv = $("#"+vm.codeId);
			vm.codeAddToSelector = "#"+vm.codeId;
			vm.codeRunId = "linker-help-text"; // may not need
			vm.errorMsgContainer = $("#linker-help-text");
			vm.lineLinks = prophecyObj;
			vm.initLines = prophecyInitLines;
			$("#prophecy-container").show();
		}
		if (vm.o.level == 4) {
			$("#full-screen-container").show();
			$("#content-container h1").html("The Gospel");
			vm.scriptureId = "scripture-full-screen";
			vm.scriptDiv = $("#"+vm.scriptureId);
			vm.codeId = "code-full-screen";
			vm.codeDiv = $("#"+vm.codeId);
			vm.codeAddToSelector = "#"+vm.codeId;
			vm.codeRunId = "code-run-area-full-screen";
			vm.errorMsgContainer = $("#error-message-full-screen");
			vm.lineLinks = theWordObj;
			vm.initLines = theWordInitLines;
			vm.fileName = "theWord.py";
			vm.scriptureName = "John";
			vm.rules = theWordRules;
		}
		else if (vm.o.level == 5) {
			vm.scriptureId = "scripture";
			vm.scriptDiv = $("#"+vm.scriptureId);
			vm.codeId = "code";
			vm.codeDiv = $("#"+vm.codeId);
			vm.codeAddToSelector = "#"+vm.codeId;
			vm.codeRunId = "code-run-area";
			vm.errorMsgContainer = $("#prompt-error-message");
			vm.lineLinks = gospelObj;
			vm.initLines = gospelInitLines;
			vm.fileName = "gospel.py";
			vm.scriptureName = "John | Romans";
			vm.rules = gospelRules;
		}
		// init the code for this level
		vm.initCodeLinks();
	};

	vm.getLevelFromURL = function() {
		anchorIndex = document.URL.indexOf("#");
	  if (anchorIndex != -1) {
	    partialId = document.URL.substr(anchorIndex+1);
	    // weird html tag link error fix
	    if (partialId.indexOf("/") === 0) {
	    	partialId = partialId.substr(1);
	    }
	    console.log("level from anchor in URL:", partialId);
	    levelNum = parseInt(partialId);
	    // decimal as 1 means start the conversation
	    var doti = partialId.indexOf(".");
	    if (doti !== -1) {
	    	var decimal = parseInt(partialId[doti+1]);
	    	if (decimal === 1) {
	    		console.log("start convo");
	    		vm.o.startConvoNow = true;
	    	}
	    }
	    else vm.o.startConvoNow = false;
	    return levelNum;
	  }
	  else {
	  	return 0;
	  }	
	}

	vm.updateLevelInURL = function(levelStr) {
		// setTimeout is for not doing two scope.apply's at once
		setTimeout(function() {
			// click a fake link to get the anchor tag in the url
	  	var fakeLink = $("<a>")
	  		.attr("href", "#"+levelStr);
	  	$("body").append(fakeLink);
	  	fakeLink.click();
	  	fakeLink.remove();
		}, 10);
	}

	vm.initCodeLinks = function() {
		vm.initCodeScreen();
		var lineLinks = vm.lineLinks;
		for (var id in lineLinks) {
			var linkObj = lineLinks[id];
			// look for code key in each paragraph
			var foundKey = false;
			$("#"+vm.scriptPsId+" p").each(function(index){
				var sp = $(this);
				var aTag = ("<a id='{0}'>{1}</a>");
				var key = linkObj["key"];
				var text = sp.html();
				// key is in this paragraph
				if (text.indexOf(key) != -1 && !foundKey) {
					console.log("found ", key);
					foundKey = true;
					aTag = aTag.format(id, key);
					text = text.replace(key, aTag);
					sp.html(text);
				}
			});
			if (vm.o.level === 3) continue;
			// count how many code links in each section
			$("#"+vm.scriptPsId+" .section").each(function(index){
				var sectionId = $(this).attr("id");
				vm.sectionLinkCounts[sectionId] = $("#"+sectionId+" a").length;
				vm.sectionLinksFound[sectionId] = [];
				// show first section right away
				var firstSectionId = "section-"+vm.o.level.toString()+"-1";
				if (sectionId === firstSectionId) {
					setTimeout(function() {
						customShow($("#"+firstSectionId));
						customShow($("#scripture-header-title"));
					}, 200);
				}
			});
		}
		// CLICK a key phrase
		var linkSelector = "#"+vm.scriptPsId+" p a";
		if (vm.o.level === 3) {
			linkSelector = "#old-t-scripture p a, " +
										 "#new-t-scripture p a"
		}
		$(linkSelector).click(function() {
			var id = $(this).attr("id");
			$("#li_"+id).addClass("isHighlighted");
			if (vm.o.level !== 3) {
				vm.addLinesForLink(id);
			}
			// prophecy level selects one phrase at a time
			else {
				// remove other isSelected classes in this testament
				if ($("#old-t-scripture").find(this).length !== 0)
					$("#old-t-scripture p a").removeClass("isSelected");
				else
					$("#new-t-scripture p a").removeClass("isSelected");
				// select this one
				$(this).addClass("isSelected");
				// do we have one on each side selected?
				if ($("#old-t-scripture .isSelected").length === 0 ||
						$("#new-t-scripture .isSelected").length === 0)
					return;
				var oldTLineId = $("#old-t-scripture .isSelected")[0].id;
				var newTLineId = $("#new-t-scripture .isSelected")[0].id;
				var oldTLinkObj = lineLinks[oldTLineId];
				var newTLinkObj = lineLinks[newTLineId];
				// same code means a match
				if (oldTLinkObj.lineObj.hasOwnProperty("code") &&
						newTLinkObj.lineObj.hasOwnProperty("code") &&
						oldTLinkObj.lineObj.code === 
						newTLinkObj.lineObj.code) {
					vm.addLinesForLink(id);
					// color as linked, not selected
					$(".prophecy-scripture .isSelected").addClass("isLinked");
					$(".prophecy-scripture .isSelected").removeClass("isSelected");
				}
			}
		});
		// HOVER over a key phrase
		$(linkSelector).mouseenter(function() {
			$(this).addClass("found");
			var id = $(this).attr("id");
			$("#li_"+id).addClass("isHighlighted");
			if (vm.o.level === 3) return;
			// mark down that we found this id
			var sectionId = $(this).parent().parent().attr("id");
			var secFoundIds = vm.sectionLinksFound[sectionId];
			if (secFoundIds.indexOf(id) === -1) {
				secFoundIds.push(id);
				// reveal next section if all in this one found
				if (secFoundIds.length === vm.sectionLinkCounts[sectionId]) {
					var secIdEnd = sectionId.substring(
						"section-0-".length, sectionId.length);
					var secNum = extractNumFromString(secIdEnd);
					var nextSectionId = "section-" + vm.o.level.toString() +
						"-" + (secNum + 1).toString();
					customShow($("#"+nextSectionId));
					// all words are uncovered - ripple effect
					if ($("#"+nextSectionId).length === 0) {
						rippleScriptureAnimation(vm.scriptPsId);
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
		$(linkSelector).mouseleave(function() {
			var id = $(this).attr("id");
			$("#li_"+id).removeClass("isHighlighted");
		});
		if (vm.cheat) $(linkSelector).css("color", "blue");
		// mark completed
		vm.initCodeFor = vm.o.level;
	};

	vm.initCodeScreen = function() {
		// clear old code and conversation
		vm.codeDiv.empty();
		$("#conversation-content").empty();
		$("#pre-input-content").empty();
		// make sure you only show this current scripture
		vm.showRightScripture();
		// make the code a sortable list - nice module feature
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
		// show code, fade in
		customHide(vm.codeDiv);
		setTimeout(function() {
			customShow(vm.codeDiv);
			customShow($("#code-header-title"));
		}, 1200);
	}

	vm.showRightScripture = function() {
		if (vm.o.level == 3) {
			// a bit hacky, to select old and new testament both
			vm.scriptPsId = "old-t-scripture p, #new-t-scripture";
			customShow($(".prophecy-scripture .section"));
			return; // no scripture hidden for prophecy level
		}
		$(".scripture-partial").each(function(index) {
			$(this).hide();
		});
		if (vm.o.level == 0) {
			vm.scriptPsId = "origins-scripture";
		}
		else if (vm.o.level == 1) {
			vm.scriptPsId = "genesis-scripture";
		}
		else if (vm.o.level == 2) {
			vm.scriptPsId = "passover-scripture";
		}
		else if (vm.o.level == 4) {
			vm.scriptPsId = "the-word-scripture";
		}
		else if (vm.o.level == 5) {
			vm.scriptPsId = "gospel-scripture";
		}
		$("#"+vm.scriptPsId).show();
		$("#"+vm.scriptPsId+" .section").each(function() {
			customHide($(this));
		});
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
		// only gets the first error
		var oldErrorStr = vm.errorMsgContainer.children("#errors")
																			 .children("p").html();
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
		// look at lines of code in order
		for (var i = 0; i < codeTree.length; i++) {
			var codeLine = codeTree[i];
			var curId = codeLine.item_id;
			var parentId = codeLine.parent_id;
			curDepth = codeLine.depth;
			var hasErrorType = "no error";
			// do checks here - hasChild first, then before
			for (var j = 0; j < vm.rules.length; j++) {
				if (hasErrorType !== "no error") break;
				var rule = vm.rules[j];
				// check if any rule is broken
				if (rule.rule == "hasChild" &&
					  rule.postId == curId && rule.preId != parentId) {
					if (missingRuleIds(rule) === "") {
						var errStr = (vm.fileName + ": error: " + rule.error);
						errStr = errStr + "<br>&nbsp;";
						// made same mistake - offer hint
						if (oldErrorStr === errStr) {
							if (curId.length % 2 === 0)
								var hint = "(Try moving the " + rule.postId +
									" line within the " + rule.preId + " part of code.)";
							else
								var hint = "(The " + rule.postId + " line makes most " +
									"sense inside the " + rule.preId + " part of code.)";
							errStr = errStr.replace("&nbsp;", hint + "<br>");
						}
						hasErrorType = "hasChild";
					}
					else {
						var errStr = (vm.fileName + ": error: missing " +
						              missingRuleIds(rule) + " line in file.");
						// made same mistake - offer hint
						if (oldErrorStr === errStr) {
							var hint = "(Look for a line related to "+
								missingRuleIds(rule) + " in the text.)";
							errStr = errStr + "<br>" + hint;
						}
						missingError = true;
						hasErrorType = "missing";
					}
					vm.addPtoElem(errStr, errors);
				}
			}
			for (var j = 0; j < vm.rules.length; j++) {
				if (hasErrorType !== "no error") break;
				var rule = vm.rules[j];
				// check if before rule is broken
				if (rule.rule == "before" && 
						rule.postId == curId && seenIds.indexOf(rule.preId) == -1) {
					if (missingRuleIds(rule) === "") {
						var errStr = (vm.fileName + ": error: " + rule.error);
						errStr = errStr + "<br>&nbsp;";
						// made same mistake - offer hint
						if (oldErrorStr === errStr) {
							if (curId.length % 2 == 0)
								var hint = "(The " + curId +
									" line is missing a line before it" +
									" or makes more sense somewhere later in the code.)";
							else
								var hint = "(Try moving the " + curId +
									" line to a logical place further down in the code "+
									"or moving a certain other line before it.)";
							errStr = errStr.replace("&nbsp;", hint + "<br>");
						}
						hasErrorType = "before";
					}
					else {
						var errStr = (vm.fileName + ": error: missing " +
						              missingRuleIds(rule) + " line in file.");
						// made same mistake - offer hint
						if (oldErrorStr === errStr) {
							var hint = "(Look for a line related to "+
								missingRuleIds(rule) + " in the text.)";
							errStr = errStr + "<br>" + hint;
						}
						missingError = true;
						hasErrorType = "missing";
					}
					vm.addPtoElem(errStr, errors);
				}
			}
			seenIds.push(curId);
			prevDepth = curDepth;
			// found error(s) on this line! code crashes and breaks
			if (hasErrorType !== "no error") {
				$("#li_"+curId).addClass("hasError");
				break;
			}
		}
		// check for missing elements if everything else is good
		var shuffledLineLinks = shuffleArray(codeIds);
		if (hasErrorType === "no error") {
			for (var i = shuffledLineLinks.length - 1; i >= 0; i--) {
				lineId = shuffledLineLinks[i];
				if (seenIds.indexOf(lineId) == -1) {
					var errStr = (vm.fileName + ":" + " error: missing " +
						lineId + " line in file.");
					missingError = true;
					hasErrorType = "missing"
					vm.addPtoElem(errStr, errors);
					break;
				}
			}
		}
		vm.errorMsgContainer.empty();
		$("#conversation-content").empty();
		if (hasErrorType === "no error") {
			vm.o.codeCompiles = true;
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

	vm.showYou = function() {
		customShow($("#you-container"));
	}

	vm.initProphecyLevel = function() {
		console.log("initProphecyLevel");
		// after partials load, show text
		setTimeout(function() {
			console.log("initProphecyLevel timeout");
			$(".scripture-box").each(function(i, elem) {
				var scriptureBoxId = this.id;
				var sectionId = "section-" + scriptureBoxId;
				$(this).click(function() {
					var isOT = $(this).parent().hasClass("left-sidebar");
					// hide all scriptures in this testament
					var scriptureContainerId = (isOT) ?
						"old-t-scripture" : "new-t-scripture";
					$("#"+scriptureContainerId+" .section").hide();
					// show clicked scripture
					$("#"+sectionId).show();
					// highlight current selected box
					$(this).parent().find(".scripture-box").removeClass("selected");
					$(this).addClass("selected");
				});
			});
			customShow($("#old-t-title"));
			customShow($("#new-t-title"));
			$("#samuel").click();
			$("#matthew").click();			
		}, 50);
	};

	vm.init();
}])
