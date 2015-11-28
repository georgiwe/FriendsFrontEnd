'use strict';

angular.module('Friends').service('activitiesData', ['$q', 'backendServices', function ($q, backendServices) {
	
	function getAll () {
		var defered = $q.defer(),
			query = new backendServices.Query().orderDesc('CreatedAt'),
			expandExp = {
				'Picture': { 'SingleField': 'Uri' },
				'CreatedBy': { 'SingleField': 'DisplayName' },
				'Likes': { 'SingleField': 'DisplayName' }
			};

		backendServices.activities
			.expand(expandExp)
			.get(query)
			.then(function (response) {
				defered.resolve(response.result);
			});

		// wrapping the promise of the SDK in a $q promise
		// in order to avoid having to call $scope.$apply(),
		// when querying in a controller
		return defered.promise;
	}

	return {
		getAll: getAll
	};

}]);