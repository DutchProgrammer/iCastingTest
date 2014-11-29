
angular.module('angularTest').controller('HomeController', ['$rootScope', '$scope', '$timeout', 'api', function ($rootScope, $scope, $timeout, api) {

	$scope.maxSteps = 4;	
	
	$scope.genders      = ['male', 'female'];
	$scope.interests    = ['soccer', 'tennis', 'hockey', 'fitness'];
	$scope.modelOptions = { updateOn: 'blur' };

	$scope.saveGender = function (event) {
		var genderElement = angular.element(event.originalTarget);
		var gender        = genderElement.val();

		if (gender === "" || $scope.genders.indexOf(gender) === -1) {
			//Show error
			console.info(gender, 'not found');
		} else {
			$scope.user.properties.gender = gender;
		}
	};

	$scope.saveInterest = function (event) {
		var interestElement = angular.element(event.originalTarget);
		var interest        = interestElement.val();

		if (interest === "" || $scope.interests.indexOf(interest) === -1) {
			//Show error
			console.info(interest, 'not found');
		} else {

			if (interestElement.attr('checked') ) {

				if ( $scope.user.properties.interests.indexOf(interest) === -1) {
					$scope.user.properties.interests.push(interest);
				}

			} else {
				var interestIndex = $scope.user.properties.interests.indexOf(interest);


				if ( interestIndex !== -1) {
					$scope.user.properties.interests.splice(interestIndex, 1);
				}
			}
		}
	};

	$scope.submit = function(form, userKey) {

		if ($scope.step >= $scope.maxSteps) {
			return false;
		}

		form.formStatus       = 'waiting';
		form.formButtonStatus = 'btn-info';
		form.formStatusInfo   = 'fa-spinner fa-spin';

		//Patch Data
		var patchData = {};//For All use $scope.user;

		patchData[userKey] = $scope.user[userKey];

		//Save data
		api.saveUser(patchData).then(function (response) {

			//Check if status is ok
			if (response.status === 'ok') {

				//Add success
				form.formStatus       = 'success';
				form.formButtonStatus = 'btn-success';
				form.formStatusInfo   = 'fa-check';
			} else {
				//Add error
				form.formStatus       = 'error';
				form.formButtonStatus = 'btn-danger';
				form.formStatusInfo   = 'fa-ban';
			}

			$timeout(function () {
				//Set default
				form.formStatus       = '';
				form.formButtonStatus = 'btn-default';
				form.formStatusInfo   = '';

				$scope.step++;

				//Apply Change
				$scope.$apply();
			}, 2500);

		},
		function () {
			console.error(arguments, 'error');

			//Add error
			form.formStatus       = 'error';
			form.formButtonStatus = 'btn-danger';
			form.formStatusInfo   = 'fa-ban';

			$timeout(function () {
				//Set default
				form.formStatus       = '';
				form.formButtonStatus = 'btn-default';
				form.formStatusInfo   = '';

				$scope.step++;

				//Apply Change
				$scope.$apply();
			}, 2500);

		});
	};

	$scope.reset = function () {
		//Set defaults
		$scope.step = 1;

		api.getUser().then(function (response) {
			console.info(response.userData, 'userData');
			$scope.user        = response.userData;
			$rootScope.loading = false;

			console.info($scope.user, '$scope.user');

		}, function () {
			console.error(arguments, 'error');
		});

		$scope.accountBlock.formStatus          = '';
		$scope.accountBlock.formButtonStatus    = 'btn-default';
		$scope.accountBlock.formStatusInfo      = '';
		
		$scope.blockName.formStatus             = '';
		$scope.blockName.formButtonStatus       = 'btn-default';
		$scope.blockName.formStatusInfo         = '';
		
		$scope.blockProperties.formStatus       = '';
		$scope.blockProperties.formButtonStatus = 'btn-default';
		$scope.blockProperties.formStatusInfo   = '';
	};
	
	$scope.$on('$viewContentLoaded', function () {
		$scope.reset();
	});

}]);