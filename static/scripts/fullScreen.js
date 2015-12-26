
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
				vm.initLevel();
			});
		}
		// the Word
		else if (vm.o.level === 4) {
			vm.o.level = 5;
			vm.initLevel();
		}
	}

	$("#you-click").click(function() {
		customShow($("#you-container"));
	});

}]);