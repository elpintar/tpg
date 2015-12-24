// prophecy.js

// parent = CodeController (in tpg.js)
app.controller('ProphecyController', ['$scope', function($scope) {
	var vm = $scope;

	vm.initProphecyLevel = function() {
		console.log("initProphecyLevel");
		// after partials load, show text
		setTimeout(function() {
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
			customShow($(".prophecy-scripture .section"));
			$("#samuel").click();
			$("#matthew").click();
		}, 500);
	};

	vm.initProphecyLevel();
}]);
