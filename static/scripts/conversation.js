
// parent = CodeController (in tpg.js)
app.controller('ConversationController', ['$scope', function($scope) {
	var vm = $scope;

	vm.init = function() {
		vm.initTextField();
		vm.curCommand = {};
		vm.curCommand.text = "";
	};

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
    	if (!vm.typing) {
			  vm.typing = true;
			  $("#command-input").focus();
			}
		});
		$("#command-input").blur(function() {
			$("#input-box").addClass('blink');
		  vm.typing = false;
		});
		// stop backspace from going back a page
		$("#command-input").keypress(function(event) {
			// ENTER / RETURN
		  if (event.which == 13) {
		  	$scope.$apply(function() {
		  		oldText = vm.curCommand.text;
		  		if (oldText.length == 0) oldText = " ";
		  		var newP = $("<p>").html(oldText);
		  		$("#conversation-content").append(newP);
			  	vm.curCommand.text = "";
		  	});
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

	// start the conversation for this level
	vm.startLevel = function() {
		console.log("starting convo for level", vm.level);
		if (vm.level == 1) {
			vm.convObj = serpentObj;
			vm.curStatement = serpentStart;
			vm.respondAndAsk("");
		}
	}

	vm.respondAndAsk = function(response) {
		var statement = vm.curStatement;
		var stObj = vm.convObj[statement];
		var stStr = "";
		// append optional pre-text
		var preText = stObj.preText;
		if (preText) {
			stStr = stStr + preText;
		}
		// append question text
		var qText = stObj.qText;
		var options = " [y/n] "
		qText = qText + options;
		// display text in prompt
		var responseP = $("<p>").html(stStr);
		$("#prompt").append(responseP);
	}

	vm.init();
}])
