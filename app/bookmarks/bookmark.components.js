(function(){

    // Generating bookmark list and delete method
    var bookmarkList = {
        templateUrl: 'app/bookmarks/components/bookmark-list.html',
        controller: function ($stateParams, $state, BookmarksService, ActionService){
            var vm = this;
            vm.currentCategoryName = $stateParams.category;

            BookmarksService.getBookmarks()
                .then(function(result){
                    vm.bookmarks = result;
                });

            vm.deleteBookmark = function(bookmark){
                BookmarksService.deleteBookmark(bookmark);
                ActionService.getMessage(`${bookmark.name} bookmark was deleted`);
            };

            vm.clearSearchField = function(){
                ActionService.getMessage('Search field was cleared');
                vm.search.name = '';
            };

            // activity messages
            vm.addBookmarkClick = function () {
                ActionService.getMessage('Creating a bookmark');
            };

            vm.editBookmarkClick = function(name) {
                ActionService.getMessage(`${name} bookmark is editing`);
            };

            vm.searchFieldClick = function(name){
                ActionService.getMessage('Looking for some bookmarks...');
            }
        }
    };

        // ~~~~ Adding Bookmark ~~~~~  

        var bookmarkCreate = {
            controller: function($stateParams, $state, BookmarksService, ngDialog, ActionService){
                ngDialog.open({ 
                    template: 'app/bookmarks/components/bookmark-create.html',
                    controllerAs: 'dialogCreateCtrl',
                    controller: function(){
                        var self = this;

                        self.createBookmark = function(){
                            self.newBookmark.category = $stateParams.category;
                            BookmarksService.createBookmark(self.newBookmark);
                            ActionService.getMessage(`${self.newBookmark.name} bookmark was created!`)
                            $state.go('app.bookmarks');
                            ngDialog.close();
                        };
            
                        self.cancelCreating = function(){
                            ActionService.getMessage('Creating canceled');
                            $state.go('app.bookmarks');
                            ngDialog.close();
                        };
                    }
                });
            }
        };

    // ~~~~ Edit and Update methods ~~~~
    var bookmarkEdit = {
        // templateUrl: 'app/bookmarks/components/bookmark-edit.html',
        controller: function($stateParams, $state, BookmarksService, ngDialog, ActionService){
            ngDialog.open({
                template: 'app/bookmarks/components/bookmark-edit.html',
                controllerAs: 'dialogEditCtrl',
                controller: function(){
                    var self = this;
                    var currentBookmark = BookmarksService.findBookmarkById($stateParams.bookmarkId);

                    self.isEditingBookmark = angular.copy(currentBookmark);
                    self.updateBookmark = function(bookmark){
                        BookmarksService.updateBookmark(bookmark);
                        ActionService.getMessage(`${currentBookmark.name} is now ${bookmark.name} bookmark`)
                        $state.go('app.bookmarks');
                        ngDialog.close();
                    };

                    self.cancelEditing = function(){
                        ActionService.getMessage('Editing cancelled');
                        $state.go('app.bookmarks');
                        ngDialog.close();
                    };
                }
            }); 
        }
    };

    angular
        .module('bookmark.components',[])

        .component('bookmarkList', bookmarkList)
        .component('bookmarkCreate', bookmarkCreate)
        .component('bookmarkEdit', bookmarkEdit)
}());