(function(){

    // Generating bookmark list and delete method
    var bookmarkList = {
        templateUrl: 'app/bookmarks/components/bookmark-list.html',
        controller: function ($stateParams, BookmarksService){
            var vm = this;

            vm.currentCategoryName = $stateParams.category;
            
            BookmarksService.getBookmarks()
                .then(function(result){
                    vm.bookmarks = result;
                });

            vm.deleteBookmark = function(bookmark){
                BookmarksService.deleteBookmark(bookmark);
                console.log('deleted');
            }

            vm.clearSearchField = function(){
                vm.search.name = '';   
            }
        }
    };
        // ~~~~ Adding Bookmark ~~~~~
    var bookmarkCreate = {
        templateUrl: 'app/bookmarks/components/bookmark-create.html',
        controller: function($stateParams, $state, BookmarksService){
            var vm = this;
            
            vm.createBookmark = function(bookmark){
                bookmark.category = $stateParams.category;
                BookmarksService.createBookmark(bookmark);
                vm.cancelCreating();
            }

            vm.cancelCreating = function(){
                $state.go('app.bookmarks');
            }
        }
    };

    // ~~~~ Edit and Update methods ~~~~
    var bookmarkEdit = {
        templateUrl: 'app/bookmarks/components/bookmark-edit.html',
        controller: function($stateParams, $state, BookmarksService){
            var vm = this;
            var currentBookmark = BookmarksService.findBookmarkById($stateParams.bookmarkId);
            vm.isEditingBookmark = angular.copy(currentBookmark);
            
            vm.updateBookmark = function(bookmark){
                BookmarksService.updateBookmark(bookmark);
                vm.cancelEditing();  
            }

            vm.cancelEditing = function(){
                $state.go('app.bookmarks');
                category: $stateParams.category;
            }
        }
    }

    angular
        .module('bookmark.components',[])

        .component('bookmarkList', bookmarkList)
        .component('bookmarkCreate', bookmarkCreate)
        .component('bookmarkEdit', bookmarkEdit)
}())