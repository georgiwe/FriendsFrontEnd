'use strict';

angular.module('Friends').service('backendServices', ['API_KEY', 'LOADER_URL', function (API_KEY, LOADER_URL) {
	var backEnd = new Everlive({
		apiKey: API_KEY,
		caching: true,
		helpers: {
			html: {
				processOnResize: true,
				loadingImageUrl: LOADER_URL
			}
		}
	});

	var htmlHelper = backEnd.helpers.html,
		exposableProcessor = htmlHelper.process.bind(backEnd.helpers.html),
		activities = backEnd.data('Activities');

	return {
		activities: activities,
		Query: Everlive.Query,
		processResponsiveImage: exposableProcessor
	};
}]);