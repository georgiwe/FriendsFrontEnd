'use strict';

angular.module('Friends').service('usersData', ['backendServices', function (backendServices) {

	function getAll () {
		var projection = ['DisplayName', 'Username', 'Picture'],
			sorting = { field: 'DisplayName' };
			
		return backendServices.users.query(null, sorting, projection);
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

		return backendServices.users.getById(userId, expandExp);
	}

	return {
		getAll: getAll,
		getById: getById
	};
}]);
	