'use strict';

angular.module('Friends').service('usersData', ['$q', 'backendServices', function ($q, backendServices) {

	function getAll () {
		var query = new backendServices.Query()
				.order('DisplayName')
				.select('DisplayName', 'Username', 'Picture');

		var request = backendServices.users.get(query);

		return $q.when(request).then(function (response) {
			return response.result;
		});
	}

	function getById (userId) {
		var expandExp = { 
			'Activities.Likes': {
				'ReturnAs': 'Likes',
				'Expand': {
					'CreatedBy': {
						'TargetTypeName' : 'Users',
						'SingleField': 'DisplayName'
					}
				},
				'Fields': {
					'CreatedBy': 1,
					'Text': 1
				}
			}
		};

		return $q.when(backendServices.users.expand(expandExp).getById(userId))
			.then(function (response) {
				return response.result;
			});
	}

	return {
		getAll: getAll,
		getById: getById
	};
}]);
	