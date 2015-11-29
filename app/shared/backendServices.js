'use strict';

angular.module('Friends').service('backendServices', ['$q', 'API_KEY', 'LOADER_URL', 'MISSING_IMAGE_URL', function ($q, API_KEY, LOADER_URL, MISSING_IMAGE_URL) {
	var backEnd = new Everlive({
		apiKey: API_KEY,
		caching: false,
		helpers: {
			html: {
				processOnResize: true,
				loadingImageUrl: LOADER_URL,
				errorImageUrl: MISSING_IMAGE_URL
			}
		}
	});

	var htmlHelper = backEnd.helpers.html,
		exposableProcessor = htmlHelper.process.bind(backEnd.helpers.html),
		activities = backEnd.data('Activities'),
		users = backEnd.data('Users'),
		files = backEnd.data('Files');

	function getFileUri (fileId) {
		return backEnd.Files.getDownloadUrl(fileId);
	}

	function query (collection, expandExp, sorting, projection) {
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

		// expandExp = expandExp || {};
		
		return $q.when(dataAccess.expand(expandExp).get(query))
			.then(function (response) {
				return response.result;
			}, function (err) {
				console.log(err);
			});
	}

	return {
		queryActivities: query.bind(null, 'Activities'),
		queryUsers: query.bind(null, 'Users'),
		files: files,
		Query: Everlive.Query,
		processResponsiveImage: exposableProcessor,
		getFileUri: getFileUri
	};
}]);