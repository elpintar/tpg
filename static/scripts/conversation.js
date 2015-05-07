
// parent = CodeController (in tpg.js)
app.controller('ConversationController', ['$scope', function($scope) {
	var vm = $scope;

	vm.init = function() {
		vm.initTextField();
		vm.curCommand = {};
		vm.curCommand.text = "";
		vm.conversationHappening = false;
		if (vm.o.startConvoNow) {
			vm.codeCompiles = true;
			setTimeout(function(){
				vm.startConvo();
			}, 2000);
		}
	};

	vm.reinit = function() {
		vm.clearInput();
		vm.conversationHappening = false;
	}

	// start the conversation for this level
	vm.startConvo = function() {
		// don't start unless the code works and you haven't started yet
		if (!vm.codeCompiles || vm.conversationHappening) return;
		console.log("starting convo for level", vm.o.level);
		if (vm.o.level == 1) {
			vm.convObj = serpentObj;
			vm.curStatement = serpentStart;
			vm.respondAndAsk("");
			vm.conversationHappening = true;
		}
		if (vm.o.level == 2) {
			vm.convObj = desertObj;
			vm.curStatement = desertStart;
			vm.respondAndAsk("");
			vm.conversationHappening = true;
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
			  $("#command-input").focus();
			}
		});
		$("#command-input").blur(function() {
			$("#input-box").addClass('inactive').removeClass('blink');
		  vm.typing = false;
		});
		// stop backspace from going back a page
		$("#command-input").keypress(function(event) {
			// ENTER / RETURN
		  if (event.which == 13) {
		  	if (vm.conversationHappening) {
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
		});
		$("#command-input").keydown(function(event) {
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
		if (stObj.bothResp) options = " ";
		return qText + options;
	}

	// check for a special case!
	vm.onStatementChange = function() {
		var newStatement = vm.curStatement;
		if (vm.o.level === 1) {
			if (newStatement === "delightful") {
				appleOverlay();
			}
			else if (newStatement === "(end)") {
				sinEntersTheWorld(function(){
					vm.o.level = 2;
					vm.initLevel();
					vm.reinit();
				});
			}
		}
	}

	// get response text and change current statement!
	vm.applyResponse = function(response) {
		var statement = vm.curStatement;
		var stObj = vm.convObj[statement];
		var responseStr = "";
		if (stObj.bothResp) {
			vm.curStatement = stObj.bothNext;
			return "<br>" + stObj.bothResp;
		}
		if (response == "") {
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
	vm.respondAndAsk = function(response) {
		// respond to previous answer
		var responseStr = vm.applyResponse(response);
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
		if (response !== "") vm.scrollDown(responseP.height());
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
