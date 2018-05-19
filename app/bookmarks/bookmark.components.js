(function(){

    // Generating bookmark list and delete method
    var bookmarkList = {
        templateUrl: 'app/bookmarks/components/bookmark-list.html',
        controller: function ($stateParams, $state, BookmarksService, ActionService){
            var vm = this;
            vm.currentCategoryName = $stateParams.category;

            BookmarksService.getBookmarks()
                .then(function(response){
                    vm.bookmarks = response;
                });

            vm.deleteBookmark = function(bookmark){
                BookmarksService.deleteBookmark(bookmark);
                ActionService.setMessage(`${bookmark.name} bookmark was deleted`);
            };

            vm.clearSearchField = function(){
                ActionService.setMessage('Search field was cleared');
                vm.search.name = '';
            };

            // activity messages
            vm.addBookmarkClick = function () {
                ActionService.setMessage('Creating a bookmark');
            };

            vm.editBookmarkClick = function(name) {
                ActionService.setMessage(`${name} bookmark is editing`);
            };

            vm.searchFieldClick = function(name){
                ActionService.setMessage('Looking for some bookmarks...');
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
                            if (self.newBookmark.name.length !== 0) {
                                self.newBookmark.category = $stateParams.category;
                                BookmarksService.createBookmark(self.newBookmark);
                                ActionService.setMessage(`${self.newBookmark.name} bookmark was created!`)
                                $state.go('app.bookmarks');
                                ngDialog.close();
                            }
                        };
            
                        self.cancelCreating = function(){
                            ActionService.setMessage('Creating canceled');
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
                        if (self.isEditingBookmark.name.length !== 0){
                            BookmarksService.updateBookmark(bookmark);
                            ActionService.setMessage(`${currentBookmark.name} is now ${bookmark.name} bookmark`)
                            $state.go('app.bookmarks');
                            ngDialog.close();
                        }
                    };

                    self.cancelEditing = function(){
                        ActionService.setMessage('Editing cancelled');
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