// prophecy.js

// parent = CodeController (in tpg.js)
app.controller('ProphecyController', ['$scope', function($scope) {
	var vm = $scope;

	vm.initProphecyLevel = function() {
		console.log("initProphecyLevel");
		setTimeout(function() {
			customShow($("#old-t-title"));
			customShow($("#new-t-title"));
			customShow($(".prophecy-scripture .section"));
		}, 500);
	};

	vm.initProphecyLevel();
}]);
