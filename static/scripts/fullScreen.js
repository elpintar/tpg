
// parent = CodeController (in tpg.js)
app.controller('FullScreenController', ['$scope', function($scope) {
	var vm = $scope;

	vm.tryTransition = function() {
		// stop if the code doesn't compile yet
		if (!vm.o.codeCompiles) return;
		// origins
		if (vm.o.level === 0) {
			originsTransition(function() {
				vm.o.level = 1;
				console.log("lower vm.level is", vm.o.level);
				vm.initLevel();
			});
		}
		// the Word
		else if (vm.o.level === 3) {
			console.log("ON TO ROMANS");
		}
	}

	$("#you-click").click(function() {
		console.log("hi");
		customShow($("#you-container"));
	});

}]);