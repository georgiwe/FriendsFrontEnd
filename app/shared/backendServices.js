'use strict';

angular.module('Friends').service('backendServices', ['API_KEY', 'LOADER_URL', 'MISSING_IMAGE_URL', function (API_KEY, LOADER_URL, MISSING_IMAGE_URL) {
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

	return {
		activities: activities,
		users: users,
		files: files,
		Query: Everlive.Query,
		processResponsiveImage: exposableProcessor,
		getFileUri: getFileUri
	};
}]);