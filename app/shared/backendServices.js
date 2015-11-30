'use strict';

angular.module('Friends').service('backendServices', ['$q', 'toastr', 'API_KEY', 'LOADER_URL', 'MISSING_IMAGE_URL', function ($q, toastr, API_KEY, LOADER_URL, MISSING_IMAGE_URL) {
	var backEnd = new Everlive({
		apiKey: API_KEY,
		helpers: {
			html: {
				processOnResize: true, // to easily notice images are responsive
				loadingImageUrl: LOADER_URL,
				errorImageUrl: MISSING_IMAGE_URL
			}
		}
	});

	var htmlHelper = backEnd.helpers.html,
		exposableProcessor = htmlHelper.process.bind(backEnd.helpers.html),
		ERROR_MSG = 'Sorry, something went wrong.';

	function dbQuery (collection, expandExp, sorting, projection) {
		var dataAccess = backEnd.data(collection),
			query = new Everlive.Query();

		if (sorting) {
			var order = sorting.descending ? 'orderDesc' : 'order';
			query[order](sorting.field);
		}

		if (Array.isArray(projection)) {
			query.select.apply(query, projection);
		} else if (typeof projection === 'string') {
			query.select(projection);
		}

		// wrapping the promise of the SDK in a $q promise
		// in order to avoid having to call $scope.$apply(),
		// when querying in a controller
		return $q.when(dataAccess.expand(expandExp || {}).get(query))
			.then(function (response) {
				return response.result;
			})
			.catch(function () {
				toastr.error(ERROR_MSG, 'Error');
			});
	}

	function getById (collection, id, expandExp) {
		var query = backEnd.data(collection)
			.expand(expandExp || {})
			.getById(id);

		return $q.when(query)
			.then(function (response) {
				return response.result;
			})
			.catch(function () {
				toastr.error(ERROR_MSG, 'Error');
			});
	}

	function getDataAccessObj (collectionName) {
		return {
			query: dbQuery.bind(null, collectionName),
			getById: getById.bind(null, collectionName)
		};
	}

	return {
		activities: getDataAccessObj('Activities'),
		users: getDataAccessObj('Users'),
		files: getDataAccessObj('Files'),
		processResponsiveImage: exposableProcessor
	};
}]);