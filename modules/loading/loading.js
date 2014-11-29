app.factory('loading', ['$rootScope', function ($rootScope) {

	return {
		"show" : function () {
			console.info('show');
			$rootScope.loading = true;
		},
		"hide" : function () {
			console.info('hide');
			$rootScope.loading = false;
		}
	};
}]);