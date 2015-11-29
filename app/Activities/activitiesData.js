'use strict';

angular.module('Friends').service('activitiesData', ['$q', 'backendServices', function ($q, backendServices) {
	
	function getAll () {
		// var query = new backendServices.Query()
		// 		.orderDesc('CreatedAt')
		// 		.select('Text', 'Likes', 'Picture', 'CreatedBy', 'CreatedAt');

		// var request = backendServices.activities
		// 	.expand(expandExp)
		// 	.get(query);

		var projection = ['Text', 'Likes', 'Picture', 'CreatedBy', 'CreatedAt'],
			sort = {
				field: 'CreatedAt',
				descending: true
			},
			expandExp = {
				'CreatedBy': { 'SingleField': 'DisplayName' },
				'Likes': { 'SingleField': 'DisplayName' }
			};

		return backendServices.queryActivities(expandExp, sort, projection);

		// wrapping the promise of the SDK in a $q promise
		// in order to avoid having to call $scope.$apply(),
		// when querying in a controller

		// return $q.when(request).then(function (response) {
		// 	return response.result;
		// });
	}

	return {
		getAll: getAll
	};
}]);