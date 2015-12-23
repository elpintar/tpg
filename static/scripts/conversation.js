
// parent = CodeController (in tpg.js)
app.controller('ConversationController', ['$scope', function($scope) {
	var vm = $scope;

	vm.init = function() {
		vm.initTextField();
		vm.curCommand = {};
		vm.curCommand.text = "";
		vm.o.conversationHappening = false;
		if (vm.o.startConvoNow) {
			vm.o.codeCompiles = true;
			setTimeout(function(){
				vm.startConvo();
			}, 2000);
		}
	};

	vm.clearConvo = function() {
		vm.clearInput();
		vm.o.conversationHappening = false;
	}

	// start the conversation for this level
	vm.startConvo = function() {
		// don't start unless the code works and you haven't started yet
		if (!vm.o.codeCompiles || vm.o.conversationHappening) return;
		console.log("starting convo for level", vm.o.level);
		// add a 0.1 to the current level so if they reload, it starts the convo
		vm.updateLevelInURL((vm.o.level + 0.1).toString());
		if (vm.o.level == 1) {
			vm.convObj = serpentObj;
			vm.curStatement = serpentStart;
			vm.respondAndAsk("", true);
			vm.o.conversationHappening = true;
		}
		if (vm.o.level == 2) {
			vm.convObj = desertObj;
			vm.curStatement = desertStart;
			vm.respondAndAsk("", true);
			vm.o.conversationHappening = true;
		}
		if (vm.o.level == 4) {
			$("#full-screen-container").fadeOut(2000, function() {
				setTimeout(function() {
					vm.o.level = 5;
					vm.initLevel();
					vm.clearConvo();
				}, 2000);
			});
		}
		if (vm.o.level == 5) {
			vm.convObj = endConvoObj;
			vm.curStatement = endConvoStart;
			vm.respondAndAsk("", true);
			vm.o.conversationHappening = true;
		}
	}

	vm.initTextField = function() {
		vm.typing = false;
		vm.blinkGo = true;
		vm.blinkPause = 777;
		var blink = function(){
			if (vm.typing && vm.blinkGo) {
	      $('#input-box').toggleClass('blink');
	   	}
    }
	  setInterval(blink, vm.blinkPause);
    var blinkWait = function() {
    	vm.blinkGo = false;
    	$("#input-box").addClass('blink');
    	setTimeout(function() {
    		vm.blinkGo = true;
    	}, vm.blinkPause);
    }
    // focus in and out of prompt field
    $("#prompt").focus(function() {
    	$("#input-box").removeClass('inactive');
    	if (!vm.typing) {
			  vm.typing = true;
			}
		});
		$("#prompt").blur(function() {
			$("#input-box").addClass('inactive').removeClass('blink');
		  vm.typing = false;
		});
		// stop backspace from going back a page
		$("#prompt").keypress(function(event) {
			// ENTER / RETURN
		  if (event.which == 13) {
		  	if (vm.o.conversationHappening) {
			  	vm.questionAnswer();
			  }
			  else {
			  	$scope.$apply(function() {
			  		oldText = vm.curCommand.text;
			  		if (oldText.length == 0) oldText = " ";
			  		var newP = $("<p>").html(oldText).css("white-space","pre");
			  		$("#conversation-content").append(newP);
				  	vm.curCommand.text = "";
			  	});
			  }
		    event.preventDefault();
		  }
		  // SPACE -> &nbsp;
		  else if (event.which == 32) {
		  	$scope.$apply(function() {
			  	vm.curCommand.text = vm.curCommand.text + " ";
		  	});
		  	event.preventDefault();
		  }
		  // any other character
		  else {
		  	var c = String.fromCharCode(event.which);
		  	$scope.$apply(function() {
			  	vm.curCommand.text = vm.curCommand.text + c;
		  	});
		  	event.preventDefault();
		  }
		});
		$("#prompt").keydown(function(event) {
		  // BACKSPACE
		  if (event.keyCode === 8) {
		  	$scope.$apply(function() {
		  		var text = vm.curCommand.text;
			  	var negOneIndex = Math.max(text.length - 1, 0);
			  	var newText = text.substring(0, negOneIndex);
			  	vm.curCommand.text = newText;
			  	event.preventDefault();
		  	});
		  }
		  blinkWait();
		});
	}

	vm.clearInput = function() {
		vm.curCommand.text = "";
	}

	vm.curQuestionStr = function() {
		var statement = vm.curStatement;
		var stObj = vm.convObj[statement];
		// append question text
		var qText = stObj.qText;
		var options = " [y/n]";
		if ("bothResp" in stObj) options = " ";
		return qText + options;
	}

	// check for a special case!
	vm.onStatementChange = function() {
		var newStatement = vm.curStatement;
		// serpent
		if (vm.o.level === 1) {
			if (newStatement === "delightful") {
				appleOverlay();
			}
			else if (newStatement === "appleBit") {
				sinEntersTheWorld();
			}
			else if (newStatement === "(end)") {
				vm.o.level = 2;
				vm.initLevel();
				vm.clearConvo();
			}
		}
		// desert
		else if (vm.o.level === 2) {
			$("#code-full-screen").empty()
			if (newStatement === "(end)") {
				vm.clearConvo();
				$("#full-screen-container").fadeIn(2000, function() {
					setTimeout(function() {
						vm.o.level = 3;
						vm.initLevel();
					}, 2000);
				});
			}
		}
		else if (vm.o.level === 5) {
			if (newStatement === "(end)") {
				customShow($("#ending-container"));
			}
		}
	}

	// get response text and change current statement!
	vm.applyResponse = function(response) {
		var statement = vm.curStatement;
		var stObj = vm.convObj[statement];
		var responseStr = "";
		if ("bothResp" in stObj) {
			vm.curStatement = stObj.nextQ;
			// special cases
			vm.onStatementChange();
			return "<br>" + stObj.bothResp;
		}
		else if (response == "") {
			return "";
		}
		else {
			// get correct response string
			if (response === "y") {
				responseStr = stObj.yResp;
			}
			else if (response === "n") {
				responseStr = stObj.nResp;
			}
			// change current statement
			if (stObj.yNext && response === "y") {
				vm.curStatement = stObj.yNext;
			}
			else if (stObj.nNext && response == "n") {
				vm.curStatement = stObj.nNext;
			}
			else {
				vm.curStatement = stObj.nextQ;
			}
			// special cases
			vm.onStatementChange();
			// <br> added because you usually want a break
			return "<br>" + responseStr;
		}
	}

	vm.getPreText = function() {
		var stObj = vm.convObj[vm.curStatement];
		var preText = stObj.preText;
		if (preText) {
			return preText;
		}
		else {
			return "";
		}
	}

	// generate next set of response and question in the conversation
	vm.respondAndAsk = function(response, noRespond) {
		// respond to previous answer if we should
		if (noRespond === undefined || noRespond === false) {
			var responseStr = vm.applyResponse(response);
		}
		else var responseStr = "";
		// stop if we switched to the last statement
		if (vm.curStatement === "(end)") return;
		// append optional pre-text
		var preText = vm.getPreText();
		// get current question
		var questionStr = vm.curQuestionStr();
		// display text in prompt
		var statementStr = responseStr + preText + questionStr;
		var responseP = $("<span>").html(statementStr);
		vm.moveOutInputContent();
		$("#pre-input-content").append(responseP);
		if (noRespond === undefined || noRespond === false)
			vm.scrollDown(responseP.height());
	}

	vm.moveOutInputContent = function() {
		// copy out old preInput and input contents
		var preInput = $("#pre-input-content");
		var oldContents = preInput.contents();
		var oldContentsSpan = $("<span>").append(oldContents);
		var oldInput = vm.curCommand.text;
		var oldInputSpan = $("<span>").html(" " + oldInput);
		var newP = $("<p>");
		// only move stuff out if it is there!
		if (oldContents.length > 0) newP.append(oldContentsSpan);
		if (oldInput.length > 0) newP.append(oldInputSpan);
		if ((oldContents.length > 0) || (oldInput.length > 0)) {
			$("#conversation-content").append(newP);
			// empty preInput and input contents
			preInput.empty();
			$scope.$apply(function() {
				vm.clearInput();
			});
		}
	}

	// to be called whenever we add something - scroll down!
	vm.scrollDown = function(spaceFromTop) {
		var promptDiv = $("#prompt");
		var promptPadding = extractNumFromString(promptDiv.css("padding-top"));
		// add spacer so the content is at the top
		if (spaceFromTop) {
			var spaceHeight = promptDiv.outerHeight() - 
				(spaceFromTop + promptPadding);
			$("#post-content-spacer").height(spaceHeight);
		}
		// scroll to the top of the new content
		var oldContentDiv = $("#conversation-content");
  	promptDiv.scrollTop(oldContentDiv.height() + promptPadding);
	}

	vm.questionAnswer = function() {
		var answer = vm.curCommand.text;
		var yesAnswers = ["y", "yes", "Y", "Yes"];
		var noAnswers = ["n", "no", "N", "No"];
		// yes answer
		if (yesAnswers.indexOf(answer) !== -1) {
			vm.respondAndAsk("y");
		}
		else if (noAnswers.indexOf(answer) !== -1) {
			vm.respondAndAsk("n");
		}
		else if ("bothResp" in vm.convObj[vm.curStatement]) {
			vm.respondAndAsk("");
		}
		else {
			vm.moveOutInputContent();
			// put in error and restate question
			var errorMsg = "<br>error: unrecognized input: \"";
			errorMsg = errorMsg + answer + "\"<br><br>" + vm.curQuestionStr();
			var errorP = $("<span>").html(errorMsg);
			$("#pre-input-content").append(errorP);
			vm.scrollDown(errorP.height());
		}
	}

	vm.init();
}]);
