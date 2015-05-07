
// parent = CodeController (in tpg.js)
app.controller('FullScreenController', ['$scope', function($scope) {
	var vm = $scope;

	vm.tryTransition = function() {
		// stop if the code doesn't compile yet
		if (!vm.codeCompiles) return;
		originsTransition(function() {
			vm.o.level = 1;
			console.log("lower vm.level is", vm.o.level);
			vm.initLevel();
		});
	}

}]);