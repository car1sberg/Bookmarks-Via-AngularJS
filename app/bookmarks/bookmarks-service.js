
(function() {
	'use strict';

	angular
		.module('bookmarks.service', [])
		.service('BookmarksService', BookmarksService);

	function BookmarksService($http, $q, $stateParams) {
		var vm = this,
			URLS = {
				FETCH: 'json/bookmarks.json'
			},
			bookmarks;
		
		function extract(result){
			return result.data;
		}

		function cacheBookmarks(result){
			bookmarks = extract(result);
			return bookmarks;
		}
		
		// Getting BookmarkList
		vm.getBookmarks = function() {
			// return (bookmarks) ? $q.when(bookmarks) : $http.get(URLS.FETCH).then(cacheBookmarks);
			var deferred = $q.defer();

			if (bookmarks) {
				deferred.resolve(bookmarks);
			}
			else {
				$http.get(URLS.FETCH).then(function(bookmarks){
					deferred.resolve(cacheBookmarks(bookmarks));
				});
			}
			return deferred.promise;
		};

		vm.deleteBookmark = function(bookmark){
			_.pull(bookmarks, bookmark);
		}

		vm.createBookmark = function(bookmark){
			bookmark.id = parseInt(_.uniqueId('100'));
			bookmarks.push(bookmark);
		}

		
		vm.findBookmarkById = function(bookmarkId){
			bookmarkId = parseInt(bookmarkId);
			return _.find(bookmarks, {id: bookmarkId});
		}

		vm.updateBookmark = function(bookmark){
			var index = _.findIndex(bookmarks, {id: bookmark.id});
			bookmarks[index] = bookmark;
		}

		vm.deleteBookmarksByCategory = function(category){	
			_.remove(bookmarks, {category: category.name});
        }
	}
})();