app.factory('api', ['$http', '$q', '$timeout', function ($http, $q, $timeout) {
	var apiHost = location.protocol+'//'+location.hostname+':9002/api/';

	console.info(apiHost, 'apiHost');

	return {
		"getUser" : function () {

			return $q(function(resolve, reject) {

				//Perform an delay
				$timeout(function () {
				
					$http.get(apiHost+'getUser').
					success(function (data, status, headers, config) {
						resolve({ 'status' : 'ok', 'message' : 'userData sended', 'userData' : data});
					}).
					error(function (data, status, headers, config) {
						console.error('error');
						reject({ 'status' : 'error', 'message' : 'something went wrong'});
					});
				}, 2000);

			});
		},
		"saveUser" : function (postData) {

			return $q(function(resolve, reject) {

				//Perform an delay
				$timeout(function () {
					$http.post(apiHost+'saveUser', postData).
					success(function (data, status, headers, config) {
						console.info(data, 'success');
						resolve({ 'status' : 'ok', 'message' : 'Your data has succesfully been saved'});
					}).
					error(function (data, status, headers, config) {
						console.error(arguments, 'error');
						reject({ 'status' : 'error', 'message' : 'something went wrong'});
					});
				}, 2000);
				
			});

		}
	};
}]);