'use strict';

angular.module('Friends').service('activitiesData', ['$q', 'backendServices', function ($q, backendServices) {
	
	function getAll () {
		var projection = ['Text', 'Likes', 'Picture', 'CreatedBy', 'CreatedAt'],
			sort = {
				field: 'CreatedAt',
				descending: true
			},
			expandExp = {
				'CreatedBy': { 'SingleField': 'DisplayName' },
				'Likes': { 'SingleField': 'DisplayName' }
			};

		return backendServices.activities.query(expandExp, sort, projection);
	}

	return {
		getAll: getAll
	};
}]);