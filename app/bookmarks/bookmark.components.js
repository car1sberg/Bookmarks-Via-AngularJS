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
            controller: function($stateParams, $state, BookmarksService, ngDialog){  
                ngDialog.open({ 
                    template: 'app/bookmarks/components/bookmark-create.html',
                    controllerAs: 'dialogCreateCtrl',
                    controller: function(){
                        var self = this;

                        self.createBookmark = function(){
                            self.newBookmark.category = $stateParams.category;
                            BookmarksService.createBookmark(self.newBookmark);
                            self.cancelCreating();
                            ngDialog.close();
                        }
            
                        self.cancelCreating = function(){
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
        controller: function($stateParams, $state, BookmarksService, ngDialog){
            // var vm = this;
            ngDialog.open({
                template: 'app/bookmarks/components/bookmark-edit.html',
                controllerAs: 'dialogEditCtrl',
                controller: function(){
                    var self = this;
                    var currentBookmark = BookmarksService.findBookmarkById($stateParams.bookmarkId);
                    self.isEditingBookmark = angular.copy(currentBookmark);
                    
                    self.updateBookmark = function(bookmark){
                        BookmarksService.updateBookmark(bookmark);
                        $state.go('app.bookmarks');
                        ngDialog.close();
                    }

                    self.cancelEditing = function(){
                        $state.go('app.bookmarks');
                        ngDialog.close();
                    }
                }
            });
            
        }
    }

    angular
        .module('bookmark.components',[])

        .component('bookmarkList', bookmarkList)
        .component('bookmarkCreate', bookmarkCreate)
        .component('bookmarkEdit', bookmarkEdit)
}());