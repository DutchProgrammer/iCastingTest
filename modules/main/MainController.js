angular.module('angularTest').controller('MainController', ['$rootScope', '$scope', '$location', function ($rootScope, $scope, $location) {

	$rootScope.loading = true;
	// Set the loading variable
	// Set backButton to false
	$rootScope.$on("$routeChangeStart", function(event, next, current) {
		$rootScope.loading = true;
	});

	$rootScope.$on("$viewContentLoaded", function(event, next, current) {
		$scope.changePageClass();
	});

	//Add current page class to ng-view
	$scope.changePageClass = function () {
	  var pagePrefix = 'page-';

	  //Replace old pagePrefix
	  $('ng-view').addClass(function (index, currentClass) {
	    var regx = new RegExp('\\b' + pagePrefix + '.*?\\b', 'g');
	    return currentClass.replace(regx, '');
	  });

	  var pageClass = pagePrefix+$location.path().split('/')[1];
	  
	  //Set new pageprefix
	  $('ng-view').addClass(pageClass);
	};

}]);