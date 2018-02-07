(function(){

    // Generating bookmark list and delete method
    var bookmarkList = {
        templateUrl: 'app/bookmarks/components/bookmark-list.html',
        controller: function ($stateParams, $state, BookmarksService){
            var vm = this;

            vm.currentCategoryName = $stateParams.category;
            
            BookmarksService.getBookmarks()
                .then(function(result){
                    vm.bookmarks = result;
                })

            vm.deleteBookmark = function(bookmark){
                BookmarksService.deleteBookmark(bookmark);
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
                setTimeout(function(){
                    BookmarksService.createBookmark(bookmark);
                }, 400)
                vm.cancelCreating();
            }

            vm.cancelCreating = function(){
                setTimeout(function(){
                    $state.go('app.bookmarks');
                }, 400)
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
                setTimeout(function(){
                    BookmarksService.updateBookmark(bookmark);
                    $state.go('app.bookmarks');
                }, 400)
            }

            vm.cancelEditing = function(){
                category: $stateParams.category;
                setTimeout(function(){
                    $state.go('app.bookmarks');
                }, 400)
            }
        }
    }

    angular
        .module('bookmark.components',[])

        .component('bookmarkList', bookmarkList)
        .component('bookmarkCreate', bookmarkCreate)
        .component('bookmarkEdit', bookmarkEdit)
}());