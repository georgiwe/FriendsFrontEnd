'use strict';

angular.module('Friends').service('activitiesData', ['$q', 'backendServices', function ($q, backendServices) {
	
	function getAll () {
		var query = new backendServices.Query()
				.orderDesc('CreatedAt')
				.select('Text', 'Likes', 'Picture', 'CreatedBy', 'CreatedAt');

		var expandExp = {
				'CreatedBy': { 'SingleField': 'DisplayName' },
				'Likes': { 'SingleField': 'DisplayName' }
			};

		var request = backendServices.activities
			.expand(expandExp)
			.get(query);

		// wrapping the promise of the SDK in a $q promise
		// in order to avoid having to call $scope.$apply(),
		// when querying in a controller

		return $q.when(request).then(function (response) {
			return response.result;
		});
	}

	return {
		getAll: getAll
	};
}]);